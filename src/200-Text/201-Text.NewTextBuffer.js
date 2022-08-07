"use strict";


//---------------------------------------------------------------------
let _Schema = {
	id: '201',
	member_of: 'Text',
	name: 'NewTextBuffer',
	type: 'function',
	returns: 'string',
	description: [
		'Returns a new TextBuffer.',
	],
	Parameters: {
		StringA: {
			name: 'InitialValue',
			type: 'string',
			// required: true,
			default: '',
		},
		StringB: {
			name: 'BlockLength',
			type: 'number',
			format: 'positive integer',
			// required: true,
			default: 100,
		},
	},
};


//---------------------------------------------------------------------
module.exports = function ( Liquicode )
{


	//-start-jsdoc---------------------------------------------------------
	/**
	 * @public
	 * @function NewTextBuffer
	 * @returns {string}
	 * @description
	 * Returns a new TextBuffer.
	 * @param {string} [InitialValue]
	 * @param {number} [BlockLength=100]
	*/
	//-end-jsdoc-----------------------------------------------------------


	function NewTextBuffer( InitialValue, BlockLength )
	{
		InitialValue = Liquicode.Schema.ValidateValue( InitialValue, _Schema.Parameters.InitialValue , { coerce_values: true, throw_errors: true });
		BlockLength = Liquicode.Schema.ValidateValue( BlockLength, _Schema.Parameters.BlockLength , { coerce_values: true, throw_errors: true });
		if ( BlockLength <= 0 ) { throw new Error( `The parameter [BlockLength] must be a positive number.` ); }

		let text_buffer = {

			// Internal Variables
			_buffer: InitialValue,
			_length: InitialValue.length,
			_block_length: BlockLength,

			// Function: Append
			Append: function ( Text )
			{
				while ( ( this._length + Text.length ) > this._buffer.length )
				{
					this._buffer += " ".repeat( this._block_length );
				}
				for ( let index = 0; index < Text.length; index++ )
				{
					this._buffer[ this._length + index ] = Text[ index ];
				}
				this._length += Text.length;
				return;
			},

			// Function: ToString
			ToString: function ()
			{
				return this._buffer.slice( 0, this._length );
			},

			// Function: Clear
			Clear: function ()
			{
				this.buffer = '';
				this.length = 0;
				return;
			},

		};

		return text_buffer;
	};


	//---------------------------------------------------------------------
	// Return the module exports.
	return {
		_Schema: _Schema,
		NewTextBuffer: NewTextBuffer,
	};
};
