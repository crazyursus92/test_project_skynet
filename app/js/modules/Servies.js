/**
 * Created by ursus on 29.12.2015.
 */
App.service('TermHelper', function () {
    this.getMonth = function (count) {
        return count + " " + declension(count, ['месяц', 'месяца', 'месяцев']);
    };
    this.priceToMoth = function (tariff) {
        return Math.ceil(tariff.price/tariff.pay_period);
    };
    this.discount = function (tariff, tarifs) {
        var basePrice = 0;
        for (var i = 0; i < tarifs.length; i++) {
            if(+tarifs[i].pay_period === 1){
                basePrice = +tarifs[i].price;
                break;
            }
        }
        return Math.ceil( basePrice * tariff.pay_period  - tariff.price );
    };
    this.endWork = function (pay_period) {
        console.log(pay_period);
        var date = new Date();
        var month = +date.getMonth()+(+pay_period);
        console.log(month);
        date.setMonth(month);
        var day = date.getDate();
        day = day < 9 ? '0' + day : day;
        month = date.getMonth() + 1;
        month = month < 9 ? '0' + month : month;
        var year = date.getFullYear();
        return day + '.' + month + '.' + year;
    };
});

