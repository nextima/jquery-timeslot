(function($) {

    $.fn.timeslot = function( options ) {
        
            // Establish our default settings
        var settings = $.extend({
                type        : 'week',
                data        :{},
                dataParseToJSON: true,
                colHeaders : {},
                colHeadersSpan: {},
                rowNumber: false,
                colNumber: false,
                rowHeaders: {},
                colorForeground    : 'blue',
                colorBackground    : 'gray'
            }, options);

        
        return this.each(
            function(){
                var content = '';
                if(settings.type === 'week'){
                    settings = setWeekSettings(settings);
                }
                else{
                }
                content = render(settings);
                $(this).html(content);
            }
        );
        
    };
    function setWeekSettings(settings){
        if( ! settings.colNumber){
            settings.colNumber = 7;
        }
        if( ! settings.colHeaders){
            settings.colHeaders =  {
                                    0: 'Mon',
                                    1: 'Tu',
                                    2: 'Wed',
                                    3: 'Th',
                                    4: 'Fr',
                                    5: 'Sat',
                                    6: 'Sn'
                                };
        }
        if( ! settings.rowNumber){
            settings.rowNumber = 24;
        }
        if( ! settings.rowHeaders){
            settings.rowHeaders =  {
                                    0:  '00:00',
                                    3:  '04:00',
                                    7:  '08:00',
                                    11: '12:00',
                                    15: '16:00',
                                    19: '20:00'
                                };
        }
        return settings;
    }
    function render(settings){
        if(settings.dataParseToJSON){
            var data = $.parseJSON(settings.data);
        }
        else{
            var data = settings.data;
        }
        var html = '';
        console.log(data);
        html = '<table class="next-timeslot-table">';
        html += '<tr>'
                + '<th>&nbsp;</th>';
        for(var k=0;k < settings.colNumber;++k){
            var attr = '';
            var curr = k;
            if(typeof settings.colHeadersSpan[k] !== 'undefined'){
                attr = ' colspan="' + settings.colHeadersSpan[k] + '" ';
                k +=settings.colHeadersSpan[k] -1;
            }
            html += '<th'+attr+'>'+ (typeof settings.colHeaders[curr] !== 'undefined' ? settings.colHeaders[curr] : '&nbsp;')+'</th>';
        }
        html += '</tr>';
        for(var i=0;i < settings.rowNumber;++i){
                html += '<tr>'
                + '<th>'+ (typeof settings.rowHeaders[i] !== 'undefined' ? settings.rowHeaders[i] : '&nbsp;')+'</th>';
                for (var k=0;k< settings.colNumber;++k){
                    if(typeof data[k] !== 'undefined' && typeof data[k][i] !== 'undefined'){
                        html += '<td class="next-timeslot-fill">'+ (data[k][i] !== true ? data[k][i] : '&nbsp;')+'</td>';
                    }
                    else{
                        html += '<td class="next-timeslot-empty">&nbsp;</td>';
                    }
                }
                + '</tr>';
        }
        html += '</table>';
        return html;
    }

}(jQuery));