'use strict';

var testApp = angular.module("myApp", ['googlechart']);

testApp.controller("testController", function($scope, $http) {
  var req = {
    async: true,
	  crossDomain: true,
    method: 'GET',
    url: 'https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats',
    headers: {
        'X-RapidAPI-Key': '250e6f50dfmshe0c9bf11f89d7d3p1417a3jsn812eca70b343',
        'X-RapidAPI-Host': 'covid-19-coronavirus-statistics.p.rapidapi.com',
      }
   }

   var req2 = {
    async: true,
	  crossDomain: true,
    method: 'GET',
    url: 'https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total?country=India',
    headers: {
        'X-RapidAPI-Key': '250e6f50dfmshe0c9bf11f89d7d3p1417a3jsn812eca70b343',
        'X-RapidAPI-Host': 'covid-19-coronavirus-statistics.p.rapidapi.com',
      }
   }

   var req3 = {
    async: true,
	crossDomain: true,
    method: 'GET',
    url: 'https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total?country=Canada',
    headers: {
        'X-RapidAPI-Key': '250e6f50dfmshe0c9bf11f89d7d3p1417a3jsn812eca70b343',
        'X-RapidAPI-Host': 'covid-19-coronavirus-statistics.p.rapidapi.com',
      }
   }

   var req4 = {
    async: true,
	  crossDomain: true,
    method: 'GET',
    url: 'https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total?country=Brazil',
    headers: {
        'X-RapidAPI-Key': '250e6f50dfmshe0c9bf11f89d7d3p1417a3jsn812eca70b343',
        'X-RapidAPI-Host': 'covid-19-coronavirus-statistics.p.rapidapi.com',
      }
   }

   var req5 = {
    async: true,
	  crossDomain: true,
    method: 'GET',
    url: 'https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total?country=Australia',
    headers: {
        'X-RapidAPI-Key': '250e6f50dfmshe0c9bf11f89d7d3p1417a3jsn812eca70b343',
        'X-RapidAPI-Host': 'covid-19-coronavirus-statistics.p.rapidapi.com',
      }
   }

   $scope.init = function () {

    $http(req).then(
      function successCallback(response) {
        $scope.response = response;
        $scope.covidData = response.data.data.covid19Stats;
        console.log($scope.covidData);
        rangeColumnChartContainer($scope.covidData);
        pieChartContainer($scope.covidData);
        barChartContainer($scope.covidData);
        geoChartContainer($scope.covidData);
      },
      function errorCallback(response) {
        console.log("Error");
      }
    );

    $http(req2).then(
        function successCallback(response) {
          $scope.response = response;
          $scope.confirmedIndia = response.data.data.confirmed;
          $scope.country2 = response.data.data.location;
          $scope.indiaDeathPercentage = Math.ceil((response.data.data.deaths/response.data.data.confirmed)*100);
        },
        function errorCallback(response) {
          console.log("Error");
        }
      );

      $http(req3).then(
        function successCallback(response) {
          $scope.response = response;
          $scope.confirmedCanada = response.data.data.confirmed;
          $scope.country3 = response.data.data.location;
          $scope.canadaDeathPercentage = Math.ceil((response.data.data.deaths/response.data.data.confirmed)*100);

        },
        function errorCallback(response) {
          console.log("Error");
        }
      );

      $http(req4).then(
        function successCallback(response) {
          $scope.response = response;
          $scope.confirmedBrazil = response.data.data.confirmed;
          $scope.country4 = response.data.data.location;
        },
        function errorCallback(response) {
          console.log("Error");
        }
      );

      $http(req5).then(
        function successCallback(response) {
          $scope.response = response;
          $scope.confirmedAustralia = response.data.data.confirmed;
          $scope.country5 = response.data.data.location;
        },
        function errorCallback(response) {
          console.log("Error");
        }
      );
    };
});

function rangeColumnChartContainer(covidData){
  // Range Column Chart

  let graphArray =[];
  for(let i = 0; i <10; i++){
    graphArray.push({ label: covidData[i].country, y: covidData[i].confirmed - covidData[i].deaths });
  }
  console.log(graphArray);
  var chart3 = new CanvasJS.Chart("rangeColumnChartContainer", {
    theme: "light1", 
    animationEnabled: true,
    axisY: {
      title: "Corona Affected Survivors",
      prefix: ""
    },
    data: [{
      type: "waterfall",
      risingColor: "rgb(255,116,196)",
      indexLabelFontColor: "#EEEEEE",
      indexLabelPlacement: "inside",
      yValueFormatString: "#,##0k",
      dataPoints: graphArray
    }]
  });
  chart3.render();
}

function pieChartContainer(covidData){
  // Range Column Chart

  let graphArray =[];
  for(let i = 0; i <10; i++){
    graphArray.push({ label: covidData[i].country, y: covidData[i].deaths });
  }
  var chart1 = new CanvasJS.Chart("chartContainer", {
    theme: "light1",
    animationEnabled: true,
    data: [{
      type: "pie",
      indexLabelFontSize: 9,
      radius: 80,
      indexLabel: "{label} - {y}",
      yValueFormatString: "###0.0\"%\"",
      click: explodePie,
      dataPoints: graphArray
    }]
  });
  chart1.render();
  
  function explodePie(e) {
    for(var i = 0; i < e.dataSeries.dataPoints.length; i++) {
      if(i !== e.dataPointIndex)
        e.dataSeries.dataPoints[i].exploded = false;
    }
  }
}

function barChartContainer(covidData){
  // Range Column Chart

  let graphArray =[];
  for(let i =covidData.length-1; i>=covidData.length-5; i--){
    graphArray.push({ label: covidData[i].country, y: covidData[i].confirmed });
  }
  console.log(graphArray);
  // COLUMN CHART

  var chart2 = new CanvasJS.Chart("columnChartContainer", {
    animationEnabled: true,
    theme: "light1",
    axisY: {
      title: "Number of Confirmed Cases"
    },
    data: [{        
      type: "column",  
      dataPoints:graphArray
    }]
  });
  chart2.render();
}

function geoChartContainer(covidData){
  google.charts.load('current', {
    'packages':['geochart'],
  });
  google.charts.setOnLoadCallback(drawRegionsMap);

  let graphArray =[['Country', 'Affected']];
  for(let i =covidData.length-1; i>=0; i--){
    graphArray.push([covidData[i].country,covidData[i].confirmed]);
  }
  
  function drawRegionsMap() {
    var data = google.visualization.arrayToDataTable(graphArray);
  
    var options = {
      colorAxis: {colors: ['#894FFC', '#FFA901']},
      defaultColor: '#f5f5f5',
    };
    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
  
    chart.draw(data, options);
  }
}