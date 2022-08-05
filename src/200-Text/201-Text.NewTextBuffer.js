"use strict";


//---------------------------------------------------------------------
let Schema = {
	id: '201',
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

	//---------------------------------------------------------------------
	function NewTextBuffer( InitialValue, BlockLength )
	{
		InitialValue = Liquicode.Core.ValidateField( InitialValue, Schema.Parameters.InitialValue );
		BlockLength = Liquicode.Core.ValidateField( BlockLength, Schema.Parameters.BlockLength );
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
		_Schema: Schema,
		NewTextBuffer: NewTextBuffer,
	};
};
