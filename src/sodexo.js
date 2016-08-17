var request = require('request');

var sodexo = {
    url_api: "https://www.app.sodexo.com.br/PMobileServer/Primeth",
    _data_source: null,
    set_data_source: function (data) {
        this._data_source = data;
    },
    init: function (document, cardNumber, callback) {
        var form_data = {
            url: this.url_api,
            form: {
                th: 'thsaldo',
                cardNumber: cardNumber,
                document: document,
            }
        }
        request.post(form_data, function (err, httpResponse, body) {
            if (err) {
                return console.error('call failed:', err);
            }
            sodexo.set_data_source(JSON.parse(body));
            return callback();
        });
    },
    get_transactions: function () {
        if (!this._data_source) { return console.log('plugin uninitialized'); }
        return this._data_source.transactions;
    }
};
sodexo.init('[your-cpf-number', '[your-card-number]', function () {
    sodexo.get_transactions();
});



