

function drawTable() {

    var url = "http://json-stat.org/samples/oecd-canada.json";
    var J = JSONstat(url);
    var datasets = J.id;
    var firstDataset = J.Dataset(J.id[0]).label;
    alert(datasets);
    alert(firstDataset);
    //var lableOfsecondDim = JSONstat(url).Dataset(0).Dimension(dimensions[1]).label;
    //var lableOfthirdDim = JSONstat(url).Dataset(0).Dimension(dimensions[2]).label;
    //alert(lableOfsecondDim);
    //alert(lableOfthirdDim);
    ////var data = new google.visualization.DataTable(jstatTable);
   // var data = new google.visualization.DataTable();
    //data = jstatTable;
    //data.addColumn('string', 'Name');
    //data.addColumn('number', 'Salary');
    //data.addColumn('boolean', 'Full Time Employee');
    //data.addRows([
    //  ['Mike', { v: 10000, f: '$10,000' }, true],
    //  ['Jim', { v: 8000, f: '$8,000' }, false],
    //  ['Alice', { v: 12500, f: '$12,500' }, true],
    //  ['Bob', { v: 7000, f: '$7,000' }, true]
    //]);
    //var table = new google.visualization.Table(document.getElementById('table1'));
   // table.draw(data, { showRowNumber: true });
}

function getSectionDesc(url) {
    $('#content').html('<img src="/Images/ajax-loader.gif" />')
    $.ajax(
        {
            url: url,
            datatype: 'json',
            success: function (data) {
                $('#content').empty();
                $('#title').append(data.title);
                $('#content').append(data.desc);
                $('#content1').append(data.html1);
                $('#content2').append(data.html2);
            },
            failure: function (errmsg) {
                alert(errmsg);
            }

        });
}

function getTableQuery(url) {
   
        $.ajax(
           {
               url: url,
               datatype: 'json',
               success: function (data) {
                   $("#accordion2").empty();
                   if (data && data != "") {
                       for (var i = 0; i < data.length; i++) {
                           createAccordionForTable(data[i].title, 'Table' + (i + 1), (i + 1));
                           getTable(data[i].query, data[i].metadataUrl, data[i].cols, data[i].rows, '#Table' + (i + 1), data[i].hiddenAttributes);
                       }

                       //alert(JSON.stringify(data[0].query));
                       //return JSON.stringify(data[0].query);
                   }
               },
               failure: function (errmsg) {
                   alert(errmsg);
               }

           });
    }


function getGraphQuery(url) {
    $.ajax(
        {
            url: url,
            dataType: 'json',
            success: function (data) {
                if (data && data != "") {
                    for (var i = 0; i < data.length; i++) {
                        createAccordionForGraph(data[i].title, 'Graph' + (i + 1), (i + 1));
                        getGraph(data[i].query, data[i].metadataUrl, data[i].type,data[i].colseries, data[i].colticks, 'Graph' + (i + 1));
                    }
                }
            },
            failure: function (errmsg) {
                alert(errmsg);
            }
            
        });
}

function getTableMetadataUrl(url) {
    $.ajax(
       {
           url: url,
           datatype: 'json',
           success: function (data) {
               return data[0].metadataUrl;
           },
           failure: function (errmsg) {
               alert(errmsg);
           }

       });
}

function numberOfContents(vector, val) {
    var nr = 0;
    for (var i = 0; i < vector.columns.length; i++) {
        if (vector.columns[i].type == val) nr++;
    }
    return nr;
}

function createAccordionForTable(title, divid, order) {

    $('#accordion2').append(' <div class="panel panel-default" ><div class="panel-heading"><h4 class="panel-title"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#' + divid + '">' + title + '</a> </h4></div><div id="' + divid + '" class="panel-collapse collapse"><div class="panel-body"><div id="' + divid + '"></div></div></div></div>');
}

function createAccordionForGraph(title, divid, order) {

    $('#graphtitle').append("<h4>" + title + "</h4>");
   /// $('#accordion3').append(' <div class="panel panel-default" ><div class="panel-heading"><h4 class="panel-title"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#' + divid + '">' + title + '</a> </h4></div><div id="' + divid + '" class="panel-collapse collapse"><div class="panel-body"><div id="' + divid + '"></div></div></div></div>');
}

function getTable(jsonQuery, url, cols, rows, accdiv, hiddenAttributes) {
    $.ajax({
        url: url,
        type: 'POST',
        data: jsonQuery,
        dataType: 'json',
        success: function (data) {
            //alert(JSON.stringify(data.columns));
            $.ajax({
                url: url,
                //type: 'GET',
                //dataType: 'json',
                success: function (metadata) {
                    //alert(JSON.stringify(metadata));
                    //alert(JSON.stringify(data));
                    
                    
                    var dataTable = transforJsonToDataTable(metadata, data);
                    pivot(dataTable, cols, rows, numberOfContents(data, "c"), accdiv, hiddenAttributes);
                },
                failure: function (errmsg) {
                    alert(errmsg);
                }
            });
           
        },
        failure: function (errmsg) {
            alert(errmsg);
        }

    });
}

function getGraph(jsonQuery, url, type, colserie, colticks, accdiv) {
    $.ajax({
        url: url,
        type: 'POST',
        data: jsonQuery,
        dataType: 'json',
        success: function (data) {
            $.ajax({
                url: url,
                success: function (metadata) {
                    //var graphdata = tranformJsonToGraphData(metadata, data);
                    if (type == 1) {
                        jqplotBar(metadata, data, colticks, colserie, accdiv);//TODO invent a function for jqplot
                    }
                },
                failure: function (errmsg) {
                    alert(errmsg);
                }
            });
        },
        failure: function (errmsg) {
            alert(errmsg);
        }

    });
}

function getMetadata(url) {
    var metadata;
    $.ajax({
        url: url,
        //type: 'GET',
        //dataType: 'json',
        success: function (data) {
            metadata = data;
            //alert(JSON.stringify(metadata));
            
           
        },
        failure: function (errmsg) {
            alert(errmsg);
        }
    });
    return metadata;
    
}


function getValueSetText(metadata, value, order) {
    var i = metadata.variables[order].values.indexOf(value);
    return (metadata.variables[order].valueTexts[i]);
}

function transforJsonToDataTable(metadata, data) {
    var arrayTable = [];
    var header = [];
    
    $.each(data.columns, function (key, val) {
        
           // alert(val.text);
            header.push(val.text);
        
        //if (key == 'text') {
        //    alert(val);
        //    header.push(val);
        //}
    })
    arrayTable.push(header);
    $.each(data.data, function (key, val) {
        var row = [];
        for (var i = 0; i < val.key.length; i++) {

            if (data.columns[i].type == "t") { row.push(val.key[i]); }
            else  row.push(getValueSetText(metadata, val.key[i], i))
        }
        for (var i = 0; i < val.values.length; i++) {
            row.push(val.values[i]);
        }
        
     
        arrayTable.push(row);
    });
   
    return arrayTable;

}

function getTicksOfBarchart(metadata, col) {
    var ticks = metadata.variables[col].valueTexts;
    return ticks;
}

function dataPoints(ticks, series) {
   
    var s = [];
    var chartData = [];
    var p = [[]];
    for (var i = 0; i < series.length-1; i++) {
        
        $.each(series[i], function (key, val) {
            p[i].push([ticks[key], parseFloat(val)]);
        })
       
    }
    chartData.push(p);
    return p;
}

function getSeriesLables(metadata, col) {
    var labels = [];
    $.each(metadata.variables[col].valueTexts, function (key, val) {
        var label = { "label": val }
        labels.push(label);
    });
    //alert(labels);
    return labels;
}

function getSeriesBarchart(metadata, data, col) {
    var series = [];
    $.each(metadata.variables[col].values, function (key, val) {
        //alert(val);
        series.push(getBarchartSerie(data, col, val));
    });
    return series;
}

function getBarchartSerie(data, col, value) {
    var serie = [];
   // alert(col);
   // alert(value);
    $.each(data.data, function (key, val) {

        if (val.key[col] == value) {
            serie.push(parseFloat(val.values[0]));
        }
    });
    //alert(serie.length);
    return serie;
}

function jqplotBar(metadata, data, colticks, colserie, divid) {
    plotseries = getSeriesBarchart(metadata, data, colserie);
    ticks = getTicksOfBarchart(metadata, colticks);
    //alert(plotseries);
    //alert(dataPoints(ticks, plotseries)[0][0][0]);
    //alert(ticks);

   // var s1 = getBarchartSerie(data,colserie, 1);
    //var s2 = getBarchartSerie(data, colserie, 2);
    //alert(s1);
    //alert(s2);
    
    
    plot1 = $.jqplot('graphoutput', getSeriesBarchart(metadata, data, colserie), {
        // The "seriesDefaults" option is an options object that will
        // be applied to all series in the chart.
        animate: !$.jqplot.use_excanvas,
        seriesDefaults: {
            renderer: $.jqplot.BarRenderer,
            //rendererOptions: { fillToZero: true }
        },
        // Custom labels for the series are specified with the "label"
        // option on the series option.  Here a series option object
        // is specified for each series.

        //TODO find the label from metadata
        series: getSeriesLables(metadata, colserie),
        //    [
        //    { label: 'Rural' },
        //    { label: 'Urban' }
        //],
        // Show the legend and put it outside the grid, but inside the
        // plot container, shrinking the grid to accomodate the legend.
        // A value of "outside" would not shrink the grid and allow
        // the legend to overflow the container.
        legend: {
            show: true,
            placement: 'outsideGrid'
        },
        axes: {
            // Use a category axis on the x axis and use our custom ticks.
            xaxis: {
                renderer: $.jqplot.CategoryAxisRenderer,
                ticks: ticks
            },
            // Pad the y axis just a little so bars can get close to, but
            // not touch, the grid boundaries.  1.2 is the default padding.
            yaxis: {
                pad: 1.05,
               // tickOptions: { formatString: 'd' }
            }
        },
        highlighter: {
            show: true,
            tooltipAxes: 'y'

        },
        cursor: {
            show: false
        }
    });


}


function getQuerystring(key, default_) {
    if (default_ == null) default_ = "";
    key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&#]" + key + "=([^&#]*)");
    var qs = regex.exec(window.location.href);
    if (qs == null)
        return default_;
    else
        //alert(qs[1]);
        return qs[1];
}

function getDatasets(url) {
    var J = JSONstat(url);
    var datasets = J.id;
    var selectDatasets = new Array();
    var onchange = "onchange=getDimensionsofDataset()";
    var htmlDatasetSelect = "<select id='seldatasets'" + onchange + ">";
    for (var i = 0; i < datasets.length; i++) {
        selectDatasets[i] = J.Dataset(0).label;
        htmlDatasetSelect += "<option value='" + datasets[i] + "'>" + selectDatasets[i] + "</option>";
    }
    htmlDatasetSelect += "</select>";
    var div = document.getElementById("datasets");
   
    div.innerHTML = htmlDatasetSelect;
    var dataset = J.Dataset(0).toTable({ type: 'arrobj' });
    return dataset;
}

function getDimensionsofDataset() {
    var div1 = document.getElementById("dimension1");
    var div2 = document.getElementById("dimension2");
    var div3 = document.getElementById("dimension3");
    alert(div3);
    var dataset = document.getElementById("seldatasets").value;
    var url = 'http://json-stat.org/samples/oecd-canada.json';
    var J = JSONstat(url);
    var dimensions = J.Dataset(dataset).id;
    var htmlHeaderDimension1 = "";
    var htmlHeaderDimension2 = "";
    var htmlHeaderDimension3 = "";
    htmlHeaderDimension1 += J.Dataset(dataset).Dimension(dimensions[0]).label;
    htmlHeaderDimension2 += J.Dataset(dataset).Dimension(dimensions[1]).label;
    htmlHeaderDimension3 += J.Dataset(dataset).Dimension(dimensions[2]).label;
    var categories1 = J.Dataset(dataset).Dimension(dimensions[0]).id;
    //alert(categories1);
    var categories2 = J.Dataset(dataset).Dimension(dimensions[1]).id;
    var categories3 = J.Dataset(dataset).Dimension(dimensions[2]).id;
    document.getElementById("dim1header").innerHTML = htmlHeaderDimension1
    var htmlDim1CategoriesSel = "<select multiple='true' id='dim1'>";
    for (var i = 0; i < categories1.length; i++) {
        htmlDim1CategoriesSel += "<option value='" + categories1[i] + "'>" + J.Dataset(dataset).Dimension(dimensions[0]).Category(categories1[i]).label + "</option>";
    }
    htmlDim1CategoriesSel += "</select>";
    
    alert(div1);
    div1.innerHTML = htmlDim1CategoriesSel;

    document.getElementById("dim2header").innerHTML = htmlHeaderDimension2;
    var htmlDim2CategoriesSel = "<select multiple='true' id='dim2'>";
    for (var i = 0; i < categories2.length; i++) {
        if (J.Dataset(dataset).Dimension(dimensions[1]).role === 'time') {
            htmlDim2CategoriesSel += "<option value='" + categories2[i] + "'>" + categories2[i] + "</option>";
        }
        else {
            htmlDim2CategoriesSel += "<option value='" + categories2[i] + "'>" + J.Dataset(dataset).Dimension(dimensions[1]).Category(categories2[i]).label + "</option>";
        }
    }
    htmlDim2CategoriesSel += "</select>";
    div2.innerHTML = htmlDim2CategoriesSel;

    document.getElementById("dim3header").innerHTML = htmlHeaderDimension3;
    var htmlDim3CategoriesSel = "<select multiple='true' id='dim3' >";
    for (var i = 0; i < categories3.length; i++) {
        htmlDim3CategoriesSel += "<option value='" + categories3[i] + "'>" + J.Dataset(dataset).Dimension(dimensions[2]).Category(categories3[i]).label + "</option>";
    }
    htmlDim3CategoriesSel += "</select>";
    div3.innerHTML = htmlDim3CategoriesSel;


}


function pivot(dataTable, cols, rows, contentsNumber, accdiv, hiddenAttributes) {
    //alert(cols);
    //alert(rows);
    
    var sumAttribute = new Array(20);
    i = 1;
    while (i <= contentsNumber) {
        sumAttribute[i] = dataTable[0][dataTable[0].length - i]
        i++;
    }

    //alert(sumAttribute);
    var derivers = $.pivotUtilities.derivers;
    var aggregators = $.pivotUtilities.aggregators;
    var aggTemplates = $.pivotUtilities.aggregatorTemplates;
    var renderers = $.extend($.pivotUtilities.renderers,
                    $.pivotUtilities.gchart_renderers);
    var str = '$("'+accdiv+'").pivotUI(dataTable, {        aggregators: {';
    for (i = 1; i <= contentsNumber; i++) {
        str = str + '"'+dataTable[0][dataTable[0].length-i]+'": function () { return aggTemplates.sum()([sumAttribute[' + i + ']]) },';
    }

         //   "Numer": function () { return aggTemplates.sum()([sumAttribute[2]]) }
    str = str + ' },    rows: ["' + rows + '"],        cols: ["' + cols + '"], hiddenAttributes: ["'+ hiddenAttributes +'"]} );';
    //alert(str);
    eval(str);
}


//Example from json stat (interactive ul )
function load(e) {
    e.preventDefault();
    if (e.target.tagName === "A") {
        $("input").val(e.target.href);
    }
    var url = $("input").val();
    if (url.indexOf("http") === 0) {
        read(url);
    }
}
function read(o) {
    document.getElementById("mycontainer").innerHTML = '<ul><li><img src="http://json-stat.org/i/load.gif" alt="Loading..." /></li></ul>';
    JSONstat(o, function () {
        if (this.length) {
            document.getElementById("mycontainer").innerHTML = "<ul>" + list("ds", this.Dataset(), "r") + "</ul>";
            hijack("ds", this.Dataset(), "r"); //using () in JSON-stat for generalization's sake
        } else {
            window.alert("A JSON-stat response was not returned.");
            document.getElementById("mycontainer").innerHTML = "";
        }
    })
}
function list(cl, e, tree) {
    var ret = "";
    for (var i = 0, len = e.length; i < len; i++) {
        ret += '<li class="' + cl + ' ' + tree + '"><strong data-id="' + i + '">' + e[i].label + '</strong></li>';
    }
    return ret;
}
function hijack(cl, i, tree) {
    var
      next = (cl === "ds") ? "dim" : "cat",
      n = "." + cl + "." + tree + " strong"
    ;
    $(n).click(function () {
        var
          id = $(this).data("id"),
          c = tree + "-" + id
        ;
        switch (cl) {
            case "ds":
                var e = i[id].Dimension(); //using () in JSON-stat for generalization's sake
                break;
            case "dim":
                var e = i[id].Category(); //using () in JSON-stat for generalization's sake
                break;
        }
        if (cl !== "cat") {
            if (!$(this).parent().children("ul").length) {
                $(this).parent().append("<ul>" + list(next, e, c) + "</ul>");
                hijack(next, e, c);
            } else {
                $(this).parent().children("ul").toggle();
            }
        }
    });
}

