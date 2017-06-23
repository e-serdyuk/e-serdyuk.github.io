var app = angular.module("myApp", ['duScroll', 'ngRoute'])
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/full_route.html',
            controller: 'mainCtrl'


        })
        .when('/posts/:postId', {
            templateUrl: 'templates/new_route.html',
            controller: 'newsCtrl'
        })

});
app.controller("mainCtrl", function($scope, $anchorScroll, $location, $document) {
    var duration = 1000;
    var offset = 0;
    $scope.question = 1;
    $scope.select = 1;
    $scope.scroll = function(id) {
        $location.hash(id);
        var el = angular.element(document.getElementById(id));
        $document.scrollToElement(el, offset, duration);
    };
    $scope.filters = {};
    $scope.photos = [{
            src: 'http://hq-wall.net/i/med_thumb/14/90/bbda26dd.jpg',
            category: 'web'
        },
        {
            src: 'http://hronika.info/uploads/posts/2016-01/1452736497_yumor12.jpg',
            category: 'art'
        },
        {
            src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWoDWJDykKkTFbenrDY7sMcZPy1OTNJ8TD73bdW6npz8SGugsEjw',
            category: 'photography'
        },
        {
            src: 'http://www.nakrutka24.com/krasivaya_dolina_1920x1200.jpg',
            category: 'web'
        },
        {
            src: 'http://psychologis.com.ua/1_1419921384.png',
            category: 'art'
        },
        {
            src: 'http://minionomaniya.ru/wp-content/uploads/2015/10/%D0%BC%D0%B8%D0%BD%D1%8C%D0%BE%D0%BD%D1%8B-%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8-%D0%B2-%D1%85%D0%BE%D1%80%D0%BE%D1%88%D0%B5%D0%BC-%D0%BA%D0%B0%D1%87%D0%B5%D1%81%D1%82%D0%B2%D0%B5.jpg',
            category: 'art'
        },
        {
            src: 'http://baomoi-photo-3-td.zadn.vn/15/11/06/198/17926010/2_126451.jpg',
            category: 'photography'
        },
        {
            src: 'http://www.napurtours.de/wp-content/uploads/2015/03/Cruce-Andino-Seenregion-Chile.jpg',
            category: 'art'
        },
        {
            src: 'http://www.larevueautomobile.com//fiche-technique/photos/2014/Maserati/Ghibli/Maserati_Ghibli_002.jpg',
            category: 'photography'
        },
        {
            src: 'http://mirpozitiva.ru/uploads/posts/2016-08/1472042908_28.jpg',
            category: 'web'
        },
        {
            src: 'http://contentlibrary.digiturk.com.tr/Program/14356/Image/Fifth_Gear-subat-2012-630.jpg',
            category: 'photography'
        },
        {
            src: 'http://bm.img.com.ua/nxs/img/prikol/images/large/2/7/316772.jpg',
            category: 'art'
        }
    ]
})

app.controller("newsCtrl", ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    $http.get("data.json").then(fulfilled, rejected).then(fulfilled, rejected)

    function fulfilled(response) {
        console.log("Status: " + response.status);
        console.log("Type: " + response.headers("content-type"));
        console.log("Length: " + response.headers("content-length"));
        $scope.items = response.data;
        $scope.items_new = [];
        for (var i = 0; i < $scope.items.length; i++) {
            $scope.items_new.push({
                "text": $scope.items[i].text,
                "day": $scope.items[i].date.split('/')[1],
                "month": $scope.items[i].date.split('/')[0],
                "year": $scope.items[i].date.split('/')[2]

            });
        }
        for (var i = 0; i < $scope.items_new.length; i++) {
            if ($scope.items_new[i].month == 1) $scope.items_new[i].month = "January";
            if ($scope.items_new[i].month == 2) $scope.items_new[i].month = "February";
            if ($scope.items_new[i].month == 3) $scope.items_new[i].month = "March";
            if ($scope.items_new[i].month == 4) $scope.items_new[i].month = "April";
            if ($scope.items_new[i].month == 5) $scope.items_new[i].month = "May";
            if ($scope.items_new[i].month == 6) $scope.items_new[i].month = "June";
            if ($scope.items_new[i].month == 7) $scope.items_new[i].month = "July";
            if ($scope.items_new[i].month == 8) $scope.items_new[i].month = "August";
            if ($scope.items_new[i].month == 9) $scope.items_new[i].month = "September";
            if ($scope.items_new[i].month == 10) $scope.items_new[i].month = "October";
            if ($scope.items_new[i].month == 11) $scope.items_new[i].month = "November";
            if ($scope.items_new[i].month == 12) $scope.items_new[i].month = "December";

        }
        for (var i = 0; i < $scope.items_new.length; i++) {
            if ($scope.items_new[i].day.length == 1) {
                $scope.items_new[i].day = 0 + $scope.items_new[i].day;
            }

        }

    }

    function rejected(error) {
        console.error(error.status);
        console.error(error.statusText);
    }

    $scope.id = $routeParams.postId;
    $(".cross").hide();
    $(".menu_burg").hide();
    $(".hamburger").click(function() {
        $(".menu_burg").slideToggle("slow", function() {
            $(".hamburger").hide();
            $(".cross").show();
        });
    });

    $(".cross").click(function() {
        $(".menu_burg").slideToggle("slow", function() {
            $(".cross").hide();
            $(".hamburger").show();
        });
    });

}]);
app.directive('news', function() {
    return {
        restrict: "E",
        controller: 'newsCtrl',
        templateUrl: 'templates/news.html'
    };
});

app.controller("numbersCtrl", function($scope, $interval) {
    var count = 0;
    window.onscroll = function() {
        if ((document.querySelector('.black').getBoundingClientRect().top - document.documentElement.clientHeight < 0) && (count == 0)) {
            count++; // функция должна выполниться только 1 раз
            $scope.timer1const = 3054;
            $scope.timer2const = 7234873;
            $scope.timer3const = 4670;
            $scope.timer4const = 939;
            $scope.inc1 = Math.ceil($scope.timer1const / 1000);
            $scope.inc2 = Math.ceil($scope.timer2const / 1000);
            $scope.inc3 = Math.ceil($scope.timer3const / 1000);
            $scope.inc4 = Math.ceil($scope.timer4const / 1000);
            $scope.timer1 = 0;
            $scope.timer2 = 0;
            $scope.timer3 = 0;
            $scope.timer4 = 0;
            var interval;

            var inc = function() {

                if ($scope.timer1 < $scope.timer1const) {
                    $scope.timer1 += $scope.inc1;
                } else $scope.timer1 = $scope.timer1const;
                if ($scope.timer2 < $scope.timer2const) {
                    $scope.timer2 += $scope.inc2;
                } else $scope.timer2 = $scope.timer2const;
                if ($scope.timer3 < $scope.timer3const) {
                    $scope.timer3 += $scope.inc3;
                } else $scope.timer3 = $scope.timer3const;
                if ($scope.timer4 < $scope.timer4const) {
                    $scope.timer4 += $scope.inc4;
                } else $scope.timer4 = $scope.timer4const;

            };
            interval = $interval(inc, 3)
        }
    }
});
app.directive('numbers', function() {
    return {
        restrict: "E",
        controller: 'numbersCtrl',
        templateUrl: 'templates/numbers.html'
    };
});

app.directive('about', function() {
    return {
        restrict: "E",
        templateUrl: 'templates/about.html'
    };
});
app.directive('formDirective', function() {
    return {
        restrict: "E",
        controller: 'formCtrl',
        templateUrl: 'templates/form.html'
    };
});
app.controller("formCtrl", function($scope, $interval) {
    $scope.nameRegex = /[a-z]/;
    $scope.emailRegex = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
    $scope.submit = function(m) {
        if (m) {
            alert('Form is valid. Sending data.')
        } else {
            alert('Form is invalid!');
        }
    }
});