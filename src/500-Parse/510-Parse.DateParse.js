"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '011',
	member_of: 'Parse',
	name: 'DateParse',
	type: 'function',
	returns: 'object',
	returns_summary: 'Returns a \`DateParts\` object containing Date/Time detail.',
	description: [ `
Dates and times are funny little creatures.
`],
	Parameters: {
		Value: {
			name: 'Value',
			type: 'string',
			required: true,
		},
		TimeZoneOffset: {
			name: 'TimeZoneOffset',
			type: 'string',
			required: false,
			default: '+0000',
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function Parse
	 * @returns {object}
	 * @description
	 * Converts a string to a date-time value.
	 * Returns a `date_time_parts` structure.
	 * @param {string} Value
	 * @param {function} [TimeZoneOffset="+0000"]
	*/
	//-end-jsdoc-----------------------------------------------------------


	//---------------------------------------------------------------------
	function DateParse( Value, TimeZoneOffset = '+0000' )
	{
		Value = Liquicode.Types.Coerce( Value ).ToString();

		// Prepare and validate the date string.
		Value = Value.toLowerCase().trim();
		if ( !Value ) { return get_date_parts( null, TimeZoneOffset ); }

		// Validate AssumeTimeZone
		if ( !TimeZoneOffset ) { TimeZoneOffset = '+0000'; }
		if ( !TimeZoneOffset.startsWith( '+' ) && !TimeZoneOffset.startsWith( '-' ) )
		{
			throw new Error( `AssumeTimeZone must begin with a plus or minus sign.` );
		}
		let offset = TimeZoneOffset.substr( 1 );
		if ( ( offset.length !== 4 ) || isNaN( offset ) )
		{
			throw new Error( `AssumeTimeZone must have a four digit offset component.` );
		}

		let date = null;

		// Try some unusual cases of compressed timestamps.
		if ( !isNaN( Number( Value ) ) )
		{
			let s = Number( Value ).toString(); // Remove any noise.
			if ( s.length == 8 )
			{
				// 20180329 => 2018-03-29
				s = (
					s.substr( 0, 4 ) + '-' +
					s.substr( 4, 2 ) + '-' +
					s.substr( 6, 2 ) +
					' 00:00:00 ' + TimeZoneOffset
				);
			}
			else if ( s.length == 10 )
			{
				// 1465241631 => 1465241631000 => Date(1465241631000)
				s += '000'; // milliseconds
				s = Number( s );
			}
			else if ( s.length == 13 )
			{
				// 1465241631000 => Date(1465241631000)
				s = s; // milliseconds
				s = Number( s );
			}
			else if ( s.length == 14 )
			{
				// 20180329074753 => 2018-03-29 07:47:53
				s = (
					s.substr( 0, 4 ) + '-' +
					s.substr( 4, 2 ) + '-' +
					s.substr( 6, 2 ) + ' ' +
					s.substr( 8, 2 ) + ':' +
					s.substr( 10, 2 ) + ':' +
					s.substr( 12, 2 ) +
					' ' + TimeZoneOffset
				);
			}

			// Try the javascript date parsing.
			date = new Date( s );
			if ( !isNaN( date.getTime() ) ) { return get_date_parts( date, TimeZoneOffset ); }
		}

		// Test for ISO format: 2005-05-01T15:05:23.000Z
		if (
			( Value.length >= 24 )
			&& ( Value.substr( 4, 1 ) === '-' )
			&& ( Value.substr( 7, 1 ) === '-' )
			&& ( Value.substr( 10, 1 ) === 't' )
			&& ( Value.substr( 13, 1 ) === ':' )
			&& ( Value.substr( 16, 1 ) === ':' )
			&& ( Value.substr( 19, 1 ) === '.' )
			&& ( Value.substr( 23, 1 ) === 'z' )
		)
		{
			try { date = new Date( Value ); }
			catch ( e ) { }
			if ( date && !isNaN( date.getTime() ) ) { return get_date_parts( date, TimeZoneOffset ); }
			else { return get_date_parts( null, TimeZoneOffset ); }
		}

		// Test for ISO format (short): 2005-05-01T15:05:23Z
		if (
			( Value.length >= 20 )
			&& ( Value.substr( 4, 1 ) === '-' )
			&& ( Value.substr( 7, 1 ) === '-' )
			&& ( Value.substr( 10, 1 ) === 't' )
			&& ( Value.substr( 13, 1 ) === ':' )
			&& ( Value.substr( 16, 1 ) === ':' )
			&& ( Value.substr( 19, 1 ) === 'z' )
		)
		{
			try { date = new Date( Value ); }
			catch ( e ) { }
			if ( date && !isNaN( date.getTime() ) )
			{ return get_date_parts( date, TimeZoneOffset ); }
			else { return get_date_parts( null, TimeZoneOffset ); }
		}

		// We know its not a javascript supported format.
		// We have to do it the hard way.
		let tokens = tokenize_date( Value );
		let symbols = tokens2symbols( tokens );
		date = symbols2date( symbols, TimeZoneOffset );

		// Return the date.
		if ( date && !isNaN( date.getTime() ) )
		{ return get_date_parts( date, TimeZoneOffset ); }
		else { return get_date_parts( null, TimeZoneOffset ); }
	};


	//---------------------------------------------------------------------
	const REFS =
	{
		day_of_week: [ 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday' ],
		day_of_week_abbrev: [ 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun' ],
		months: [ 'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december' ],
		months_abbrev: [ 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec' ],
	};


	//---------------------------------------------------------------------
	function tokenize_date( text )
	{
		let tokens = [];

		// Split text into words.
		let words = text.split( ' ' );

		// Convert words to tokens.
		words.forEach(
			( word, word_index ) =>
			{
				// Remove punctuation
				if ( word.endsWith( ',' ) ) { word = word.substr( 0, word.length - 1 ); }
				if ( word.endsWith( '.' ) ) { word = word.substr( 0, word.length - 1 ); }

				// Split up date formats
				if ( word.includes( '/' ) )
				{
					let parts = word.split( '/' );
					parts.forEach( part => tokens.push( part ) );
				}
				else if ( word.includes( '-' ) )
				{
					if ( word.startsWith( '-' ) || word.startsWith( 'utc-' ) || word.startsWith( 'gmt-' ) )
					{
						// Treat as a time zone offset
						tokens.push( word );
					}
					else
					{
						// Treat as a date
						let parts = word.split( '-' );
						parts.forEach( part => tokens.push( part ) );
					}
				}
				else if ( word.includes( ',' ) )
				{
					let parts = word.split( ',' );
					parts.forEach( part => tokens.push( part ) );
				}
				else
				{
					tokens.push( word );
				}
			}
		);

		// Return tokens.
		return tokens;
	}


	//---------------------------------------------------------------------
	function tokens2symbols( tokens )
	{
		let symbols = [];
		tokens.forEach(
			( token, token_index ) =>
			{

				// Check for time zone.
				if ( token.startsWith( '+' ) || token.startsWith( 'utc+' ) || token.startsWith( 'gmt+' ) )
				{
					symbols.push( { type: 'zone', value: token } );
					return;
				}
				if ( token.startsWith( '-' ) || token.startsWith( 'utc-' ) || token.startsWith( 'gmt-' ) )
				{
					symbols.push( { type: 'zone', value: token } );
					return;
				}

				// Check for universal time format.
				if ( token.includes( ':' ) )
				{
					symbols.push( { type: 'time', value: token } );
					return;
				}

				// Check for month names.
				if ( REFS.months.includes( token ) )
				{
					let index = REFS.months.indexOf( token ) + 1;
					token = '' + index;
					if ( index < 10 ) { token = '0' + token; }
					symbols.push( { type: 'month', value: token } );
					return;
				}
				if ( REFS.months_abbrev.includes( token ) )
				{
					let index = REFS.months_abbrev.indexOf( token ) + 1;
					token = '' + index;
					if ( index < 10 ) { token = '0' + token; }
					symbols.push( { type: 'month', value: token } );
					return;
				}

				// Check for numeric
				if ( !isNaN( Number( token ) ) )
				{
					if ( token.length <= 2 )
					{
						if ( token.length === 1 ) { token = '0' + token; }
						symbols.push( { type: 'day-or-month', value: token } );
					}
					else if ( token.length === 4 )
					{
						symbols.push( { type: 'year', value: token } );
					}
					else
					{
						symbols.push( { type: 'number', value: token } );
					}
					return;
				}
				else
				{
					symbols.push( { type: 'text', value: token } );
					return;
				}

			}
		);

		// Return the symbols.
		return symbols;
	}


	//---------------------------------------------------------------------
	function symbols2date( symbols, AssumeTimeZone )
	{
		let fields =
		{
			year: null,
			month: null,
			day: null,
			time: null,
			zone: null,
		};

		// The first picks out the things we are pretty sure of.
		symbols.forEach(
			( symbol ) =>
			{
				if ( symbol.type === 'year' )
				{
					if ( fields.year ) { return; }
					fields.year = symbol.value;
				}
				else if ( symbol.type === 'month' )
				{
					if ( fields.month ) { return; }
					fields.month = symbol.value;
				}
				else if ( symbol.type === 'time' )
				{
					if ( fields.time ) { return; }
					fields.time = symbol.value;
				}
				else if ( symbol.type === 'zone' )
				{
					if ( fields.zone ) { return; }
					fields.zone = symbol.value;
				}
			}
		);

		// We go again to try to determine month and day.
		symbols.forEach(
			( symbol ) =>
			{
				if ( symbol.type === 'day-or-month' )
				{
					if ( fields.day && fields.month ) { return; }
					if ( fields.month )
					{
						fields.day = symbol.value;
					}
					else
					{
						fields.month = symbol.value;
					}
				}
			}
		);

		// Validate our date fields.
		if ( !fields.year ) { return null; }
		if ( !fields.month ) { return null; }
		if ( !fields.day ) { return null; }
		if ( !fields.time ) { fields.time = '00:00:00'; }
		if ( !fields.zone ) { fields.zone = AssumeTimeZone; }

		// Try to fix timezone offsets.
		if ( fields.zone )
		{
			let zone = fields.zone;

			// Find the offset and direction.
			let offset = '';
			let sign = '';
			let sign_index = -1;
			// - sign
			if ( zone.includes( '-' ) )
			{
				sign = '-';
				sign_index = zone.indexOf( '-' );
				offset = zone.substr( sign_index + 1 );
			}
			else if ( zone.includes( '+' ) )
			{
				sign = '+';
				sign_index = zone.indexOf( '+' );
				offset = zone.substr( sign_index + 1 );
			}
			else
			{
				sign = '+';
				offset = zone;
			}
			// - offset
			if ( offset.includes( ':' ) )
			{
				offset = offset.replace( ':', '' );
			}
			if ( offset.length > 4 ) { offset = offset.substr( 0, 4 ); } // e.g. +0500!@#
			if ( offset.length === 1 ) { offset = `0${offset}00`; } // e.g. -5
			else if ( offset.length === 2 ) { offset = `${offset}00`; } // e.g. -12
			else if ( offset.length === 3 ) { offset = `0${offset}`; } // e.g. -5:30
			// Reconstruct the zone.
			if ( offset.length === 4 )
			{
				fields.zone = `${sign}${offset}`;
			}
			else
			{
				fields.zone = AssumeTimeZone;
			}
		}

		// Convert what we have with javascript date parsing.
		let text = `${fields.year}-${fields.month}-${fields.day} ${fields.time} ${fields.zone}`;
		let date = null;
		try { date = new Date( text ); }
		catch ( e ) { }
		return date;
	}


	//---------------------------------------------------------------------
	function get_date_parts( JsDate, TimeZoneOffset = '+0000' )
	{
		let datetime_parts =
		{
			date: null,
			year: 0,
			month_num: 0,
			month_name: '',
			day_of_month: 0,
			day_of_week: 0,
			day_name: '',
			hours: 0,
			minutes: 0,
			seconds: 0,
			milliseconds: 0,
			timezone_offset: ''
		};
		if ( !JsDate ) { return datetime_parts; }
		if ( isNaN( JsDate.getTime() ) ) { return datetime_parts; }

		datetime_parts.date = new Date( JsDate.getTime() );
		datetime_parts.year = datetime_parts.date.getFullYear();
		datetime_parts.month_num = datetime_parts.date.getMonth();
		datetime_parts.month_name = REFS.months[ datetime_parts.month_num ];
		datetime_parts.day_of_month = datetime_parts.date.getDate();
		datetime_parts.day_of_week = datetime_parts.date.getDay();
		if ( datetime_parts.day_of_week === 0 ) { datetime_parts.day_of_week = 7; }
		datetime_parts.day_name = REFS.day_of_week[ datetime_parts.day_of_week - 1 ];
		datetime_parts.hours = datetime_parts.date.getHours();
		datetime_parts.minutes = datetime_parts.date.getMinutes();
		datetime_parts.seconds = datetime_parts.date.getSeconds();
		datetime_parts.milliseconds = datetime_parts.date.getMilliseconds();
		datetime_parts.timezone_offset = TimeZoneOffset;

		return datetime_parts;
	}


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		DateParse: DateParse,
	};
};
