module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            codeCheck: String,
            code: String,
            amount: Number,
            content: String,
            date: Date,
            partnerName: String,
            partnerCode: String,
            protected: {
                type: Boolean,
                default: false
            }
        },
        { timestamps: true }
    );
  
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
  
    const Note = mongoose.model("note", schema);
    return Note;
  };