// angular.module('SchoolController')
//     .directive('pageSelect', function () {
//         return {
//             restrict: 'E',
//             template: '<input type="text" class="select-page" ng-model="inputPage" ng-change="selectPage(inputPage)">',
//             link: function (scope, element, attrs) {
//                 scope.$watch('currentPage', function (c) {
//                     scope.inputPage = c;
//                 });
//             }
//         }
//     });


// angular.module('SchoolController')
// .directive('itemsPage', function () {
//     return {
//         restrict: 'E',
//         scope: {
//             itemsOnPage: "=",
//             totalItemstype: "=totalItems"
//         },
//         replace: false,       
//         template: '<select ng-model="pagesize" ng-change="selectPage(inputPage)" type="number"><option value=10>10</option><option value=20>20</option><option value="30">30</option><option value="40">40</option><option value="50">50</option><option value="0">All</option></select>',
        
//         link: function (scope, element, attrs) {
//             scope.pagesize = "20";
//             scope.$watch('pagesize', function (c) {
//                 if (scope.pagesize == 0)
//                     scope.itemsOnPage = scope.totalItemstype;
//                 else
//                     scope.itemsOnPage = scope.pagesize;
//             });

//         }
//     }
// });

// // SchoolController.directive('pageSelect', function () {
// //     return {
// //         restrict: 'E',
// //         template: '<input type="text" class="select-page" ng-model="inputPage" ng-change="selectPage(inputPage)">',
// //         link: function (scope, element, attrs) {
// //             scope.$watch('currentPage', function (c) {
// //                 scope.inputPage = c;
// //             });
// //         }
// //     }
// // });

// // SchoolController.directive('itemsPage', function () {
// //  return {
// //         restrict: 'E',
// //         scope: {
// //             itemsOnPage: "=",
// //             totalItemstype: "=totalItems"
// //         },
// //         replace: false,       
// //         template: '<select ng-model="pagesize" ng-change="selectPage(inputPage)" type="number"><option value=10>10</option><option value=20>20</option><option value="30">30</option><option value="40">40</option><option value="50">50</option><option value="0">All</option></select>',
        
// //         link: function (scope, element, attrs) {
// //             scope.pagesize = "10";
// //             scope.$watch('pagesize', function (c) {
// //                 if (scope.pagesize == 0)
// //                     scope.itemsOnPage = scope.totalItemstype;
// //                 else
// //                     scope.itemsOnPage = scope.pagesize;
// //             });

// //         }
// //     }
// // });  
