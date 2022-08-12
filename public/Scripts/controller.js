var loginFrom=0;
var baseUrl = $("base").first().attr("href");
if (baseUrl == "/") {
    baseUrl = "";
}
OEMSController.directive('stRatio', function () {
    return {
        link: function (scope, element, attr) {
            var ratio = +(attr.stRatio);

            element.css('width', ratio + '%');

        }
    };
});

OEMSController.controller("ParentController", ['$scope',
    function ($scope) {
        $scope.$on('$viewContentLoaded', function () {
            angular.element(".date input").keydown(function (event) {
                if (event.which != 46)
                    return false;
            });
        });
    }
]);

OEMSController.directive('searchWatchModel', function () {
    return {
        require: '?^stTable',
        scope: {
            searchWatchModel: '='
        },
        link: function (scope, ele, attr, ctrl) {
            var table = ctrl;

            scope.$watch('searchWatchModel', function (val) {
                ctrl.search(val);
            });

        }
    };
});



OEMSController.directive("datepicker", function () {

    function link(scope, element, attrs) {
        // CALL THE "datepicker()" METHOD USING THE "element" OBJECT.
        // element.datepicker({
        //     dateFormat: "dd-MMM-yyyy"
        // });
        element.datepicker({
            format: "dd-M-yyyy",
            forceParse: false,
            autoclose: true,
            todayHighlight: true,
            toggleActive: true,
            todayBtn: true
        });
    }

    return {
        require: 'ngModel',
        link: link
    };
});


OEMSController.directive('timeControl', [function () {

    return {
        restriction: 'A',
        link: function (scope, elem, attr) {

            var position = {
                horizontal: 'right',
                vertical: 'bottom'
            }

            if (scope.$last === true) {
                position = {
                    horizontal: 'right',
                    vertical: 'top'
                }
            }

            elem.datetimepicker({
                //format: 'LT'
                widgetPositioning: position,
                widgetParent: elem,
                format: 'HH:mm'
            });



            elem.datetimepicker({
                //format: 'LT'
                format: 'HH:mm'
            });
        }
    }
}]);

OEMSController.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

OEMSController.directive("fileread", [
    function () {
        return {
            scope: {
                fileread: "="
            },
            link: function (scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            scope.fileread = loadEvent.target.result;
                            //scope.filename = changeEvent.target.files[0].name;
                        });
                    }
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        }
    }
]);


OEMSController.directive('uploadFile', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            var file_uploaded = $parse(attrs.uploadFile);

            element.bind('change', function () {
                scope.$apply(function () {
                    file_uploaded.assign(scope, element[0].files[0]);
                });
            });
        }
    };

}]);
OEMSController.directive('excelExport', ['filterFilter', function ($filter) {
    return {
        restrict: 'A',
        scope: {
            fileName: "@",
            headerData: "&headerData",
            filterdata: "&filterdata",
            data: "&exportData",
            innerdata: "&childData",
            headerreport: "&headerTitle",
            schoolname: "&schoolname",
            address: "&address",
            loginuserId: "&loginuserId"

        },
        replace: true,

        template: '<div class="dropdown"><button class="btn btn-dril dropdown-toggle"  data-toggle="dropdown">Export</button><ul class="dropdown-menu"><li><a ng-click="download(1)">Excel</a></li><li><a ng-click="download(2)">WORD</a></li><li><a ng-click="download(3)">PDF</a></li></ul></div>',

        link: function (scope, element) {

            scope.download = function (docType) {

                function prepareinlinetable(headerData, innerdata, filterKey, filterData) {
                    var str = "";

                    str = '<table border="1" valign="center">';

                    angular.forEach(innerdata, function (value, key) {
                        ////console.log(innerdata);
                        if (filterChildData(value, filterKey, filterData) == true) {
                            str = str + '    <tr>'
                            angular.forEach(headerData, function (value1, key1) {

                                if (value[value1.dataKey] != undefined && value1.datamode == "Multiple") {
                                    str = str + '<td>' + value[value1.dataKey] + '</td>';
                                }
                            });
                            str = str + '   </tr>'
                        }
                    });

                    str = str + '    </tr>'

                    str = str + '</table>';


                    return str;

                }

                function filterChildData(row, filterKey, filterData) {
                    var exist = false;
                    angular.forEach(row, function (value, key) {
                        if (key == filterKey && value == filterData)
                            exist = true;
                    });

                    return exist;
                }

                function prepareTable(headerData, filterdata, data, innerdata, headerreport, schoolname, address, loginuserId) {

                    var str = "",
                        ftr = "",
                        header = "",
                        school = "",
                        addr = "",
                        graphImg;
                    var multipleExist = false;

                    ftr = '<table border="0">';
                    ftr = ftr + ' <tr>'
                    // //console.log(data);
                    angular.forEach(filterdata, function (filtervalue, filterkey) {
                        ftr = ftr + '    <tr>'
                        ftr = ftr + '<td style="font-family:tahoma;font-size:12;font-weight:bold">' + filtervalue.title + '' + ':' + '' + filtervalue.dataKey + '</td>';
                        ftr = ftr + '    </tr>'
                    });


                    ftr = ftr + '    </tr>'
                    ftr = ftr + '</table>';


                    str = '<table border="1" valign="center">';
                    str = str + '    <tr>'

                    angular.forEach(headerData, function (value, key) {
                        if (value.datamode == "Single") {
                            str = str + '<td style="text-align:center;font-family:tahoma;font-size:12;font-weight:bold; color:#fff; background-color:#024da0">' + value.title + '</td>';
                        } else {
                            multipleExist = true;
                        }
                        // str = str + '<td>' + prepareinlinetable({headerData.title}) + '</td>';  
                    });
                    if (multipleExist == true) {
                        str = str + '<td style="text-align:center;font-family:tahoma;font-size:12;font-weight:bold; color:#fff; background-color:#024da0">';
                        str = str + ' <table border="1" valign="center">';
                        str = str + '    <tr>'

                        angular.forEach(headerData, function (value, key) {
                            if (value.datamode == "Multiple" && value.dataKey.split(',').length == 1) {
                                str = str + '<td style="text-align:center;font-family:tahoma;font-size:12;font-weight:bold; color:#fff; background-color:#024da0">' + value.title + '</td>';
                            }
                            // str = str + '<td>' + prepareinlinetable({headerData.title}) + '</td>';  
                        });
                        str = str + '    </tr>'
                        str = str + '    </table>'
                        str = str + '</td>';
                    }

                    str = str + '    </tr>'


                    angular.forEach(data, function (value, key) {
                        str = str + '    <tr>'
                        angular.forEach(headerData, function (hdrvalue, hdrkey) {
                            if (hdrvalue.datamode == "Single") {
                                str = str + '<td >' + value[hdrvalue.dataKey] + '</td>';
                            } else if (hdrvalue.datamode == "Multiple" && hdrvalue.dataKey.split(',').length > 1) {
                                var parentId = hdrvalue.dataKey.split(',');

                                ////console.log(parentId);
                                str = str + '<td >' + prepareinlinetable(headerData, innerdata, parentId[1].trim(), value[parentId[0].trim()]) + '</td>';
                            }

                        });

                        str = str + '    </tr>'

                    });

                    str = str + '    </tr>'
                    str = str + '</table>';

                    //  {{(CommontransactionList|filter : {Name:'MinimumLength'})[0].Value}}
                    header = '\uFEFF<h2  style="text-align:center; font-weight:bold; font-color:red">' + headerreport + '</h2>';
                    school = '<h3 class="page-title" style="text-align:right; font-weight:bold; color:#024da0!important">' + schoolname + '</h3>';
                    addr = '<h3 class="page-title" style="text-align:right; font-weight:bold; color:#024da0!important">' + address + '</h3>';
                    //loginuserId

                    return header + school + addr + ftr + str;
                    // saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), scope.fileName+'.xlsx');
                }
                ////console.log(prepareTable(scope.data()));
                if (docType == 1) {
                    // alert("xl");
                    var blob,
                        template = prepareTable(scope.headerData(), scope.filterdata(), scope.data(), scope.innerdata(), scope.headerreport(), scope.schoolname(), scope.address(), scope.loginuserId());

                    saveAs(new Blob([template], {

                        type: "application/octet-stream"
                    }), scope.fileName + '.xls');

                    //saveAs(blob, scope.fileName+'.doc');
                };
                if (docType == 2) {
                    //alert("word");
                    var blob,
                        template = prepareTable(scope.headerData(), scope.filterdata(), scope.data(), scope.innerdata(), scope.headerreport(), scope.schoolname(), scope.address(), scope.loginuserId());

                    blob = new Blob([template], {
                        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"

                    });

                    saveAs(blob, scope.fileName + '.doc');
                };

                if (docType == 3) {

                    //console.log(scope.filterdata());
                    var doc = new jsPDF('p', 'pt');
                    doc.autoTable(scope.headerData(), scope.data(), scope.filterdata(),
                        //  doc.autoTable(scope.headerData(),scope.filterdata(),scope.data(),scope.headerreport(),scope.schoolname(),scope.address(),
                        {
                            styles: {
                                fillColor: [156, 154, 154]
                            },
                            columnStyles: {
                                id: {
                                    fillColor: 255
                                }
                            },
                            margin: {
                                top: 60
                            },
                            addPageContent: function (data) {
                                doc.text("Stock Report", 30, 30);
                            }


                        }
                    );

                    doc.save(scope.fileName + '.pdf');

                };
            }
        }
    }

}]);
OEMSController.directive('multiselectDropdown', [function () {
    return function (scope, element, attributes) {

        // Below setup the dropdown:

        element.multiselect({
            maxHeight: 200,
            enableFiltering: true,
            enableCaseInsensitiveFiltering: true,

            // Replicate the native functionality on the elements so
            // that angular can handle the changes for us.
            onChange: function (optionElement, checked) {
                optionElement.removeAttr('selected');
                if (checked) {
                    optionElement.prop('selected', 'selected');
                }
                element.change();
            }

        });
        // Watch for any changes to the length of our select element
        scope.$watch(function () {
            return element[0].length;
        }, function () {
            element.multiselect('rebuild');
        });

        // Watch for any changes from outside the directive and refresh
        scope.$watch(attributes.ngModel, function () {
            element.multiselect('refresh');
        });

        // Below maybe some additional setup
    }
}]);

OEMSController.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function (file, uploadUrl) {
        var fd = new FormData();
        fd.append('file', file);
        $http.post(baseUrl + uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            })
            .success(function () {})
            .error(function () {});
    }
}]);

OEMSController.service('CommonLabelNames', ['$http', function ($http) {
    this.CommonLabelNamesList = function (TransName) {
        var obj = {
            CommonTransactionId: TransName
        };
        var promise = $http.post(baseUrl + '/getCommonTransactionLabelList', obj).then(function success(response)

            {
                return response.data;
            })
        return promise;
    }
}]);

OEMSController.service('CommonHeadingNames', ['$http', function ($http) {
    this.CommonHeadingList = function (TransName) {
        var Headingobj = {
            Name: TransName
        };
        var promise = $http.post(baseUrl + '/getCommonTransaction_NameList', Headingobj).then(function success(response) {
            return response.data;
        })
        return promise;
    }
}]);

OEMSController.service('CommonButtonNames', ['$http', function ($http) {
    this.CommonButtonList = function (TransName) {
        var Headingobj = {
            CommonTransactionName: TransName
        };
        var promise = $http.post(baseUrl + '/getButton_CommonTransactionList', Headingobj).then(function success(response) {
            return response.data;
        })
        return promise;
    }
}]);

OEMSController.directive('timepicker', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            //binding timepicker from here would be ensure that
            //element would be available only here.
            element.timepicker(); //your code would be here.
        }
    }
});

OEMSController.directive('pageSelect', function () {
    return {
        restrict: 'E',
        template: '<input type="text" class="select-page" ng-model="inputPage" ng-change="selectPage(inputPage)">',
        link: function (scope, element, attrs) {
            scope.$watch('currentPage', function (c) {
                scope.inputPage = c;
            });
        }
    }
});

OEMSController.directive('itemsPage', function () {
    return {
        restrict: 'E',
        scope: {
            itemsOnPage: "=",
            totalItemstype: "=totalItems"
        },
        replace: false,
        template: '<select ng-model="pagesize" ng-change="selectPage(inputPage)" type="number"><option value=10>10</option><option value=20>20</option><option value="30">30</option><option value="40">40</option><option value="50">50</option><option value="0">All</option></select>',

        link: function (scope, element, attrs) {
            scope.pagesize = "10";
            scope.$watch('pagesize', function (c) {
                if (scope.pagesize == 0)
                    scope.itemsOnPage = scope.totalItemstype;
                else
                    scope.itemsOnPage = scope.pagesize;
            });

        }

    }
});
//This is for Login controller
OEMSController.controller("LoginPageController", ['$scope', '$http', '$state', '$stateParams', '$filter', '$window', '$location',
    function ($scope, $http, $state, $stateParams, $filter, $window, $location) {

        $scope.Logindetails = [];

        $scope.$on("myEvent", function (event, args) {
            $scope.rest_id = args.username;
        });

        $http.get(baseUrl + '/session/loginget').then(function success(response) {
           
            $scope.UserId = response.data;
            $window.localStorage['UserId'] =response.data.data;
        });

        $scope.LoginRedirect = function () {

            // alert("HomeDefault");
            var Transobj = {
                UserName: $scope.UserName
            }

            ////console.log(new Date());
            $http.post(baseUrl + '/getLoginaccess', Transobj).then(function success(response) {
                // //console.log(response.data[1]);  

                // $window.localStorage['UserId'] = response.data[1];

                // alert(response.data[0].Val);

                if (response.data[0].Val == 1) {
                    // window.location.href = "http://localhost/Home#/Home";

                    window.location.href = baseUrl + "Home#/Dashboard";
                    //$state.go('/Home#/HomeDefault');
                    return true;
                } else {
                    alert("Worng Login access");
                    return false;
                }
            });

        }

        $scope.Validationcontrols = function () {
            // alert("Validationcontrols");
            // $scope.errorlist = null;
            if (typeof ($scope.UserName) == "undefined" || $scope.UserName == "") {
                alert("Please enter Username");
                return false;
            } else if (typeof ($scope.Password) == "undefined" || $scope.Password == "") {
                alert("Please enter Password");
                return false;
            }

            return true;

        };

            
        var IpAddress = "";
        var Login_Country = "";
        var Login_City = "";

        $http.get("https://ipinfo.io/json").then(function (response) {
            IpAddress = response.data.ip;
            Login_Country = response.data.country;
            Login_City = response.data.city        
            
        });
        

        // $http.get("http://ip-api.com/json").then(function (response) {
            
        // });
        navigator.sayswho = (function () {
            var ua = navigator.userAgent, tem,
            M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
            if (/trident/i.test(M[1])) {
                tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
                return 'IE ' + (tem[1] || '');
            }
            if (M[1] === 'Chrome') {
                tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
                if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
            }
            M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
            if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
            return M.join(' ');
        })();

        
        $scope.Login_AddEdit = function () {
            //alert("ss");
            // $scope.errorlist = null;
            var offsetTime = new Date().getTimezoneOffset();

            if ($scope.Validationcontrols() == true) {
                //$scope.EmployeeId = $window.localStorage['UserId'];
                $scope.Id = 0;
                $window.localStorage['UserName'] = $scope.UserName;
                var obj = {
                    Id: $scope.Id,
                    UserName: $scope.UserName,
                    Password: $scope.Password,
                    DeviceType: "Web",
                    Sys_TimeDifference: offsetTime,
                    Browser_Version: navigator.sayswho,
                    Login_Country: Login_Country,
                    Login_City: Login_City,
                    Login_IpAddress: IpAddress,
                    Login_Latitude: "",
                    Login_Longtitude: ""
                };
                $http.post(baseUrl + '/getLoginHistory', obj).then(function success(response) {
                    //console.log(response);
                    $scope.loginhistory = response.data[0].id;
                    $window.localStorage['loginhistory']  = response.data[0].id;
               
                // console.log(  $scope.loginhistory);
                // if( $scope.loginhistory >= 1){
                $http.post(baseUrl + '/getLogin_InsertUpdate', obj).then(function success(response) {
                    $scope.EmployeeId = response.data[0].employeeid;

                    var Balance = response.data[0].balance;
                    var logindata = response.data[0].data;

                    $window.localStorage['UserId'] = response.data[0].employeeid;
                    $window.localStorage['User_Name'] = response.data[0].empname;
                   $window.localStorage['Institution_Id'] = response.data[0].institutionid;

                   var menurul="";
                   menurul=response.data[0].menuname;
                   
                   $window.localStorage['DefaultURL'] = menurul;
                    if (response.data[0].data == 1) {
                        if( $scope.loginhistory == 0){
                        window.location.href = baseUrl + "Home#/ChangePassword";
                        }
                        else 
                        {
                            window.location.href = baseUrl + "Home#/Home";
                        }
                        // if(menurul=="")
                        //     window.location.href = baseUrl + "Home#/Dashboard";
                        // else
                        //     window.location.href = baseUrl + "Home#/" + menurul;


                    } else if (response.data[0].data == 0) {

                        alert("Login Failed \n Please check username and password ");

                        // $scope.errorlist = "Your Login Date is Expired!";
                    } else if (response.data[0].data == 2) {

                        alert("Please Login After" + " " + Balance + " " + "minutes!");
                        //$scope.errorlist = "Please Login After" + " " + Balance + " " + "minutes!";

                    } else if (response.data[0].data == 4) {
                        alert("Your Login Date is Expired!");
                        // $scope.errorlist = "Your Login Date is Expired!";
                    } else if (response.data[0].data == 10) {

                        alert("Inactive user cannot login");

                        //$scope.errorlist = "Inactive user cannot login";
                    } else if (response.data[0].data == 7) {
                        alert("Please change the password");

                    } else {

                        alert("Login Failed \n Please check username and password ");
                        //$scope.errorlist = "Login Failed \n Please check username and password ";
                    }


                });
              //  }
            });
            }

        }

        //
        // $scope.Login_AddEdit();
        $scope.testfunction = function () {
            alert("testfunction");
        };

        $scope.Resetpassword_Details = function () {
           
                var data = {
                    resetmailid: $scope.resetmailid                
                    }

                $http.post(baseUrl + '/getresetpassword_forget', data).then(function success(response) {
                    // if (response.data[0].countrow == 1) {
                        alert('Reset Password successfully  ');
                        angular.element('#Modal').modal('hide');
                  //  }
                    // else{  alert('Check User name ');
                    // angular.element('#Modal').modal('hide');}

                    // $scope.ResetCancelPopup();
                });
            
        };


    }
]);


//This is for Login controller
OEMSController.controller("HomeController", ['$scope', '$http', '$state', '$stateParams', '$filter', '$window', '$location',
    function ($scope, $http, $state, $stateParams, $filter, $window, $location) {
        loginFrom=1;

        // window.location.href = baseUrl + "Home#/" + $window.localStorage['DefaultURL'];
        $state.go($window.localStorage['DefaultURL']);

        $scope.StudentRedirect = function () {
            $state.go('ManageStudent');
        }

        $scope.ExamSchedule = function () {
            $state.go('ExamTimeTableList');
        }

        $scope.HallTicket = function () {
            $state.go('GenerateHallTicket');
        }
        
        $scope.QuestionBank = function () {
            $state.go('PaperPattern');
        }
        $scope.ExaminationMarks = function () {
            $state.go('ExaminationMarks');
        }
        $scope.PaperEvaluation = function () {
            $state.go('PaperEvaluation');
        }
        
    }
]);
//This is Academic Controller Controller
OEMSController.controller("AcademicYearController", ['$scope', '$http', '$state','$window', '$stateParams', '$filter', 'filterFilter', 'CommonLabelNames', 'CommonHeadingNames', 'CommonButtonNames',
    function ($scope, $http, $state,$window, $stateParams, $filter, $ff, $CommonLabelNames, $CommonHeadingNames, $CommonButtonNames) {
        if(loginFrom==0)
        {
             window.location.href = baseUrl + "/";        
        }
      //  $scope.InstitutionId = $window.localStorage['UserId'];
        $scope.InstitutionId = $window.localStorage['Institution_Id'];
        //console.log( $window.localStorage['Institution_Id'] )
        // console.log( $window.localStorage['User_Name'])
        $scope.CourseSecRedirect = function () {
            $state.go('CourseSection');
        }

        $scope.GradeRedirect = function () {
            $state.go('Grade');
        }

        $scope.ExamMenuRedirect = function () {
            $state.go('Exam');
        }

        $scope.SubjectRedirect = function () {
            $state.go('Subject');
        }

        $scope.ExamSubjectRedirect = function () {
            $state.go('ExamSubject');
        }

        // Values Initialisation
        // $scope.AcyYearFilter ="0";
        $scope.Status1 = "-1";
        $scope.Acyear = "";
        $scope.AcademicYear = "";
        $scope.Id = 0;
        $scope.DuplicateId = 0;
        $scope.AcademicYear = '';
        $scope.FromYear = '';
        $scope.ToYear = '';
        $scope.Description = '';
        $scope.Status = "0";
        $scope.IsDefault = "0";
        $scope.AcademicyearId = "";
        $scope.IsActive = "1";

        $scope.Value = [];
        $scope.Value1 = [];
        $scope.DefaultValue = [];
        $scope.flag4 = 0;
        $scope.AcademicYear1 = '';

        $scope.AcademicList = [];

        $scope.CommonTransId = "0";
        $scope.CommonTransName = "";
        $scope.CommonTransaction_Title = "";
        $scope.CommontransactionList = [];
        $scope.CommonButtonList = [];
        $scope.CommonTransactionName = "AcademicYearDetails";
        $scope.TextClearFunction = function () {
            $scope.Phy_ChalengedType = '';

        };
 

        /* This is function for Pagination */
        $scope.listdata = [];
        $scope.current_page = 1;
        $scope.page_size = 10;
        $scope.rembemberCurrentPage = function (p) {
            $scope.current_page = p
        }

        $scope.YearList = [];
        var Insdata={
            InstitutionId :$scope.InstitutionId
        }
        $http.post(baseUrl + '/getyearlist',Insdata).then(function success(response) {           
            $scope.YearList = response.data;
        });

        $scope.AcademicYearList = [];


        $scope.AcademicYearListFunction = function () {
            var Insdata={
                InstitutionId :$scope.InstitutionId
            }           
            $http.post(baseUrl + '/getAcademicYearList',Insdata).then(function success(response) {
                $scope.AcademicYearList = response.data;        
                
                $scope.AcyYear = $ff(response.data, {
                    academicflag: 1
                });
                $scope.AcyYearFilter = $scope.AcyYear[0].id.toString();        
            });
        }

        $scope.AcademicYearValidationcontrols = function () {

            if (typeof ($scope.AcademicYear) == "undefined" || $scope.AcademicYear == "") {
                alert("Please enter Academic Year");
                return false;
            } else if (typeof ($scope.FromYear) == "undefined" || $scope.FromYear == "") {
                alert("Please select Academic Period From");
                return false;
            } else if (typeof ($scope.ToYear) == "undefined" || $scope.ToYear == "") {
                alert("Please select Academic Period To");
                return false;
            } else if (($scope.FromYear) >= ($scope.ToYear)) {
                alert("Academic Period To Should be Greater than Academic Period From");
                return false;
            }
            return true;
        };
        $scope.DuplicateId = 0;
        $scope.AcademicYear_AddEdit = function () {
            if ($scope.AcademicYearValidationcontrols() == true) {

                if ($scope.AcademicYear != "") {
                    var obj = {
                        Id: $scope.DuplicateId,
                        AcademicYear: $scope.AcademicYear,
                        FromYearId: $scope.FromYear,
                        ToYearId: $scope.ToYear,
                        IsDefault: $scope.IsDefault,
                        InstitutionId : $scope.InstitutionId
                    }

                    //console.log(obj);
                    $http.post(baseUrl + '/getAcademicDuplicateCheck', obj).then(function success(response) {
                        $scope.Value = response.data;
                        angular.forEach($scope.Value, function (v, index) {
                            $scope.val = v.val;
                        })
                        if ($scope.val == 1) {
                            alert("Academic Year already exists,cannot duplicate");
                            return AcademicYear;
                        }

                        $http.post(baseUrl + '/getAcademicPeriodDuplicateCheck', obj).then(function success(response1) {
                            $scope.Value1 = response1.data;

                            angular.forEach($scope.Value1, function (v1, index1) {
                                $scope.val1 = v1.val;
                            })
                            if ($scope.val1 == 1) {
                                alert("Academic Period already exists,cannot duplicate");
                                return FromYearId;
                            }

                            $http.post(baseUrl + '/getAcademicDefaultCheck', obj).then(function success(response2) {
                                //console.log(response2.data);
                                $scope.DefaultValue = response2.data;
                                //console.log($scope.IsDefault);
                                if ($scope.IsDefault == true) {
                                    angular.forEach($scope.DefaultValue, function (value, index2) {
                                        $scope.Academicvalue = value.val;
                                        $scope.DefaultAcyYear = value.AcademicYear;
                                        $scope.DefaultId = value.Id;
                                    })

                                    if ($scope.Academicvalue == 1) {
                                        var set = confirm($scope.DefaultAcyYear + " is Default Academic Year, Click 'OK' If you want to change " + $scope.AcademicYear + " as Default Year");
                                        if (set == true) {
                                            var data = {
                                                Id: $scope.DefaultId
                                            }
                                            $http.post(baseUrl + '/UpdateDefaultYear', data).then(function success(response) {                                             
                                                // alert("Default Academic Year Updated Successfully");
                                            });
                                        }
                                        else
                                        {
                                            return false;
                                        }
                                    }
                                }                           
                                $scope.AcademicYear_InsertUpdate();
                                return false;
                            })
                        })
                    })

                } else {
                    $scope.AcademicYear_InsertUpdate();
                }
            }
        };


        $scope.AcademicYear_InsertUpdate = function () {
            var obj = {
                Id: $scope.Id,
                AcademicYear: $scope.AcademicYear,
                FromYearId: $scope.FromYear,
                ToYearId: $scope.ToYear,
                Description: $scope.Description,
                Status: $scope.Status,
                IsDefault: $scope.IsDefault,
                InstitutionId : $scope.InstitutionId
            };
            $http.post(baseUrl + '/addAcademicYear', obj).then(function success(response) {
                if (response.data !== 0) {
                    alert("Added/Updated successfully");
                    $scope.AcademicCancelPopup();
                    $sid = response.data;
                   $scope.AcademicYearlist();
                } else {
                    alert("Insert/Update Problem");
                }
            });

        };

        $scope.calculateAcademicYear = function () {
            {
                $scope.ToYear = '';
                var filteredYear = $ff($scope.YearList, {Id: Number($scope.FromYear) + 1},true)
                if(filteredYear.length>0)
                    $scope.ToYear = Number($scope.FromYear) + 1;
            }
        }


        $scope.academicyearmasterlistsave = function (sid) {
            var data = {
                Id: sid
            }
            $http.post(baseUrl + '/getAYSingleList', data).then(function success(response) {
                $scope.AcademicList = response.data;
                $state.go('Organiser');
            })
        }

        $scope.AcademicAddModal = function (OTId) {
            $scope.Id = OTId;
            angular.element('#AcademicyearModal').modal('show');
        }

        $scope.AcademicViewModal = function (OTId) {
            $scope.Id = OTId;
            $scope.AcademicYear_View();
            angular.element('#AcademicYearViewModal').modal('show');
        }

        $scope.AcademicEditModal = function (OTId) {
            $scope.Id = OTId;
            $scope.AcademicYear_View();
            angular.element('#AcademicyearModal').modal('show');
        }


        $scope.AcademicYear_View = function () {
            var data = {
                Id: $scope.Id
            }
            $http.post(baseUrl + '/getAcademicYearView', data).then(function success(response) {

                $scope.AcademicYear = response.data[0].academicyear;
                $scope.DuplicateId = response.data[0].id;
                $scope.FromYear = response.data[0].fromyearid.toString();
                $scope.ViewFromYear = response.data[0].fromyear;
                $scope.ToYear = response.data[0].toyearid.toString();
                $scope.ViewToYear = response.data[0].toyear;
                $scope.Description = response.data[0].description;

                if (response.data[0].status === 1) {
                    $scope.Status = true;
                } else {
                    $scope.Status = false;
                }

                if (response.data[0].isdefault === 1) {
                    $scope.IsDefault = true;
                } else {
                    $scope.IsDefault = false;
                }


            })
        };
        $scope.changeBackColor = [];
       
        $scope.AcademicYearlist = function (rowId, index) {
            $scope.changeBackColor = [];
            var obj = {
                AcademicYear: $scope.AcademicyearId,
                IsActive: $scope.IsActive,
                InstitutionId: $scope.InstitutionId
            };

            $http.post(baseUrl + '/getAcademicYearList', obj).then(function success(response) {
            
                $scope.emptydata = [];
                $scope.AcademicList = [];
                $scope.AcademicList = response.data;
                angular.forEach($scope.AcademicList, function (values, index) {

                    $scope.IsDefault = values.AcademicFlag;
                    if (values.AcademicFlag == 1) {
                       
                        values.AcademicFlag = true;
                    }

                });

                if ($scope.AcademicList.length > 0) {
                    $scope.flag4 = 1;
                } else {
                    $scope.flag4 = 0;
                }
            })
        }

        $scope.AcademicClearPopup = function () {
            $scope.AcademicYear = '';
            $scope.FromYear = '';
            $scope.ToYear = '';
            $scope.Description = '';
            $scope.Status = "0";
            $scope.IsDefault = "0";
        };

        $scope.AcademicCancelPopup = function () {
            angular.element('#AcademicyearModal').modal('hide');
            angular.element('#AcademicYearViewModal').modal('hide');

            $scope.AcademicClearPopup();
        }
        $scope.AcademicInActive = function (OTId) {
            $scope.Id = OTId;
            var del = confirm("Do you like to inactivate the selected detail?");
            if (del == true) {
                var data = {
                    Id: $scope.Id
                }

                //console.log(data);
                $http.post(baseUrl + '/inactiveAcademicYear', data).then(function success(response) {
                    if (response.data == 1) {
                        alert("Selected detail has been inactivated successfully");
                        $eid = response.data;
                        $scope.AcademicYearlist($eid);
                    } else {
                        alert("An error has occurred while deleting Detail");
                        $eid = response.data;
                        $scope.AcademicYearlist($eid);
                    }
                });
            };
        }

        $scope.AcademicActive = function (OTId) {
            $scope.Id = OTId;
            var del = confirm("Do you like to activate the selected detail?");
            if (del == true) {
                var data = {
                    Id: $scope.Id
                }

                //console.log(data);
                $http.post(baseUrl + '/activeAcademicYear', data).then(function success(response) {
                    if (response.data == 1) {
                        alert("Selected detail has been activated successfully");
                        $eid = response.data;
                        $scope.AcademicYearlist($eid);
                    } else {
                        alert("An error has occurred while ReInserting detail");
                        $eid = response.data;
                        $scope.AcademicYearlist($eid);
                    }
                });
            };
        }
    }
]);

//This is Course Section Controller
OEMSController.controller("CourseSectionController", ['$scope', '$http', '$state','$window','$stateParams', '$filter', 'filterFilter', 'CommonLabelNames', 'CommonHeadingNames', 'CommonButtonNames',
    function ($scope, $http, $state, $window,$stateParams, $filter, $ff, $CommonLabelNames, $CommonHeadingNames, $CommonButtonNames) {
        if(loginFrom==0)
        {
             window.location.href = baseUrl + "/";        
        }
        $scope.InstitutionId = $window.localStorage['Institution_Id'];
       //console.log($window.localStorage['Institution_Id'])
        //Filter Initialisation
        $scope.InstitutionId =1;
        $scope.AcademicYearId = "0";
        $scope.CourseFilter = "0";
        $scope.IsActive = "1";

        // Add/Edit Page Initialisation
        $scope.Id = 0;
        $scope.AcademicYear = "0";
        $scope.Course = "0";
        $scope.SectionName = "0";
        $scope.CommonTransactionName = "Course/SectionDetails";
        //Dropdown Initialisation
        $scope.AcademicYearList = [];
        $scope.CourseList = [];
        $scope.SectionList = [];

        /* This is function for Pagination */
        $scope.listdata = [];
        $scope.current_page = 1;
        $scope.page_size = 10;
        $scope.rembemberCurrentPage = function (p) {
            $scope.current_page = p
        }

        $scope.AcademicYearRedirect = function () {
            $state.go('Organiser');
        }

        $scope.CourseSecRedirect = function () {
            $state.go('CourseSection');
        }

        $scope.GradeRedirect = function () {
            $state.go('Grade');
        }

        $scope.ExamMenuRedirect = function () {
            $state.go('Exam');
        }

        $scope.SubjectRedirect = function () {
            $state.go('Subject');
        }

        $scope.ExamSubjectRedirect = function () {
            $state.go('ExamSubject');
        }
        $scope.AcademicYearListFunction = function () {
            var Insdata={
                InstitutionId :$scope.InstitutionId
            }           
            $http.post(baseUrl + '/getAcademicYearList',Insdata).then(function success(response) {
                $scope.AcademicYearList = response.data;                
            });
        }
       
        var Insdata={
            InstitutionId :$scope.InstitutionId
        }
        $http.post(baseUrl + '/getAcademicYearList',Insdata).then(function success(response) {
            $scope.AcademicYearList = response.data;
            $scope.AcyYear = $ff(response.data, {
                academicflag: 1
            });
            $scope.AcademicYearId = $scope.AcyYear[0].id.toString();
            $scope.AcademicYear = $scope.AcyYear[0].id.toString();
        });
        
        var Insdata={
            InstitutionId :$scope.InstitutionId
        } 
        $http.post(baseUrl + '/getcourselist',Insdata).then(function success(response) {
            $scope.Courselist = response.data;
        });
        
        $http.post(baseUrl + '/getSectionList',Insdata).then(function success(response) {
            $scope.SectionList = response.data;           
        });

        $scope.AddCourseSectionModal = function (OTId) {
            $scope.Id = OTId;
            angular.element('#CourseSectionAddModal').modal('show');
        }
        $scope.CourseSectionViewModal = function (OTId) {
            $scope.Id = OTId;
            $scope.CourseSection_View();
            angular.element('#CourseSectionViewModal').modal('show');
        }

        $scope.CourseSectionEditModal = function (OTId) {
            $scope.Id = OTId;
            $scope.CourseSection_View();
            angular.element('#CourseSectionAddModal').modal('show');
        }
        $scope.CourseSectionValidationcontrols = function () {


            if (typeof ($scope.AcademicYear) == "undefined" || $scope.AcademicYear == "0") {
                alert("Please select Academic Year");
                return false;
            } else if (typeof ($scope.Course) == "undefined" || $scope.Course == "0") {
                alert("Please select Course");
                return false;
            } else if (typeof ($scope.SectionName) == "undefined" || $scope.SectionName == "0") {
                alert("Please select Section");
                return false;
            }
            return true;
        };

        $scope.Course_section_ListValidationcontrols = function () {

            if (typeof ($scope.AcademicYearId) == "undefined" || $scope.AcademicYearId == 0) {
                alert("Please select Academic Year");
                return false;
            }
            return true;

        }

        $scope.CourseSection_AddEdit = function () {
            if ($scope.CourseSectionValidationcontrols() == true) {
                var obj = {
                    Id: $scope.Id == undefined ? 0 : $scope.Id,
                    AcademicYearId: $scope.AcademicYear,
                    CourseId: $scope.Course,
                    SectionId: $scope.SectionName,
                    InstitutionId: $scope.InstitutionId
                };
                $http.post(baseUrl + 'Duplicate_CourseSection', obj).then(function success(Courseresponse) {

                    if (Courseresponse.data[0].val == 1) {
                        alert("Section already exist cannot duplicate");
                    } else {

                        var filterobj = {
                            AcademicYearId: $scope.AcademicYear
                        }

                        $http.post(baseUrl + '/addCourseSection', obj).then(function success(response) {
                           
                            if (response.data !== 0) {
                                alert("Added/Updated successfully");
                                $scope.CourseSectionCancelPopup();
                               // $scope.CourseSectionlistsave(filterobj);
                                $scope.CourseSectionsearch();
                            } else {
                                alert("Insert/Update Problem");
                            }
                            
                        });
                        
                    }
                   
                });
              
            };
           
        };


        $scope.ErrorFunction = function () {
            alert("Inactive record cannot be edited");
        }
        $scope.CourseSection_Edit = function () {

            angular.forEach($scope.SectionName, function (value, index) {
                var obj = {
                    Id: $scope.Id == undefined ? 0 : $scope.Id,
                    AcademicYearId: $scope.AcademicYear,
                    CourseId: $scope.CourseId,
                    SectionId: value,
                    InstitutionId: $scope.InstitutionId
                }
                var filterobj = {
                    AcademicYearId: $scope.AcademicYear
                }
                $http.post(baseUrl + '/EditCourseSection', obj).then(function success(response) {
                 
                    if (response.data !== 0) {
                     
                        $scope.CourseSectionCancelPopup();
                       // $scope.CourseSectionlistsave(filterobj);
                        $scope.CourseSectionsearch();
                       
                    } else {
                        alert("Insert/Update Problem");
                    }
                });
               
            }); alert("Added/Updated successfully");
        };

        $scope.CourseSectionlistsave = function (filterobj) {
            $scope.Course_Search(filterobj);
        }

        $scope.CourseSectionClearPopup = function () {
            $scope.Id = 0;
            $scope.Course = '0';
            $scope.SectionName = '0';            
            if($scope.AcademicYearId!=0)
            {
             $scope.AcademicYear = $scope.AcyYear[0].id.toString() == undefined ? 0 :$scope.AcyYear[0].id.toString();
            }

        };

        $scope.CourseSectionCancelPopup = function () {
            angular.element('#CourseSectionAddModal').modal('hide');
            angular.element('#CourseSectionViewModal').modal('hide');
            angular.element('#CoursesectionListModal').modal('hide');
            $scope.CourseSectionClearPopup();
        }


        $scope.flag = 0;
        $scope.CourseSectionList = [];

        $scope.CourseSectionsearch = function () {
            if ($scope.Course_section_ListValidationcontrols() == true) {
                var obj = {
                    AcademicYearId: $scope.AcademicYearId,
                    CourseId: $scope.CourseFilter,
                    IsActive: $scope.IsActive,
                    InstitutionId: $scope.InstitutionId
                };
                $scope.Course_Search(obj);
            }
        }

        $scope.flag3 = 0;
        $scope.CoursesSectionList = [];
        $scope.Course_Search = function (obj) {
            $http.post(baseUrl + '/getCourseSectionList', obj).then(function success(response) {
                //console.log(response.data);
                $scope.emptydata = [];
                $scope.CourseSectionList = [];
                $scope.CourseSectionList = response.data;
                $state.go('CourseSection');

                if ($scope.CourseSectionList.length > 0) {
                    $scope.flag = 1;
                } else {
                    $scope.flag = 0;
                }
            })
        }


        $scope.CourseSection_View = function () {
            
            $scope.Course = [];
            $scope.CourseName = [];
            $scope.Section = [];
            $scope.SectionName = [];
            var data = {
               Id: $scope.Id
            }
            //console.log(data);
            $http.post(baseUrl + '/getCourseSectionView', data).then(function success(response) {
                //console.log(response.data);  

                $scope.Id = response.data[0].id;
                $scope.AcademicYear = response.data[0].academicyearid.toString();
                $scope.ViewAcademicYear = response.data[0].academicyear;

                $scope.CourseId = response.data[0].courseid.toString()
                $scope.CourseName.push(response.data[0].courseid);
                $scope.ViewCourseName = response.data[0].course;
                $scope.Course = $scope.CourseName;
                var obj = {
                    Id: $scope.Id,
                    AcademicYearId: $scope.AcademicYear,
                    CourseId: $scope.CourseId

                };
                $http.post(baseUrl + '/getCourse_SearchList', obj).then(function success(response) {
                    //console.log(response.data);
                    $scope.SectionName = [];
                    angular.forEach(response.data, function (value, index) {
                        $scope.Section = value.sectionname;
                        $scope.displayProfList = $.map(value.sectionid.split(','), function (value) {
                            return parseInt(value);
                        });
                        $scope.SectionName = $scope.displayProfList;
                      
                    });
                });
            })
        };

        $scope.InActiveCourseSection = function (AcademicYearId,CourseId) {
            $scope.AcademicYearId = AcademicYearId;
            $scope.CourseId = CourseId;
            var del = confirm("Do you like to inactivate the selected detail?");
            if (del == true) {
                var data = {
                    AcademicYearId: $scope.AcademicYearId,
                    CourseId: $scope.CourseId
                }
                $http.post(baseUrl + '/inactiveCourseSection', data).then(function success(response) {
                   
                        alert("Selected detail has been inactivated successfully");
                        $scope.CourseSectionsearch();
                });
            };
        }

        $scope.ActiveCourseSection = function (AcademicYearId,CourseId) {
            $scope.AcademicYearId = AcademicYearId;
            $scope.CourseId = CourseId;
            var del = confirm("Do you like to activate the selected detail?");
            if (del == true) {
                var data = {
                    AcademicYearId: $scope.AcademicYearId,
                    CourseId: $scope.CourseId
                }
                $http.post(baseUrl + '/activeCourseSection', data).then(function success(response) {
                  
                        alert("Selected detail has been activated successfully");
                        $scope.CourseSectionsearch();
                   
                });
            };
        }


    }
]);

//This is Grade Controller
OEMSController.controller("GradeMasterController", ['$scope', '$http', '$state','$window','$stateParams', '$filter', 'CommonLabelNames', 'CommonHeadingNames', 'CommonButtonNames',
function ($scope, $http, $state, $window, $stateParams, $filter, $CommonLabelNames, $CommonHeadingNames, $CommonButtonNames) {
    if(loginFrom==0)
    {
         window.location.href = baseUrl + "/";        
    }
    $scope.InstitutionId = $window.localStorage['Institution_Id'];
    $scope.AcademicYearRedirect = function () {
        $state.go('Organiser');
    }

    $scope.CourseSecRedirect = function () {
        $state.go('CourseSection');
    }

    $scope.GradeRedirect = function () {
        $state.go('Grade');
    }

    $scope.ExamMenuRedirect = function () {
        $state.go('Exam');
    }

    $scope.SubjectRedirect = function () {
        $state.go('Subject');
    }

    $scope.ExamSubjectRedirect = function () {
        $state.go('ExamSubject');
    }

    $scope.InstitutionId =1;
    // Exam Menu
    $scope.ExamName = '';
    $scope.ExamCode = '';
    $scope.Duration = '';
    $scope.Description = '';
    $scope.Grade = '';

    //Subject
    $scope.AcademicYear = '';
    $scope.Course = '';
    $scope.SubjectName = '';
    $scope.SubjectType = '';
    $scope.Remarks = '';

    // Exam/Subject
    $scope.ESAcademicYear = '';
    $scope.ESCourse = '';
    $scope.SubjectName = '';
    $scope.ExamName = '';
    $scope.Total = '';
    $scope.Pass = '';
    $scope.Description = '';

    // Initialisation of filters for Exam
    $scope.ExamCode1 = '';
    $scope.ExamName1 = '';

    // Filter Initialization for Subject
    $scope.SubjectTypeId = '';

    // Initialising List Values for Exam/Subject
    $scope.SubjectNameId = '';
    $scope.ExamNameId = '';
    $scope.AcademicYearId = '';
    $scope.CourseId = '';

    $scope.flag = 0;
    $scope.flag1 = 0;
    $scope.flag2 = 0;
    $scope.Status1 = "-1";
    $scope.IsActive = "1";


    $scope.CommonTransId = "0";
    $scope.CommonTransName = "";
    $scope.CommonTransaction_Title = "";
    $scope.CommontransactionList = [];
    $scope.CommonButtonList = [];
    $scope.CommonTransactionName = "GradeDetails";
    $scope.TextClearFunction = function () {
        $scope.Phy_ChalengedType = '';

    };

   

    /* This is function for Pagination */
    $scope.listdata = [];
    $scope.current_page = 1;
    $scope.page_size = 10;
    $scope.rembemberCurrentPage = function (p) {
        $scope.current_page = p
    }
    $scope.YearList = [];
    var Insdata={
        InstitutionId :$scope.InstitutionId
    }

    $scope.GradeInActive = function (OTId) {
        $scope.Id = OTId;
        var del = confirm("Do you like to inactivate the selected detail?");
        if (del == true) {
            var data = {
                Id: $scope.Id
            }
           
            $http.post(baseUrl + '/inactivegrade', data).then(function success(response) {
                
                if (response.data == 1) {
                    alert("Selected detail has been inactivated successfully");
                    $scope.GradeNamelist();
                } else {
                    alert("An error has occurred while deleting Detail");
                    $scope.GradeNamelist();
                }
            });
        };
    }

    $scope.GradeActive = function (OTId) {
        $scope.Id = OTId;
        var del = confirm("Do you like to activate the selected detail?");
        if (del == true) {
            var data = {
                Id: $scope.Id
            }
            $http.post(baseUrl + '/activegrade', data).then(function success(response) {
              
                if (response.data == 1) {
                    alert("Selected detail has been activated successfully");
                    $scope.GradeNamelist();
                } else {
                    alert("An error has occurred while ReInserting detail");
                    $scope.GradeNamelist();
                }
            });
        };
    }

    $scope.GradeAddModal = function (OTId) {
        $scope.Id = OTId;
        angular.element('#GradeListModal').modal('show');
    }

    $scope.GradeViewModal = function (OTId) {
        $scope.Id = OTId;
        $scope.Grade_View();
        ////console.log($scope.AcademicYear_View());
        angular.element('#GradelistViewModal').modal('show');
    }

    $scope.GradeEditModal = function (OTId) {
        $scope.Id = OTId;
        $scope.Grade_View();
        angular.element('#GradeListModal').modal('show');
    }
    $scope.GradeValidationcontrols = function () {
        if (typeof ($scope.GradeName) == "undefined" || $scope.GradeName == "") {
            alert("Please enter Grade Name");
            return false;
        }
        if (parseInt($scope.MarksFrom) > parseInt($scope.MarksUpto)) {
            alert("Marks upto should be greater than  Marks from");
            return false;
        }
        return true;
    };
    $scope.Grade_AddEdit = function () {

        if ($scope.GradeValidationcontrols() == true) {
            var obj = {
                Id: $scope.Id,
                GradeName: $scope.GradeName,
                GradePoint: $scope.GradePoint,
                GradeCategory: $scope.GradeCategory,
                MarksFrom: $scope.MarksFrom,
                MarksUpto: $scope.MarksUpto,
                Remarks: $scope.Remarks,
                InstitutionId:$scope.InstitutionId
            };
            
            $http.post(baseUrl + '/addGrade', obj).then(function success(response) {                

                if (response.data !== 0) {
                    alert("Added/Updated successfully");
                    $scope.GradeCancelPopup();
                    $eid = response.data[0].p_Id;
                  
                   // $scope.Gradelistsave($eid);
                    $scope.GradeNamelist();
                    //$scope.Examsave($eid);
                } else {
                    alert("Insert/Update Problem");
                }
            });
        }
    };

    $scope.GradeClearPopup = function () {
        $scope.Id = 0;
        $scope.GradeName = '';
        $scope.GradePoint = '';
        $scope.GradeCategory = '';
        $scope.MarksFrom = '';
        $scope.MarksUpto = '';
        $scope.Remarks = '';
    };


    $scope.GradeList = [];
    $scope.GradeNamelist = function () {
        $scope.emptydata = [];
        $scope.GradeList = [];
        var obj = {
            GradeName: $scope.GradeName1,
            IsActive: $scope.IsActive,
            InstitutionId:$scope.InstitutionId
        };
        // //console.log(obj);
        $http.post(baseUrl + '/getGradeList', obj).then(function success(response) {
          
            $scope.emptydata = [];
            $scope.GradeList = [];
            $scope.GradeList = response.data;
            if ($scope.GradeList.length > 0) {
                $scope.flag1 = 1;
            } else {
                $scope.flag1 = 0;
            }
        })
    }


    $scope.Grade_View = function () {
        var data = {
            Id: $scope.Id
        }
        $http.post(baseUrl + '/getGradeView', data).then(function success(response) {

            $scope.GradeName = response.data[0].gradename;
            $scope.DuplicateId = response.data[0].id;
            $scope.GradePoint = response.data[0].gradepoint;
            $scope.GradeCategory = response.data[0].gradecategory;
            $scope.MarksFrom = response.data[0].marksfrom;
            $scope.MarksUpto = response.data[0].marksupto;
            $scope.Remarks = response.data[0].remarks;
            ////console.log(response.data);
        })
    };

    $scope.GradeCancelPopup = function () {
        angular.element('#GradelistViewModal').modal('hide');
        angular.element('#GradeListModal').modal('hide');
        $scope.GradeClearPopup();
    }

    $scope.DuplicateId = 0;

    $scope.Value = [];
    $scope.Grade_Add = function () {

        if ($scope.GradeName != "") {

            var obj = {
                Id: $scope.DuplicateId,
                GradeName: $scope.GradeName,
                GradeName: $scope.MarksFrom,
                GradeName: $scope.MarksUpto,
                InstitutionId:$scope.InstitutionId
            }
           
            $http.post(baseUrl + '/getGradeNameView', obj).then(function success(response) {
                $scope.Value = response.data;

                angular.forEach($scope.Value, function (v, index) {
                    $scope.val = v.val;
                   
                })
              
                if ($scope.val == 1) {
                    alert("Grade Name already exists,cannot duplicate");
                    return GradeName;
                }

                $scope.Grade_AddEdit();
            })

        } else {

            $scope.Grade_AddEdit();
        }


    };
}
]);

//This is Exam Controller
OEMSController.controller("ExamController", ['$scope', '$http', '$state', '$filter', '$stateParams', '$window', 'CommonLabelNames', 'CommonHeadingNames', 'CommonButtonNames', 'filterFilter',
    function ($scope, $http, $state, $filter, $stateParams, $window, $CommonLabelNames, $CommonHeadingNames, $CommonButtonNames, $ff) {
        // Exam Menu
        if(loginFrom==0)
        {
             window.location.href = baseUrl + "/";        
        }
        $scope.ExamNameList = [];
        $scope.InstitutionId = $window.localStorage['Institution_Id'];
        var data ={
            InstitutionId: $scope.InstitutionId
        }

        $scope.AcademicYearRedirect = function () {
            $state.go('Organiser');
        }

        $scope.CourseSecRedirect = function () {
            $state.go('CourseSection');
        }

        $scope.GradeRedirect = function () {
            $state.go('Grade');
        }


        $scope.SubjectRedirect = function () {
            $state.go('Subject');
        }

        $scope.ExamSubjectRedirect = function () {
            $state.go('ExamSubject');
        }

        $scope.Id = 0;
        $scope.ExamName = '';
        $scope.ExamCode = '';
        $scope.Duration = '';
        $scope.Description = '';
        $scope.Grade = '';
        


        // Initialisation of filters for Exam
        $scope.ExamCode1 = '';
        $scope.ExamName1 = '';

        // Filter Initialization for Subject
        $scope.SubjectTypeId = '';



        $scope.flag = 0;
        $scope.flag1 = 0;
        $scope.flag2 = 0;
        $scope.Status1 = "-1";
        $scope.IsActive = "1";



        /* This is function for Pagination */
        $scope.listdata = [];
        $scope.current_page = 1;
        $scope.page_size = 10;
        $scope.rembemberCurrentPage = function (p) {
            $scope.current_page = p
        }
        $scope.ExamList = [];

        $scope.SearchExamlist = function () {

            var obj = {
                ExamCode1: $scope.ExamCode1,
                ExamName1: $scope.ExamName1,
                IsActive: $scope.IsActive,
                InstitutionId: $scope.InstitutionId
            };
           
            $http.post(baseUrl + '/getExamList', obj).then(function success(response) {
                // //console.log(response.data);
                $scope.emptydatas = [];
                $scope.ExamList = [];
                $scope.ExamList = response.data;

                if ($scope.ExamList.length > 0) {
                    $scope.flag = 1;
                } else {
                    $scope.flag = 0;
                }
            })
        }



        $scope.AddExamModal = function (OTId) {
            $scope.Id = OTId;
            angular.element('#ExamAddModal').modal('show');
        }

        $scope.ViewExamModal = function (OTId) {
            $scope.Id = OTId;
            $scope.Exam_View();
            angular.element('#ExamViewModal').modal('show');
        }

        $scope.EditModal = function (OTId) {
            $scope.Id = OTId;
            $scope.Exam_View();
            angular.element('#ExamAddModal').modal('show');
        }


        $scope.ExamValidationcontrols = function () {

            if (typeof ($scope.ExamName) == "undefined" || $scope.ExamName == "") {
                alert("Please enter Exam Name");
                return false;
            } else if (typeof ($scope.ExamCode) == "undefined" || $scope.ExamCode == "") {
                alert("Please enter Exam Code");
                return false;
            }


            // if (typeof($scope.Duration_Hour) == "" && $scope.Duration_Minutes == "") {
            //     alert("Please enter Duration");
            //     return false;
            // } 
            // else if (($scope.Duration_Hour) == "" && ($scope.Duration_Minutes == "")) {
            //     alert("Please enter Time Duration");
            //     return false;
            // }
            // else if (typeof($scope.Duration_Minutes) == "undefined" || $scope.Duration_Minutes == "") {
            //     alert("Please enter Duration");
            //     return false;
            // }
            else if (typeof ($scope.Duration_Hour) == "undefined" || $scope.Duration_Hour == "") {
                alert("Please enter Time Duration");
                return false;
            }
            // else if (typeof($scope.Duration_Hour) > 9) {
            //     alert("Please enter Time Duration");
            //     return false;
            // }
            else if (parseInt($scope.Duration_Hour) > 8) {
                alert("Please enter Duration hour less than 9");
                return false;
            } else if (parseInt($scope.Duration_Minutes) > 59) {
                alert("Please enter proper Duration Minutes");
                return false;
            }
            return true;
        };



        $scope.Exam_Delete = function (OTId) {
            $scope.Id = OTId;
            var del = confirm("Do you like to delete the selected Exam?");
            if (del == true) {
                var data = {
                    ExamId: $scope.Id,
                    InstitutionId: $scope.InstitutionId
                }
                $http.post(baseUrl + '/DeleteExamName', data).then(function success(response) {
                    // //console.log(response.data);
                    if (response.data[0].val == 2) {
                        alert("Exam has been deleted successfully");
                        $scope.SearchExamlist();
                    } else if (response.data[0].val == 1) {
                        alert("Exam is already used, cannot be deleted");
                        $scope.SearchExamlist();
                    }
                });
            };
        }

        $scope.Id = 0;
        $scope.DuplicateId = 0;
        $scope.Value = [];
        $scope.Exam_AddEdit = function () {
            if ($scope.ExamValidationcontrols() == true) {
                if ($scope.ExamName != "") {
                    var obj = {

                        Id: $scope.Id == undefined ? 0 : $scope.Id,
                        ExamName: $scope.ExamName,
                        InstitutionId: $scope.InstitutionId
                    }
                    $http.post(baseUrl + '/getExamDuplicateCheck', obj).then(function success(response) {
                        $scope.Value = response.data;
                        angular.forEach($scope.Value, function (v, index) {
                            $scope.val = v.val;
                        })
                        if ($scope.val == 1) {
                            alert("Exam Name already exists, cannot duplicate");
                            return false;
                        }

                        $scope.Exam_InsertUpdate();
                    })

                } else {
                    $scope.Exam_InsertUpdate();
                }
            }

        };

        $scope.Exam_InsertUpdate = function () {
            //if ($scope.ExamValidationcontrols() == true) {
            var obj = {
                Id: $scope.Id,
                ExamName: $scope.ExamName,
                ExamCode: $scope.ExamCode,
                Duration: $scope.Duration_Hour,
                Description: $scope.Description,
                GradeT: $scope.GradeT,
                Duration_Minutes: $scope.Duration_Minutes,
                Duration_Hour: $scope.Duration_Hour,
                InstitutionId: $scope.InstitutionId
            };
            ////console.log(obj);
            $http.post(baseUrl + '/addExam', obj).then(function success(response) {

                if (response.data !== 0) {
                    alert("Added/Updated successfully");
                    $scope.CancelPopup();
                    $eid = response.data;
                    $scope.SearchExamlist();
                 
                } else {
                    alert("Insert/Update Problem");
                }
            });
            // }
        };

        $scope.Exam_View = function () {
          
            var data = {
                Id: $scope.Id
            }
            $http.post(baseUrl + '/getExamView', data).then(function success(response) {
            

                $scope.ExamName = response.data[0].examname;
                $scope.ExamCode = response.data[0].examcode;
                $scope.Duration_Hour = response.data[0].duration_hour;
                $scope.Duration_Minutes = response.data[0].duration_minutes;
                $scope.Description = response.data[0].description;
                $scope.GradeT = response.data[0].gradet;
                // //console.log(response.data);
            })
        };

        $scope.ChildSubjects = "0";

        $scope.ErrorFunction = function () {
            alert("Inactive record cannot be edited");
        }

        $scope.ClearPopup = function () {
            $scope.ExamName = '';
            $scope.ExamCode = '';
            $scope.Description = '';
            $scope.GradeT = '';
            $scope.Duration_Hour = '';
            $scope.Duration_Minutes = '';
            $scope.AcademicYear = '';
            $scope.Course = '';
            $scope.SubjectName = '';
            $scope.SubjectType = '';
            $scope.Remarks = '';
            $scope.ChildSubjects = "0";

            $scope.ESAcademicYear = '';
            $scope.ESCourse = '';
            $scope.ExamName = '';
            $scope.SubjectName = '';
            $scope.TotalMark = '';
            $scope.PassMark = '';
            $scope.Total = '';
            angular.forEach($scope.SubjectNameList, function (selectedstudent, index) {
                selectedstudent.Pass = '';
                selectedstudent.Total = '';
            });
        };
        $scope.SubjectNameList = [];
        $scope.CancelPopup = function () {
            angular.element('#ExamAddModal').modal('hide');
            angular.element('#ExamViewModal').modal('hide');
            $scope.ClearPopup();
        }


        $scope.InActive = function (OTId) {
            $scope.Id = OTId;
            var del = confirm("Do you like to inactivate the selected detail?");
            if (del == true) {
                var data = {
                    Id: $scope.Id
                }
                $http.post(baseUrl + '/inactiveExam', data).then(function success(response) {
                    if (response.data == 1) {
                        alert("Selected detail has been inactivated successfully");
                        $eid = response.data;
                       
                    } else {
                        alert("An error has occurred while deleting Detail");
                        $eid = response.data;
                       
                    }
                    $scope.SearchExamlist($eid);
                });
            };
        }

        $scope.Active = function (OTId) {
            $scope.Id = OTId;
            var del = confirm("Do you like to activate the selected detail?");
            if (del == true) {
                var data = {
                    Id: $scope.Id
                }
                $http.post(baseUrl + '/activeExam', data).then(function success(response) {
                    if (response.data == 1) {
                        alert("Selected detail has been activated successfully");
                        $eid = response.data;
                        $scope.SearchExamlist($eid);
                    } else {
                        alert("An error has occurred while ReInserting detail");
                        $eid = response.data;
                        $scope.SearchExamlist($eid);
                    }
                });
            };
        }

    }
]);

//This is Subject Controller
OEMSController.controller("SubjectController", ['$scope', '$http', '$state', '$filter', '$stateParams', '$window', 'CommonLabelNames', 'CommonHeadingNames', 'CommonButtonNames', 'filterFilter',
    function ($scope, $http, $state, $filter, $stateParams, $window, $CommonLabelNames, $CommonHeadingNames, $CommonButtonNames, $ff) {
        // Exam Menu
        if(loginFrom==0)
        {
             window.location.href = baseUrl + "/";        
        }
        $scope.AcademicYearRedirect = function () {
            $state.go('Organiser');
        }

        $scope.CourseSecRedirect = function () {
            $state.go('CourseSection');
        }

        $scope.GradeRedirect = function () {
            $state.go('Grade');
        }

        $scope.ExamMenuRedirect = function () {
            $state.go('Exam');
        }

        $scope.SubjectRedirect = function () {
            $state.go('Subject');
        }

        $scope.ExamSubjectRedirect = function () {
            $state.go('ExamSubject');
        }
        $scope.Id = 0;
        $scope.Description = '';
        $scope.ChildCount = '';
        $scope.HasChild = "0";
        //Subject
        // $scope.AcademicYear = '';
        $scope.Course = '';
        $scope.SubjectName = '';
        $scope.SubjectType = '';
        $scope.Remarks = '';

        // Exam/Subject
        $scope.ESAcademicYear = '';
        $scope.ESCourse = '';
        $scope.SubjectName = '';
        $scope.Total = '';
        $scope.Pass = '';
        $scope.Description = '';


        // Filter Initialization for Subject
        $scope.SubjectTypeId = '';
        $scope.ChildSubjects = "0";
        // Initialising List Values for Exam/Subject
        $scope.SubjectNameId = '';
        // $scope.AcademicYearId = '';
        $scope.CourseId = '';
        $scope.ChildSubjects = "0";
        $scope.flag = 0;
        $scope.flag1 = 0;
        $scope.flag2 = 0;
        $scope.Status1 = "-1";
        $scope.IsActive = "1";
        $scope.ExamNameList = [];
        $scope.SubjectsNameList = [];

        $scope.InstitutionId =1;
        var data ={
            InstitutionId : $scope.InstitutionId
        }

        $http.post('/getSubjectsNamelist',data).then(function success(response) {
            $scope.SubjectsNameList = response.data;
        });

        /* This is function for Pagination */
        $scope.listdata = [];
        $scope.current_page = 1;
        $scope.page_size = 10;
        $scope.rembemberCurrentPage = function (p) {
            $scope.current_page = p
        }

        $scope.Acyear = "";
        //$scope.Acyear="";

        $scope.flag4 = 0;
        $scope.AcademicYear1 = '';

        $scope.AcademicYearBasedCourseFunction = function () {
            if ($scope.AcademicYear == 0) {
                var data ={
                    InstitutionId : $scope.InstitutionId
                }
                $http.post(baseUrl + '/getcourselist',post).then(function success(response) {
                    $scope.Courselist = response.data;
                });
            } else {
                var obj = {
                    AcademicYearId: $scope.AcademicYear,
                    InstitutionId : $scope.InstitutionId
                }
                $http.post(baseUrl + '/getAcademicYearBasedCourse', obj).then(function success(response) {
                    // //console.log(response.data);
                    $scope.Courselist = response.data;
                    ////console.log(response.data);
                });
            }
        }
        $scope.SubjectsNameList = [];
        $http.post(baseUrl + '/getSubjectsNamelist',data).then(function success(response) {
            // //console.log(response.data);
            $scope.SubList = response.data;
        });
       


        $scope.SubjectFlag = 0;

        $scope.CourseBasedSubjectFunction = function () {

            var obj = {
                CourseId: $scope.ESCourse,
                AcademicYearId: $scope.ESAcademicYear,
                InstitutionId : $scope.InstitutionId
            }
            $http.post(baseUrl + '/CourseBasedSubject', obj).then(function success(response) {
                // //console.log(response.data);
                $scope.SubjectNameList = response.data;
                if ($scope.SubjectNameList.length > 0) {
                    $scope.SubjectFlag = 1;
                } else {
                    $scope.SubjectFlag = 0;
                }
                ////console.log(response.data);
            });

        }



        $scope.CourseList = [];
        $http.post(baseUrl + '/getcourselist',data).then(function success(response) {
            $scope.Courselist = response.data;
        });
      
        $scope.AcademicYearList = [];
        $http.post(baseUrl + '/getAcademicYearList',data).then(function success(response) {
            $scope.AcademicYearList = response.data;
            $scope.AcyYear = $ff(response.data, {
                academicflag: 1
            });
            $scope.AcademicYearId = $scope.AcyYear[0].id.toString();
            $scope.AcademicYear = $scope.AcyYear[0].id.toString();
            $scope.AcademicYearBasedCourseFunction();
            //$scope.SubjectAcademicYearBasedCourseFunction();
            $scope.SearchSubjectlist();
            ////console.log(response.data);
        });

        $scope.SubjectTypeList = [];
        $http.post(baseUrl + '/getsubjecttypelist',data).then(function success(response) {
            $scope.SubjectTypeList = response.data;
            ////console.log(response.data);
        });

        $scope.ChildSubjectList = [];
        $scope.AcademicYearCourseBasedMainSubject = function () {

            var obj = {
                AcademicYearId: $scope.AcademicYear,
                CourseId: $scope.Course,
                InstitutionId : $scope.InstitutionId
            }
             //console.log(obj);
            $http.post(baseUrl + '/getchildsubjectlist', obj).then(function success(response) {
                 //console.log(response.data);
                // $scope.SubjectNameList = response.data;
                $scope.ChildSubjectList = $ff(response.data, {
                    subjectparentid: 0
                }, true);
                // //console.log($scope.ChildSubjectList);

                if ($scope.ChildSubjectList.length > 0) {
                    $scope.SubjectFlag = 1;
                } else {
                    $scope.SubjectFlag = 0;
                }
                ////console.log(response.data);
            });

        }
       

        $scope.ChildSubjectList = [];
        $scope.AcademicYearCourseBasedMainSubject = function () {

            var obj = {
                AcademicYearId: $scope.AcademicYear,
                CourseId: $scope.Course,
                InstitutionId : $scope.InstitutionId
            }
             //console.log(obj);
            $http.post(baseUrl + '/getchildsubjectlist', obj).then(function success(response) {
                 //console.log(response.data);
                // $scope.SubjectNameList = response.data;
                $scope.ChildSubjectList = $ff(response.data, {
                    subjectparentid: 0
                }, true);
                // //console.log($scope.ChildSubjectList);

                if ($scope.ChildSubjectList.length > 0) {
                    $scope.SubjectFlag = 1;
                } else {
                    $scope.SubjectFlag = 0;
                }
                ////console.log(response.data);
            });

        }

        $scope.courseClearFunction = function () {
            $scope.Course = "";
        };
        $scope.ChildSubjectClearFunction = function () {
            $scope.ChildSubjects = "0";
        };

        $scope.ErrorFunction = function () {
            alert("Inactive record cannot be edited");
        }

        $scope.ClearPopup = function () {
            $scope.ExamName = '';
            $scope.ExamCode = '';
            $scope.Description = '';
            $scope.GradeT = '';
            $scope.Duration_Hour = '';
            $scope.Duration_Minutes = '';
            $scope.AcademicYear = $scope.AcyYear[0].id.toString();
            $scope.Course = '';
            $scope.SubjectName = '';
            $scope.SubjectType = '';
            $scope.Remarks = '';
            $scope.ChildSubjects = "0";
            $scope.ChildCount = '';
            $scope.ESAcademicYear = '';
            $scope.ESCourse = '';
            $scope.ExamName = '';
            $scope.SubjectName = '';
            $scope.TotalMark = '';
            $scope.PassMark = '';
            $scope.Total = '';

            angular.forEach($scope.SubjectNameList, function (selectedstudent, index) {


                selectedstudent.Pass = '';
                selectedstudent.Total = '';
            });
        };
        $scope.SubjectNameList = [];
        $scope.CancelPopup = function () {
            angular.element('#SubjectAddModal').modal('hide');
            angular.element('#SubjectViewModal').modal('hide');
            $scope.ClearPopup();
        }


        $scope.AddSubjectModal = function (OTId) {
            $scope.Id = OTId;
            angular.element('#SubjectAddModal').modal('show');
        }

        $scope.ViewSubjectModal = function (OTId) {
            $scope.Id = OTId;
            $scope.Subject_View();
            angular.element('#SubjectViewModal').modal('show');
        }

        $scope.EditSubjectModal = function (OTId) {
            $scope.Id = OTId;
            $scope.Subject_View();
            angular.element('#SubjectAddModal').modal('show');

        }
        $scope.ListSubjectValidationcontrols = function () {

            if (typeof ($scope.AcademicYearId) == "undefined" || $scope.AcademicYearId == "") {
                alert("Please select Academic Year");
                return false;
            }
            return true;
        };
        $scope.flag5 = 0;

        $scope.SubjectList = [];
        $scope.SearchSubjectlist = function () {
            if ($scope.ListSubjectValidationcontrols() == true) {
                $scope.emptydata = [];
                $scope.SubjectList = [];
                var obj = {
                    AcademicYearId: $scope.AcademicYearId,
                    CourseId: $scope.CourseId,
                    SubjectTypeId: $scope.SubjectTypeId,
                    SubjectName1: $scope.SubjectName1,
                    IsActive: $scope.IsActive,
                    InstitutionId : $scope.InstitutionId

                };
                // //console.log(obj);
                $http.post(baseUrl + '/getSubjectList', obj).then(function success(response) {
                    // //console.log(response.data);
                    $scope.emptydata = [];
                    $scope.SubjectList = [];
                    $scope.SubjectList = response.data;

                    if ($scope.SubjectList.length > 0) {
                        $scope.flag5 = 1;
                    } else {
                        $scope.flag5 = 0;
                    }
                })
            }
        }

        $scope.SubjectValidationcontrols = function () {

            if (typeof ($scope.AcademicYear) == "undefined" || $scope.AcademicYear == "") {
                alert("Please select Academic Year");
                return false;
            } else if (typeof ($scope.Course) == "undefined" || $scope.Course == "") {
                alert("Please select Course");
                return false;
            } else if (typeof ($scope.SubjectName) == "undefined" || $scope.SubjectName == "") {
                alert("Please select Subject Name");
                return false;
            } else if (typeof ($scope.SubjectType) == "undefined" || $scope.SubjectType == "") {
                alert("Please select Subject Type");
                return false;
            }
            return true;
        };


        $scope.Subject_Delete = function (OTId) {
            $scope.Id = OTId;

            var del = confirm("Do you like to delete the selected detail?");
            if (del == true) {
                var data = {
                    SubjectNameId: $scope.Id
                }
                // //console.log(data);
                $http.post(baseUrl + '/DeleteSubjectName', data).then(function success(response) {
                    // //console.log(response.data);
                    if (response.data[0].val == 4) {
                        alert("Subject Name has been deleted successfully");
                        $scope.SearchSubjectlist();
                    } else if (response.data[0].val == 1) {
                        alert("Subject Name already used in Exam/Subject, Cannot deleted");
                        $scope.SearchSubjectlist();
                    } else if (response.data[0].val == 2) {
                        alert("Subject Name already used in Staff/Subject, Cannot deleted");
                        $scope.SearchSubjectlist();
                    } else if (response.data[0].val == 3) {
                        alert("Subject Name already used in Class Time Table, Cannot deleted");
                        $scope.SearchSubjectlist();
                    }
                });
            };
        }

        $scope.Id = 0;
        $scope.DuplicateId = 0;

        $scope.Value = [];
        $scope.Subject_AddEdit = function () {
            if ($scope.SubjectValidationcontrols() == true) {

                if ($scope.SubjectName != "") {
                    var obj = {
                        Id: $scope.Id == undefined ? 0 : $scope.Id,
                        AcademicYearId: $scope.AcademicYear,
                        CourseId: $scope.Course,
                        SubjectName: $scope.SubjectName,
                        InstitutionId : $scope.InstitutionId
                    }
                    // //console.log(obj);
                    $http.post(baseUrl + '/getSubjectDuplicateCheck', obj).then(function success(response) {
                        $scope.Value = response.data;
                        angular.forEach($scope.Value, function (v, index) {
                            $scope.val = v.val;
                        })
                        // //console.log($scope.val);
                        if ($scope.val == 1) {
                            alert("Subject Name already exists,cannot duplicate");
                            return SubjectName;
                        }


                        $scope.Subject_InsertUpdate();
                    })

                } else {
                    $scope.Subject_InsertUpdate();
                }
            }
        };
        $scope.Subject_InsertUpdate = function () {

            var obj = {


                Id: $scope.Id,
                AcademicYearId: $scope.AcademicYear,
                CourseId: $scope.Course,
                SubjectName: $scope.SubjectName,
                SubjectParentId: $scope.ChildSubjects,
                SubjectTypeId: $scope.SubjectType,
                Remarks: $scope.Remarks,
                HasChild: $scope.HasChild,
                InstitutionId : $scope.InstitutionId
            };
            // //console.log(obj);
            $http.post(baseUrl + '/addSubject', obj).then(function success(response) {
                $http.post(baseUrl + '/UpdateHasChild', obj).then(function success(response1) {
                    // //console.log(response.data);

                    if (response.data !== 0) {
                        alert("Added/Updated successfully");
                        $scope.CancelPopup();
                        $mid = response.data[0].p_Id;
                        // //console.log($eid);

                        $scope.SearchSubjectlist();
                    } else {
                        alert("Insert/Update Problem");
                    }
                });
            });

        };

        $scope.Subject_View = function () {
            var data = {
                Id: $scope.Id
            }
            $http.post(baseUrl + '/getSubjectView', data).then(function success(response) {
                // //console.log(response.data);
                $scope.Id = response.data[0].id;

                $scope.AcademicYear = response.data[0].academicyearid.toString();
                $scope.ViewAcademicYear = response.data[0].academicyear;

                $scope.Course = response.data[0].courseid.toString();
                $scope.ViewCourseName = response.data[0].course;
                $scope.AcademicYearCourseBasedMainSubject();
                $scope.SubjectName = response.data[0].subjectnameid.toString();
                $scope.ViewSubjectName = response.data[0].subjectname;
                // //console.log($scope.SubjectName);
                $scope.SubjectType = response.data[0].subjecttypeid.toString();

                $scope.ViewSubjectType = response.data[0].subjecttype;
             
                $scope.ChildSubjects = response.data[0].subjectparentid.toString();

                $scope.ViewMainSubjects = response.data[0].mainsubject;
                // //console.log($scope.ChildSubjects);

                // $scope.ChildSubjects = response.data[0].SubjectParentId.toString();


                // //console.log($scope.SubjectName);
                $scope.Remarks = response.data[0].remarks;
                $scope.ChildCount = response.data[0].count;
                // //console.log($scope.ChildCount);
            })
        };

        $scope.InActiveSubject = function (OTId) {
            $scope.Id = OTId;
            var del = confirm("Do you like to inactivate the selected Subject?");
            if (del == true) {
                var data = {
                    Id: $scope.Id
                }
                $http.post(baseUrl + '/inactiveSubject', data).then(function success(response) {
                    if (response.data == 1) {
                        alert("Selected Subject has been inactivated successfully");
                        $scope.SearchSubjectlist();
                    } else {
                        alert("An error has occurred while deleting Detail");
                        $scope.SearchSubjectlist();
                    }
                });
            };
        }

        $scope.ActiveSubject = function (OTId) {
            $scope.Id = OTId;
            var del = confirm("Do you like to activate the selected Subject?");
            if (del == true) {
                var data = {
                    Id: $scope.Id
                }
                $http.post(baseUrl + '/activeSubject', data).then(function success(response) {
                    if (response.data == 1) {
                        alert("Selected Subject has been activated successfully");
                        $scope.SearchSubjectlist();
                    } else {
                        alert("An error has occurred while ReInserting detail");
                        $scope.SearchSubjectlist();
                    }
                });
            };
        }


        $scope.AddExamSubjectModal = function (OTId) {
            $scope.Id = OTId;
            angular.element('#ExamSubjectAddModal').modal('show');
        }

        $scope.ViewExamSubjectModal = function (OTId) {
            $scope.Id = OTId;
            $scope.ExamSubject_View();
            angular.element('#ExamSubjectViewModal').modal('show');
        }

        $scope.EditExamSubjectModal = function (OTId) {
            $scope.Id = OTId;
            $scope.ExamSubject_View();
            angular.element('#ExamSubjectAddModal').modal('show');

        }

        $scope.Validationcontrols = function () {
            if (typeof ($scope.ESAcademicYear) == "undefined" || $scope.ESAcademicYear == "") {
                alert("Please select Academic Year");
                return false;
            } else if (typeof ($scope.ESCourse) == "undefined" || $scope.ESCourse == "") {
                alert("Please select Course");
                return false;
            } else if (typeof ($scope.ExamName) == "undefined" || $scope.ExamName == "") {
                alert("Please select Exam Name");
                return false;
            }
            // else if (typeof($scope.SubjectName) == "undefined" || $scope.SubjectName == "") {
            //     alert("Please select Subject Name");
            //     return false;
            // }
            // else if (typeof($scope.Pass) == "undefined" || $scope.Pass == "") {
            //     alert("Please enter Pass ");
            //     return false;
            // }
            // else if (typeof($scope.Total) == "undefined" || $scope.Total == "") {
            //     alert("Please enter Total");
            //     return false;
            // }
            return true;
        };

        $scope.model = {
            selectedLabelList: []
        }

        $scope.isSelectAll = function () {
            // alert("hi");
            $scope.model.selectedLabelList = [];
            if ($scope.master) {
                $scope.master = true;
                for (var i = 0; i < $scope.SubjectNameList.length; i++) {
                    $scope.model.selectedLabelList.push($scope.SubjectNameList[i].Id);
                }
            } else {
                $scope.master = false;
            }
            angular.forEach($scope.SubjectNameList, function (item) {
                item.selectedstudent = $scope.master;
            });
        }
        $scope.FillPassfunction = function () {
            angular.forEach($scope.SubjectNameList, function (selectedstudent, index) {
                if (selectedstudent.selectedstudent) {
                    //$scope.flagstatus = 1;
                    selectedstudent.Pass = $scope.PassMark
                }

            });
        };
        $scope.FillTotalfunction = function () {
            angular.forEach($scope.SubjectNameList, function (selectedstudent, index) {
                //$scope.flagstatus = 1;
                selectedstudent.Total = $scope.TotalMark

            });
        };

        $scope.ClearFunction = function () {
            // alert('hi');
            selectedstudent.Total = '';
            $scope.SubjectNameList = [];

        };
        $scope.subjectWiseData = [];
        $scope.subject_wise_reports = function () {
           $http.post(baseUrl + '/subject_wise_rep').then(function success(response) {
               $scope.emptydata=[];
               $scope.subjectWiseData = response.data;
               $scope.todayDate = new Date();
           });
       }

    }
]);

//This is Exam Subject Controller

OEMSController.controller("ExamSubjectController", ['$scope', '$http', '$state', '$filter', '$stateParams', '$window', 'CommonLabelNames', 'CommonHeadingNames', 'CommonButtonNames', 'filterFilter',
    function ($scope, $http, $state, $filter, $stateParams, $window, $CommonLabelNames, $CommonHeadingNames, $CommonButtonNames, $ff) {
        if(loginFrom==0)
        {
             window.location.href = baseUrl + "/";        
        }
        // Exam Menu
        $scope.Id = 0;
        $scope.ExamName = '';
        $scope.ExamCode = '';
        $scope.Duration = '';
        $scope.Description = '';
        $scope.Grade = '';

        //Subject
        $scope.AcademicYear = '';
        $scope.Course = '';
        $scope.SubjectName = '';
        $scope.SubjectType = '';
        $scope.Remarks = '';

        // Exam/Subject
        // $scope.ESAcademicYear = '';
        $scope.ESCourse = '';
        $scope.SubjectName = '';
        $scope.ExamName = '';
        $scope.Total = '';
        $scope.Pass = '';
        $scope.Description = '';

        // Initialisation of filters for Exam
        $scope.ExamCode1 = '';
        $scope.ExamName1 = '';

        // Filter Initialization for Subject
        $scope.SubjectTypeId = '';

        // Initialising List Values for Exam/Subject
        $scope.SubjectNameId = '';
        $scope.ExamNameId = '';
        $scope.AcademicYearId = '';
        $scope.CourseId = '';

        $scope.flag = 0;
        $scope.flag1 = 0;
        $scope.flag2 = 0;
        $scope.Status1 = "-1";
        $scope.IsActive = "1";
        $scope.InstitutionId =1;        

        $scope.AcademicYearRedirect = function () {
            $state.go('Organiser');
        }

        $scope.CourseSecRedirect = function () {
            $state.go('CourseSection');
        }

        $scope.GradeRedirect = function () {
            $state.go('Grade');
        }

        $scope.ExamMenuRedirect = function () {
            $state.go('Exam');
        }

        $scope.SubjectRedirect = function () {
            $state.go('Subject');
        }

        $scope.ExamSubjectRedirect = function () {
            $state.go('ExamSubject');
        }

        $scope.SubjectsNameList = [];
        var data ={
            InstitutionId : $scope.InstitutionId
        }
        // $http.post('/getSubjectsNamelist',data).then(function success(response) {
        //     $scope.SubjectsNameList = response.data;
        // });
        /* This is function for Pagination */
        $scope.listdata = [];
        $scope.current_page = 1;
        $scope.page_size = 10;
        $scope.rembemberCurrentPage = function (p) {
            $scope.current_page = p
        }

        $scope.AcademicYearBasedCourseFunction = function () {
            if ($scope.ESAcademicYear == 0) {
                var data ={
                    InstitutionId : $scope.InstitutionId
                }
                $http.post(baseUrl + '/getcourselist',data).then(function success(response) {
                    $scope.Courselist = response.data;
                });
            } else {
                var obj = {
                    AcademicYearId: $scope.ESAcademicYear,
                    InstitutionId : $scope.InstitutionId
                }
                $http.post(baseUrl + '/getAcademicYearBasedCourse', obj).then(function success(response) {

                    $scope.Courselist = response.data;
                    ////console.log(response.data);
                });
            }
        }

        $scope.SubjectAcademicYearBasedCourseFunction = function () {
            var obj = {
                AcademicYearId: $scope.AcademicYear,
                InstitutionId : $scope.InstitutionId
            }
            $http.post(baseUrl + '/getAcademicYearBasedCourse', obj).then(function success(response) {
                $scope.Courselist = response.data;
            });

        }
        $scope.SubjectFlag = 0;
        $scope.CourseBasedSubjectFunction = function () {
            var obj = {
                CourseId: $scope.ESCourse,
                AcademicYearId: $scope.ESAcademicYear,
                InstitutionId : $scope.InstitutionId
            }
            $http.post(baseUrl + '/CourseBasedSubject', obj).then(function success(response) {
                $scope.SubjectNameList = response.data;
                if ($scope.SubjectNameList.length > 0) {
                    $scope.SubjectFlag = 1;
                } else {
                    $scope.SubjectFlag = 0;
                }
            });
        }

        $scope.CourseBasedExamNameFunction = function () {

            if ($scope.CourseId == 0) {
                var data ={
                    InstitutionId : $scope.InstitutionId
                }
                $http.post(baseUrl + '/getExamNameList',data).then(function success(response) {
                    $scope.Filter_ExamNameList = response.data;

                });
            } else {

                var obj = {
                    AcademicYearId: $scope.AcademicYearId,
                    CourseId: $scope.CourseId
                }
                $http.post(baseUrl + '/getCourseBasedExamList', obj).then(function success(response) {
                    $scope.Filter_ExamNameList = response.data;
                });
            }  
        };

        $scope.ExamNameClearFunction = function () {
            $scope.ExamNameId = "";
        }


        $scope.CourseList = [];
        var data ={
            InstitutionId : $scope.InstitutionId
        }
        $http.post(baseUrl + '/getcourselist',data).then(function success(response) {
            $scope.Courselist = response.data;
        });

        $scope.AcademicYearList = [];        
        $http.post(baseUrl + '/getAcademicYearList',data).then(function success(response) {
            $scope.AcademicYearList = response.data;
            $scope.AcyYear = $ff(response.data, {
                academicflag: 1
            });
            $scope.ESAcademicYear = $scope.AcyYear[0].id.toString();
            $scope.AcademicYearId = $scope.AcyYear[0].id.toString();


            $scope.AcademicYearBasedCourseFunction();
            $scope.ExamSubjectsearch();
        });

        $scope.CourseClearFunction = function () {
            $scope.ESCourse = '';
        };


        $scope.ErrorFunction = function () {
            alert("Inactive record cannot be edited");
        }

        $scope.ClearPopup = function () {
            $scope.SubjectNameList = [];
            $scope.ExamName = '';
            $scope.ExamCode = '';
            $scope.Description = '';
            $scope.GradeT = '';
            $scope.Duration_Hour = '';
            $scope.Duration_Minutes = '';
            $scope.AcademicYear = '';
            $scope.Course = '';
            $scope.SubjectName = '';
            $scope.SubjectType = '';
            $scope.Remarks = '';
            $scope.ChildSubjects = "0";
            $scope.SubjectFlag = "0"
            $scope.ESAcademicYear = $scope.AcyYear[0].id.toString();
            $scope.ESCourse = '';
            $scope.ExamName = '';
            $scope.SubjectName = '';
            $scope.TotalMark = '';
            $scope.PassMark = '';
        };
      
        $scope.CancelPopup = function () {
            angular.element('#ExamSubjectAddModal').modal('hide');
            angular.element('#ExamSubjectViewModal').modal('hide');
            angular.element('#ExamSubjectEditModal').modal('hide');
            $scope.ClearPopup();
        }

        $scope.ExamNameList = [];
        $http.post(baseUrl + '/getExamNameList',data).then(function success(response) {
            //console.log(response.data);
            $scope.ExamNameList = response.data;
        });

        $scope.AddExamSubjectModal = function (OTId) {
            $scope.Id = OTId;
            angular.element('#ExamSubjectAddModal').modal('show');
        }

        $scope.ViewExamSubjectModal = function (OTId) {
            $scope.Id = OTId;
            $scope.ExamSubject_View(1);
            angular.element('#ExamSubjectViewModal').modal('show');
        }

        $scope.EditExamSubjectModal = function (OTId) {
            $scope.Id = OTId;
            $scope.ExamSubject_View(2);
            angular.element('#ExamSubjectAddModal').modal('show');

        }

        $scope.ListValidationcontrols = function () {
            if (typeof ($scope.AcademicYearId) == "undefined" || $scope.AcademicYearId == 0) {
                alert("Please select Academic Year");
                return false;
            }
            return true;
        }

        $scope.ExamSubjectList = [];
        $scope.ExamSubjectsearch = function () {
            if ($scope.ListValidationcontrols() == true) {
                $scope.emptydata = [];
                $scope.ExamSubjectList = [];
                var obj = {
                    AcademicYearId: $scope.AcademicYearId,
                    CourseId: $scope.CourseId,
                    SubjectNameId: $scope.SubjectNameId,
                    ExamNameId: $scope.ExamNameId,
                    IsActive: $scope.IsActive,
                    InstitutionId :$scope.InstitutionId
                };

                $scope.filteredExamSubjectSearch(obj);
            }
        }
        $scope.filteredExamSubjectSearch = function (obj) {

            $http.post(baseUrl + '/getExamSubjectList', obj).then(function success(response) {

                $http.post(baseUrl + '/getExamSubjectInnerList', obj).then(function success(response1) {

                    $scope.emptydata = [];
                    $scope.ExamSubjectList = [];
                    $scope.ExamSubjectList = response.data;

                    $scope.ExamSubjectInnerTableList = [];
                    $scope.ExamSubjectInnerTableList = response1.data;

                    if ($scope.ExamSubjectList.length > 0) {
                        $scope.flag2 = 1;
                    } else {
                        $scope.flag2 = 0;
                    }
                })
            })
        }

        $scope.Validationcontrols = function () {
            from = 0;
            angular.forEach($scope.SubjectNameList, function (value, index) {

                if (parseInt(value.Total) < parseInt(value.Pass)) {
                    from = 1;
                }
            });
            if (($scope.SubjectNameList.length) != null) {
                if (from == 1) {
                    alert("Total should be greater than Pass");
                    return false;
                }
            }

            if (typeof ($scope.ESAcademicYear) == "undefined" || $scope.ESAcademicYear == "") {
                alert("Please select Academic Year");
                return false;
            } else if (typeof ($scope.ESCourse) == "undefined" || $scope.ESCourse == "") {
                alert("Please select Course");
                return false;
            } else if (typeof ($scope.ExamName) == "undefined" || $scope.ExamName == "") {
                alert("Please select Exam Name");
                return false;
            }

            if (($ff($scope.SubjectNameList, {
                    selectedstudent: true
                }, true)).length == 0) {
                alert("Please enter Subject mark details");
                return false;
            };

            return true;
        };

        $scope.SubjectsbasedCheckboxfunction = function (SubjectParentId, Id) {
            var filteredSubject = $ff($scope.SubjectNameList, {
                Id: Id
            }, true)

            if (filteredSubject[0].selectedstudent == false) {
                filteredSubject[0].Total = "";
                filteredSubject[0].Pass = "";
                $scope.FillPassfunction();
                $scope.FillTotalfunction();
            }
        };

        $scope.model = {
            selectedLabelList: []
        }

        $scope.isSelectAll = function () {

            $scope.model.selectedLabelList = [];
            if ($scope.master) {
                $scope.master = true;
                for (var i = 0; i < $scope.SubjectNameList.length; i++) {
                    $scope.model.selectedLabelList.push($scope.SubjectNameList[i].Id);
                }
            } else {
                $scope.master = false;
            }
            angular.forEach($scope.SubjectNameList, function (item) {
                item.selectedstudent = $scope.master;
            });
        }
        $scope.FillPassfunction = function () {
            angular.forEach($scope.SubjectNameList, function (selectedItem, index) {
                if (selectedItem.selectedstudent) {
                    selectedItem.Pass = $scope.PassMark
                }
                if (selectedItem.SubjectParentId > 0)
                    $scope.TotalMarks(selectedItem.SubjectParentId);
            });
        };
        $scope.FillTotalfunction = function () {
            angular.forEach($scope.SubjectNameList, function (selectedItem, index) {
                if (selectedItem.selectedstudent) {
                    selectedItem.Total = $scope.TotalMark
                }
                if (selectedItem.SubjectParentId > 0)
                    $scope.TotalMarks(selectedItem.SubjectParentId);

            });
        };


        $scope.ClearFunction = function () {

            //  selectedstudent.Total = '';
            // $scope.SubjectNameList = [];

        };


        $scope.Id = 0;
        $scope.DuplicateId = 0;

        $scope.Value = [];
        $scope.ExamSubject_AddEdit = function () {

            if ($scope.ExamName != "") {
                var objs = {
                    Id: $scope.Id == undefined ? 0 : $scope.Id,
                    AcademicYearId: $scope.ESAcademicYear,
                    CourseId: $scope.ESCourse,
                    ExamNameId: $scope.ExamName,
                    InstitutionId :$scope.InstitutionId
                }

                $http.post(baseUrl + '/getExamNameDuplicateCheck', objs).then(function success(response) {

                    $scope.Value = response.data;
                    angular.forEach($scope.Value, function (v, index) {
                        $scope.val = v.val;
                    })

                    if ($scope.val == 1) {
                        alert("Exam/Subject already defined for this course cannot be duplicate");
                        return ExamName;
                    }


                    $scope.ExamSubjectAddEdit();
                })

            } else {
                $scope.ExamSubjectAddEdit();
            }


        };

        $scope.ExamSubjectAddEdit = function () {
            if ($scope.Validationcontrols() == true) {
                var obj = {
                    Id: $scope.Id,
                    AcademicYearId: $scope.ESAcademicYear,
                    CourseId: $scope.ESCourse,
                    // SubjectNameId:selectedstudent.Id,
                    ExamNameId: $scope.ExamName,
                    // Total:selectedstudent.Total,
                    // Pass:selectedstudent.Pass,
                    Description: $scope.Description,
                    InstitutionId :$scope.InstitutionId
                };

                $http.post(baseUrl + '/addExamSubject', obj).then(function success(response) {
                    $scope.ExamSubjectId = response.data[0].p_id;

                    $scope.MasterId = response.data;

                    // var ExamSubjectId = response.data;
                    angular.forEach($scope.SubjectNameList, function (selectedStudent, index) {
                        if (selectedStudent.selectedstudent) {
                            // alert('test');
                            var obj1 = {
                                Id: selectedStudent.childid,
                                ExamSubjectId: $scope.ExamSubjectId,
                                SubjectId: selectedStudent.id,
                                Total: selectedStudent.Total,
                                Pass: selectedStudent.Pass,
                                OrderBy: index,
                                InstitutionId :$scope.InstitutionId
                            };
                            //console.log(obj1);

                            $http.post(baseUrl + '/AddSubjectDetailsMaster', obj1).then(function success(response1) {});
                        }

                    });
                    if (response.data !== 0) {
                        alert("Added/Updated successfully");

                        var obj_filter = {
                            AcademicYearId: $scope.ESAcademicYear,
                            CourseId: $scope.ESCourse,
                            SubjectNameId: "0",
                            ExamNameId: $scope.ExamName
                        };
                        $scope.CancelPopup();
                        $mid = response.data;

                        $scope.ExamSubjectsave(obj_filter);
                    } else {
                        alert("Insert/Update Problem");
                    }
                });
                //}
                //});
            }

        };


        $scope.ExamSubjectsave = function (obj_filter) {

            $scope.emptydata = [];
            $scope.ExamSubjectList = [];

            $scope.filteredExamSubjectSearch(obj_filter);

        }

        $scope.ExamSubject_View = function (ViewType) {
            var data = {
                Id: $scope.Id
            }
            $http.post(baseUrl + '/getExamSubjectView', data).then(function success(response) {
                $scope.ESAcademicYear = response.data[0].academicyearid.toString();
                $scope.ViewAcademicYear = response.data[0].esacademicyear;
                $scope.ESCourse = response.data[0].courseid.toString();
                $scope.ViewCourseName = response.data[0].escourse;

                // $scope.SubjectName = response.data[0].SubjectNameId.toString();
                // $scope.ViewSubjectName= response.data[0].SubjectName;

                $scope.ExamName = response.data[0].examnameid.toString();
                $scope.ViewExamName = response.data[0].examname;
 
                // $scope.ChildSubjects = response.data[0].SubjectParentId.toString();
                // $scope.ViewCourseName = response.data[0].ESCourse;


                $scope.Description = response.data[0].description;

                // if($scope.ExamSubject_View==1){

                if (ViewType == 1) {
                    var obj = {
                        ExamSubjectId: $scope.Id
                    }
                    $http.post(baseUrl + '/getViewSubjectDetailsList', obj).then(function success(response) {
                        //console.log(response.data);
                        $scope.ViewSubjectList = response.data;
                    })
                }
                if (ViewType == 2) {
                    var obj_edit = {
                        ExamId: $scope.ExamName,
                        AcademicYearId: $scope.ESAcademicYear,
                        CourseId: $scope.ESCourse,
                        InstitutionId :$scope.InstitutionId
                    }
                    // }
                    // else if($scope.ExamSubject_View==2){
                    $http.post(baseUrl + '/getSubjectDetailsList', obj_edit).then(function success(response1) {
                        //console.log(response1.data);
                        $scope.emptydatas = [];

                        $scope.SubjectNameList = [];
                        $scope.SubjectNameList = response1.data;

                        if ($scope.SubjectNameList.length > 0) {
                            $scope.SubjectFlag = 1;
                        } else {
                            $scope.SubjectFlag = 0;
                        }
                    })
                }
                // }
            })
        };
        $scope.TotalMarks = function (SubjectparentId) {

            var totalMark = 0;
            var passMark = 0;
            angular.forEach($scope.SubjectNameList, function (value, index) {
                if (value.SubjectParentId == SubjectparentId) {
                    if (value.Total != undefined)
                        totalMark = totalMark + parseInt(value.Total);
                    if (value.Pass != undefined)
                        passMark = passMark + parseInt(value.Pass);
                }
            });
            angular.forEach($scope.SubjectNameList, function (value, index) {
                if (value.Id == SubjectparentId) {
                    if (totalMark != undefined)
                        value.Total = totalMark;
                    if (passMark != undefined)
                        value.Pass = passMark;
                }
            });

        };


        $scope.InActiveExamSubject = function (OTId) {
            $scope.Id = OTId;
            var del = confirm("Do you like to inactivate the selected detail?");
            if (del == true) {
                var data = {
                    Id: $scope.Id
                }
                $http.post(baseUrl + '/inactiveExamSubject', data).then(function success(response) {
                    if (response.data == 1) {
                        alert("Selected detail has been inactivated successfully");
                        $scope.ExamSubjectsearch();
                    } else {
                        alert("An error has occurred while deleting Detail");
                        $scope.ExamSubjectsearch();
                    }
                });
            };
        }

        $scope.ActiveExamSubject = function (OTId) {
            $scope.Id = OTId;
            var del = confirm("Do you like to activate the selected detail?");
            if (del == true) {
                var data = {
                    Id: $scope.Id
                }
                $http.post(baseUrl + '/activeExamSubject', data).then(function success(response) {
                    if (response.data == 1) {
                        alert("Selected detail has been activated successfully");
                        $scope.ExamSubjectsearch();
                    } else {
                        alert("An error has occurred while ReInserting detail");
                        $scope.ExamSubjectsearch();
                    }
                });
            };
        }
    }
]);

//this is for ManageLogincontroller
OEMSController.controller("ManageLoginsController", ['$scope', '$http', '$state', 'CommonLabelNames', 'CommonHeadingNames', 'CommonButtonNames',
    function ($scope, $http, $state, $CommonLabelNames, $CommonHeadingNames, $CommonButtonNames) {
        if(loginFrom==0)
        {
             window.location.href = baseUrl + "/";        
        }
        $scope.Id = 0;
        $scope.TemplateName = '';
        $scope.Description = '';
        $scope.Set_Default = '';
        $scope.Template = '';
        $scope.TemplateName1 = '';
        $scope.flag = 0;
        $scope.EmployeeTypeName = "0";
        $scope.UserName = "";
        $scope.Role = "0";
        $scope.Manageloginlist = [];
        $scope.LoginType_Name = "0";
        $scope.IsActive = "1";


        /* This is function for Pagination */
        $scope.listdata = [];
        $scope.current_page = 1;
        $scope.page_size = 10;

        $scope.rembemberCurrentPage = function (p) {
            $scope.current_page = p
        }




        $scope.CommonTransId = "0";
        $scope.CommonTransName = "";
        $scope.CommonTransaction_Title = "";
        $scope.CommontransactionList = [];
        $scope.CommonButtonList = [];
        $scope.CommonTransactionName = "ManageLogins";
        $scope.TextClearFunction = function () {
            $scope.Phy_ChalengedType = '';

        };

        $scope.Commontransaction_DetailsList = function () {
            $CommonLabelNames.CommonLabelNamesList($scope.CommonTransactionName).then(function (response) {

                $scope.CommontransactionList = [];
                $scope.CommontransactionList = response;
            });

            $CommonHeadingNames.CommonHeadingList($scope.CommonTransactionName).then(function (response) {
                $scope.CommonTransId = response[0].Id;
                $scope.CommonTransName = response[0].Name;
                $scope.CommonTransaction_Title = response[0].Value;

            });
            $CommonButtonNames.CommonButtonList($scope.CommonTransactionName).then(function (response) {
                //console.log(response);
                $scope.CommonButtonList = [];
                $scope.CommonButtonList = response;
            });

        }

        $scope.Commontransaction_DetailsList();


        $scope.ListValidationcontrols = function () {

            if (typeof ($scope.LoginType_Name) == "undefined" || $scope.LoginType_Name == 0) {
                alert("Please select Login Type");
                return LoginType_Name;
            }

        };




        $scope.Managelogin_Detailslist = function () {


            // if($scope.ListValidationcontrols()==true){

            $scope.Employee = "";
            if ($scope.Managelogin_Selected != undefined) {
                $scope.Employee = $scope.Managelogin_Selected.originalObject.Id;
                // //console.log($scope.Employee);
            };

            var obj = {
                LoginTypeId: $scope.LoginType_Name,
                Name: $scope.Employee,
                IsActive: $scope.IsActive
            };
            //console.log(obj);
            $http.post(baseUrl + '/getManageLoginsearch', obj).then(function success(response) {


                $scope.emptydata = [];
                $scope.Manageloginlist = [];
                $scope.Manageloginlist = response.data;
                $state.go('ManageLogins');

                if ($scope.Manageloginlist.length > 0) {
                    $scope.flag = 1;
                } else {
                    $scope.flag = 0;
                }


            })
            // }
        }


        $scope.PasswordPolicy = function () {

            var data = {
                Id: 1
            }

            $http.post(baseUrl + '/getPasswordpolicyvalidations', data).then(function success(response) {

                $scope.Id = response.data[0].id;
                $scope.MinLength = response.data[0].minlength;
                $scope.MaxLength = response.data[0].maxlength;
                $scope.MinOneNumchar = response.data[0].minonenumchar;
                $scope.MinOneSpecchar = response.data[0].minonespecchar;
                $scope.WithoutChar = response.data[0].withoutchar;
                $scope.AllowUserName = response.data[0].allowusername;

                $scope.AtleastOneUpperCase = response.data[0].atleastoneuppercase;
                $scope.MinLoginMins = response.data[0].minloginmins;



            })
        };


        $scope.PasswordPolicy();


        /* THIS IS FOR ROLE MAPPING VIEW POPUP FUNCTION */
        $scope.Resetpassword = function (EMId) {
            $scope.Id = EMId;
            $scope.Manageloginview();
            angular.element('#ResetLoginmodel').modal('show');
        };

        /* THIS IS FOR ROLE MAPPING VIEW POPUP FUNCTION */
        $scope.Viewlogin = function (EMId) {
            $scope.Id = EMId;
            $scope.Manageloginview();
            angular.element('#ManageLoginViewModel').modal('show');
        };

        $scope.Manageloginview = function () {

            var data = {
                Id: $scope.Id
            }

            $http.post(baseUrl + '/getManagelogin_view', data).then(function success(response) {

                $scope.Id = response.data[0].Id;

                $scope.Employee_Name = response.data[0].employeename;
                $scope.Student_Name = response.data[0].studentname;
                $scope.UserName = response.data[0].username;
                $scope.Password = response.data[0].password;

            })

        };


        $scope.LoginTypeList = [];
        $http.get(baseUrl + '/getEmployeeTypeList').then(function success(response) {
            $scope.LoginTypeList = response.data;
        });


        $scope.AddModal = function (OTId) {
            $scope.Id = OTId;
            angular.element('#ManageLoginAddEditModel').modal('show');
        }



        $scope.Validationcontrols = function () {

            $scope.PasswordPolicy();
            if (typeof ($scope.EmployeeType) == "undefined" || $scope.EmployeeType == 0) {
                alert("Please select Login Type");
                return false;
            } else if (typeof ($scope.logintype_Selected) == "undefined" || $scope.ReferenceNameId == "") {
                alert("Please select Name");
                return false;
            } else if (typeof ($scope.UserName) == "undefined" || $scope.UserName == "") {
                alert("Please enter User Name");
                return false;
            } else if (typeof ($scope.Password) == "undefined" || $scope.Password == "") {
                alert("Please enter Password");
                return false;


            } else if (parseInt(('' + $scope.Password).length) < parseInt($scope.MinLength)) {
                alert("Your password minimum length should be" + "" + $scope.MinLength);
                return false;
            } else if (parseInt(('' + $scope.Password).length) > parseInt($scope.MaxLength)) {
                alert("Your password maximum length should be" + "" + $scope.MaxLength);
                return false;
            }

            $scope.flag = 0;
            $scope.flagchar = 0;

            var newpass = ('' + $scope.Password).length;

            /* Validation for new password have a special character password */
            if (($scope.MinOneSpecchar != 0)) {

                var newpasschar = ('' + $scope.Password).length;
                var format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

                while (newpasschar--) {

                    var y = $scope.Password.substring(newpasschar, newpasschar + 1);

                    if (y.match(format)) {

                        $scope.flagchar += 1;
                    }
                }

                if ($scope.flagchar <= 0) {
                    alert("Please enter atleast one special character ");
                    return false;
                }

                // return false;

            }


            $scope.flagspl = 0;
            $scope.flagchars = 0;

            /* Validation for new password have not a special character and number in password */

            if (($scope.WithoutChar != null)) {

                var newpasssplchar = ('' + $scope.Password).length;
                while (newpasssplchar--) {
                    var z = $scope.Password.substring(newpasssplchar, newpasssplchar + 1);

                    var leng = ('' + $scope.WithoutChar).length;
                    while (leng--) {
                        var a = $scope.WithoutChar.substring(leng, leng + 1);

                        if (angular.equals(z, a)) {
                            //if (z.valueOf() == a.valueOf()) {
                            //if (typeof(z) == typeof(a)) {                       
                            //$scope.flagspl += 1;
                            alert($scope.WithoutChar + "  characters not allowed, please check");
                            return false;
                        }

                    }

                }
            }

            /* Validation for new password have a number password */
            if (($scope.MinOneNumchar != 0)) {

                while (newpass--) {

                    var x = $scope.Password.substring(newpass, newpass + 1);
                    if (!isNaN(x)) {

                        $scope.flag += 1;
                    }

                }
                if ($scope.flag <= 0) {
                    alert("Please enter atleast one number ");
                    return false;
                }

            }

            /* Allow the user name same as password*/
            $scope.flagAllow = 0;
            if (($scope.AllowUserName == 0)) {
                ////console.log($window.localStorage['User_Name']);
                //$scope.username = $window.localStorage['User_Name'];
                var user = $scope.UserName
                var pwd = $scope.Password

                if (user == pwd) {
                    alert("Username and Password is same, please check the password");
                    return false;
                }

            }




            $scope.flagUpper = 0;
            $scope.flagcharUpper = 0;

            var newpass = ('' + $scope.Password).length;

            /* Validation for new password have a special character password */
            if (($scope.AtleastOneUpperCase != 0)) {

                var newpassupperchar = ('' + $scope.Password).length;
                var format = /[A-Z]/;

                while (newpassupperchar--) {

                    var y = $scope.Password.substring(newpassupperchar, newpassupperchar + 1);

                    if (y.match(format)) {

                        $scope.flagcharUpper += 1;
                    }
                }

                if ($scope.flagcharUpper <= 0) {
                    alert("Please enter atleast one uppercase letter ");
                    return false;
                }
                // return false;

            }




            return true;
        };

        $scope.LoginTypeNameList = [];
        $scope.LoginNamelistAdd = function () {

            if ($scope.EmployeeType == -1) {

                $http.get(baseUrl + '/getStudentNameDetails').then(function success(response) {
                    //console.log(response.data);
                    $scope.LoginTypeNameList = response.data;
                    //console.log($scope.LoginTypeNameList);
                })

            } else {

                // $http.get(baseUrl + '/getStaffNamelist').then(function success(response) {
                //     $scope.LoginTypeNameList = response.data;
                // })
                $http.get(baseUrl + '/getManageloginStaffNamelist').then(function success(response) {

                    //console.log(response.data);
                    $scope.LoginTypeNameList = response.data;
                })
            }

        };

        $scope.LoginNameList = [];
        $scope.LoginNamelist = function () {

            if ($scope.LoginType_Name == -1) {

                $http.get(baseUrl + '/getStudentNameDetails').then(function success(response) {

                    $scope.LoginNameList = response.data;
                })

            } else {

                $http.get(baseUrl + '/getStaffNamelist').then(function success(response) {
                    $scope.LoginNameList = response.data;
                })
            }

        };


        $scope.LoginTypeList = [];
        $http.get(baseUrl + '/getEmployeeTypeList').then(function success(response) {
            $scope.LoginTypeList = response.data;

        })

        $scope.EmployeeType = "";
        $scope.ReferenceNameId = "0";
        $scope.ManageLogin_AddEdit = function () {

            if ($scope.Validationcontrols() == true) {
                if ($scope.logintype_Selected != undefined) {
                    $scope.ReferenceNameId = $scope.logintype_Selected.originalObject.Id;

                }



                var obj = {
                    Id: $scope.Id,
                    LoginTypeId: $scope.EmployeeType,
                    ReferenceId: $scope.ReferenceNameId,
                    UserName: $scope.UserName,
                    Password: $scope.Password
                };
                $http.post(baseUrl + '/getAddEditManageLogin', obj).then(function success(response) {


                    if (response.data !== 0) {
                        alert("Added/Updated successfully");
                        $scope.CancelPopup();
                        $eid = response.data;


                        $scope.ManageLoginSave($eid);
                    } else {
                        alert("Insert/Update Problem");
                    }
                });
            }
        };


        $scope.ErrorFunction = function () {
            alert("Inactive record cannot be edited");
        }

        $scope.ClearPopup = function () {
            $scope.Id = 0;
            $scope.EmployeeType = "";
            $scope.$broadcast('angucomplete-alt:clearInput', 'ex1');
            $scope.UserName = '';
            $scope.Password = '';

        };

        $scope.CancelPopup = function () {
            angular.element('#ManageLoginAddEditModel').modal('hide');
            $scope.ClearPopup();
        }

        $scope.LoginCancelPopup = function () {
            angular.element('#ManageLoginViewModel').modal('hide');

        }

        $scope.ResetCancelPopup = function () {
            angular.element('#ResetLoginmodel').modal('hide');
            $scope.resetclear();
        }


        $scope.ManageLoginSave = function (eid) {
            var data = {
                Id: eid
            }

            $http.post(baseUrl + '/getSingleManageLoginlist', data).then(function success(response) {

                $scope.Manageloginlist = response.data;
                $state.go('ManageLogins');
            })
        }


        /* Validating the create page mandatory fields
        checking mandatory for the follwing fields
        NewPasssword,ReenterPassword
        and showing alert message when it is null.
        */
        $scope.Validationresetcontrols = function () {

            $scope.PasswordPolicy();
            if (typeof ($scope.NewPassword) == "undefined" || $scope.NewPassword == '') {
                alert("Please enter New password");
                return false;
            }
            if (typeof ($scope.ReenterPassword) == "undefined" || $scope.ReenterPassword == '') {
                alert("Please enter Re-enter password");
                return false;
            }
            if (($scope.NewPassword) != ($scope.ReenterPassword)) {
                alert("New password and Re-enter Password mismatch please enter same password");
                return false;
            } else if (parseInt(('' + $scope.NewPassword).length) < parseInt($scope.MinLength)) {
                alert("Your password minimum length should be" + "" + $scope.MinLength);
                return false;
            } else if (parseInt(('' + $scope.NewPassword).length) > parseInt($scope.MaxLength)) {
                alert("Your password maximum length should be" + "" + $scope.MaxLength);
                return false;
            }

            //  else if (parseInt(('' + $scope.NewPassword).length) < parseInt($scope.MinLength)) {
            //     alert("Your password length is too small");
            //     return false;
            // } else if (parseInt(('' + $scope.NewPassword).length) > parseInt($scope.MaxLength)) {
            //     alert("Your password length is too long");
            //     return false;
            // }

            $scope.flag = 0;
            $scope.flagchar = 0;

            var newpass = ('' + $scope.NewPassword).length;

            /* Validation for new password have a special character password */
            if (($scope.MinOneSpecchar != 0)) {

                var newpasschar = ('' + $scope.NewPassword).length;
                var format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

                while (newpasschar--) {

                    var y = $scope.NewPassword.substring(newpasschar, newpasschar + 1);

                    if (y.match(format)) {

                        $scope.flagchar += 1;
                    }
                }

                if ($scope.flagchar <= 0) {
                    alert("Please enter atleast one special character ");
                    return false;
                }

                // return false;

            }


            $scope.flagspl = 0;
            $scope.flagchars = 0;

            /* Validation for new password have not a special character and number in password */

            if (($scope.WithoutChar != null)) {

                var newpasssplchar = ('' + $scope.NewPassword).length;
                while (newpasssplchar--) {
                    var z = $scope.NewPassword.substring(newpasssplchar, newpasssplchar + 1);

                    var leng = ('' + $scope.WithoutChar).length;
                    while (leng--) {
                        var a = $scope.WithoutChar.substring(leng, leng + 1);

                        if (angular.equals(z, a)) {
                            //if (z.valueOf() == a.valueOf()) {
                            //if (typeof(z) == typeof(a)) {                       
                            //$scope.flagspl += 1;
                            alert($scope.WithoutChar + "  characters not allowed, please check");
                            return false;
                        }

                    }

                }
            }

            /* Validation for new password have a number password */
            if (($scope.MinOneNumchar != 0)) {

                while (newpass--) {

                    var x = $scope.NewPassword.substring(newpass, newpass + 1);
                    if (!isNaN(x)) {

                        $scope.flag += 1;
                    }

                }
                if ($scope.flag <= 0) {
                    alert("Please enter atleast one number ");
                    return false;
                }

            }

            /* Allow the user name same as password*/
            $scope.flagAllow = 0;
            if (($scope.AllowUserName == 0)) {
                ////console.log($window.localStorage['User_Name']);
                //$scope.username = $window.localStorage['User_Name'];
                var user = $scope.UserName
                var pwd = $scope.NewPassword

                if (user == pwd) {
                    alert("Username and Password is same, please check the password");
                    return false;
                }

            }




            $scope.flagUpper = 0;
            $scope.flagcharUpper = 0;

            var newpass = ('' + $scope.NewPassword).length;

            /* Validation for new password have a special character password */
            if (($scope.AtleastOneUpperCase != 0)) {

                var newpassupperchar = ('' + $scope.NewPassword).length;
                var format = /[A-Z]/;

                while (newpassupperchar--) {

                    var y = $scope.NewPassword.substring(newpassupperchar, newpassupperchar + 1);

                    if (y.match(format)) {

                        $scope.flagcharUpper += 1;
                    }
                }

                if ($scope.flagcharUpper <= 0) {
                    alert("Please enter atleast one uppercase letter ");
                    return false;
                }
                // return false;

            }

            return true;

        };

        /*Add/Edit function*/
        $scope.Resetpassword_Details = function () {

            if ($scope.Validationresetcontrols() == true) {
                var data = {
                    Id: $scope.Id,
                    Password: $scope.NewPassword,
                    Password: $scope.ReenterPassword

                }


                $http.post(baseUrl + '/getManageLogin_Resetpassword', data).then(function success(response) {
                    if (response.data != null) {
                        alert('Reset Password successfully  ');
                    }

                    $scope.ResetCancelPopup();
                });
            }
        };



        /* Clear the reset password */
        $scope.resetclear = function () {
            $scope.NewPassword = "";
            $scope.ReenterPassword = "";
            $scope.Password = "";

        };

        /*
    Calling the api method to for Inactive record edit function
    */
        $scope.ErrorFunction = function () {
            alert("Inactive record cannot be edited");
        };




        $scope.InActive = function (OTId) {
            $scope.Id = OTId;
            var del = confirm("Do you like to inactivate the selected detail?");
            if (del == true) {
                var data = {
                    Id: $scope.Id
                }
                $http.post(baseUrl + '/getManageLogin_Inactive', data).then(function success(response) {
                    if (response.data == 1) {
                        alert("Selected detail has been inactivated successfully");
                        $scope.Managelogin_Detailslist();
                    } else {
                        alert("An error has occurred while deleting Detail");

                    }
                });
            };
        }

        $scope.Active = function (OTId) {
            $scope.Id = OTId;
            var del = confirm("Do you like to activate the selected detail?");
            if (del == true) {
                var data = {
                    Id: $scope.Id
                }
                $http.post(baseUrl + '/getManageLogin_Active', data).then(function success(response) {
                    if (response.data == 1) {
                        alert("Selected detail has been activated successfully");
                        $scope.Managelogin_Detailslist();
                    } else {
                        alert("An error has occurred while ReInserting detail");

                    }
                });
            };
        }
    }
]);

//this is for Dynamic master controller
OEMSController.controller("DynamicMastercontroller", ['$scope', '$http', '$state', '$filter', '$stateParams', '$window', 'filterFilter',
    function ($scope, $http, $state, $filter, $stateParams, $window, $ff) {
        if(loginFrom==0)
        {
             window.location.href = baseUrl + "/";        
        }
        $scope.InstitutionId = $window.localStorage['Institution_Id'];
        // Declaration and initialization of Scope and array list variables.
        $scope.UITableName = "0";
        $scope.ControlValues = new Array();
        $scope.tableName = "";
        $scope.UIMasterName = "";
        $scope.resultCollection = [];
        //$scope.ControlValues[0] = '';
        $scope.ddlValues = [];
        $scope.noneditable = false;
        $scope.Mode = 0;
        $scope.tableName = '';
        $scope.PKId = 0;
        $scope.listId = 0;
        $scope.IsActive = "1";
        $scope.MasterItemList = [];
        $scope.ResultListFiltered = [];

        /*
        Validating the create page mandatory fields
        checking mandatory for the follwing fields
        UITableName
        and showing alert message when it is null.
        */
        $scope.Validationcontrols = function () {
            if (typeof ($scope.UITableName) == "undefined" || $scope.UITableName == 0) {
                alert("Please select Master Name");
                return UITableName;
            }
        };

        // List Page Pagination.
        $scope.current_page = 1;
        $scope.page_size = 10;
        $scope.rembemberCurrentPage = function (p) {
            $scope.current_page = p
        }

        /* 
         Calling the api method to detele the details of the Master Details 
         for the  Master Id,
         and redirected to the list page.
        */
        $scope.MasterDelete = function (RowId, rowname) {
            $scope.Id = RowId;
            var retVal = confirm("Do you like to inactivate the selected " + $scope.UIMasterName + " ?");
            if (retVal == true) {
                var data = {
                    MasterId: $scope.UITableName,
                    Id: RowId,
                    Active: 0
                }
                $http.post(baseUrl + '/getInactiveMasters', data).then(function success(response) {
                    if (response.data == 1) {
                        alert($scope.UIMasterName + " has been inactivated successfully");
                        $scope.TableColumn_ListSearchGo();
                    } else {
                        alert("An error has occurred while deleting Detail");
                        $scope.TableColumn_ListSearchGo();
                    }
                });
            }
        };

        /* 
         Calling the api method to inactived the details of the Master Details 
         for the  Master Id,
         and redirected to the list page.
         */

        $scope.MasterActive = function (RowId, rowname) {
            var retVal = confirm("Do you like to activate the selected " + $scope.UIMasterName + " ?");
            if (retVal == true) {
                var data = {
                    MasterId: $scope.UITableName,
                    Id: RowId,
                    Active: 1
                }
                $http.post(baseUrl + '/getActiveMasters', data).then(function success(response) {
                    if (response.data == 1) {
                        alert($scope.UIMasterName + " has been activated successfully");
                        $scope.TableColumn_ListSearchGo();
                    } else {
                        alert("An error has occurred while ReInserting detail");
                        $scope.TableColumn_ListSearchGo();
                    }
                });
            }
        };

        /* 
         Calling api method for the dropdown list in the html page for the fields 
         CommonTableList
         */
        $scope.MasterList = [];
        $scope.MasterListActive = [];
        $scope.getCommonTable = function () {
            $http.get(baseUrl + '/getMasterdropdown').then(function success(response) {
                $scope.MasterList = response.data;
                $scope.MasterListActive = $ff($scope.MasterList, {
                    uitablename: $scope.UITableName
                });
            });
        };

        /* 
         Calling api method for geting the table name list 
         */
        $scope.getMasterTableName = function () {
            angular.forEach($scope.MasterList, function (value, index) {
                if (value.id.toString() == $scope.UITableName) {
                    $scope.tableName = value.dbtablename;
                    $scope.UIMasterName = value.uitablename;
                }
            });
        }


        /* Open the create pop up window */
        $scope.AddClick = function () {
            $scope.CancelMasterColumns();
            $scope.PKId = 0;
            $scope.Mode = 1;
            $scope.noneditable = false;
            if ($scope.UITableName > 0) {
                $scope.LoadMasterColumns();
            } else {
                alert("Please select master");
            }
        }

        /* Open the view pop up window and show the details for the master table for the  master table Id */
        $scope.EditClick = function (PKId) {
            $scope.PKId = PKId;
            $scope.Mode = 3;
            $scope.noneditable = false;
            $scope.LoadMasterColumns();
        }

        /* Open the edit pop up window and show the details for the master table for the  master table Id */
        $scope.ViewClick = function (PKId) {
            $scope.PKId = PKId;
            $scope.Mode = 2;
            $scope.noneditable = true;
            $scope.LoadMasterColumns();
        }

        $scope.TableColumn_ListSearchpop = function (listId) {
            $scope.listId = listId;
            $scope.TableColumn_ListSearch($scope.listId, $scope.Mode = 1);
        };

        /* on click Go calling the list function.*/
        $scope.TableColumn_ListSearchGo = function () {

            $scope.TableColumn_ListSearch($scope.listId = 0);

        };

        /* Clear function.*/
        $scope.Clear = function () {
            $scope.listId = 0;
        }

        /*Filter the master list function.*/
        $scope.AcitveFilterChange = function () {
            $scope.ResultListFiltered = [];
            if ($scope.IsActive == -1) {
                $scope.ResultListFiltered = $scope.MasterItemList;
            } else {
                $scope.ResultListFiltered = $ff($scope.MasterItemList, {
                    IsActive: $scope.IsActive
                });
                ////console.log($scope.ResultListFiltered);
            }
            if ($scope.ResultListFiltered.length > 0) {
                $scope.flag = 1;
            } else {
                $scope.flag = 0;
            }
        }

        /*
        Calling the api method to list the table column details
        showing the result in table.
        */
        $scope.flag = 0;
        $scope.TableColumn_ListSearch = function () {

            $scope.emptydata = [];
            $scope.rowCollection = [];
            $scope.tableName = "";
            $scope.ControlValues = [];
            $scope.collength = 0;
            $scope.ResultList = [];
            $scope.MasterItemList = [];
            // to get DB Table name of the Master selected
            $scope.getMasterTableName();

            var data = {
                CommonTable_Id: $scope.UITableName
            }
            $http.post(baseUrl + '/getMastercolumnlist', data).then(function success(response) {
                $scope.rowCollection = [];
                $scope.rowCollection = response.data;

                $scope.collength = response.data.length;

                var dataobj = {
                    Id: $scope.InstitutionId,
                    CommonTable_Id: $scope.UITableName
                }

                $http.post(baseUrl + '/getMastercolumnDetails', dataobj).then(function success(response) {
                    //console.log(response.data);
                    if ($scope.collength > 0) {
                        $scope.collength = (response.data.length / $scope.collength);

                        var i = 1;
                        var startRow = 0;

                        while (i <= $scope.collength) {
                            $scope.ResultList.push(response.data.slice(startRow, startRow + $scope.rowCollection.length));

                            startRow = startRow + $scope.rowCollection.length;

                            i = i + 1;
                        };
                        $scope.MasterItemList = $scope.ResultList;

                        $scope.AcitveFilterChange();
                    }

                });
            });
        };

        /*
        Calling the api method to for Inactive record edit function
        */
        $scope.ErrorFunction = function () {
            alert("Inactive record cannot be edited");
        };

        $scope.CustomMasterFilter = function () {
            $scope.ResultListFiltered = [];
            var matching = false;
            angular.forEach($scope.ResultList, function (value, index) {
                matching = false;
                angular.forEach(value, function (value1, index1) {
                    if (value1.TableColumnItem.searchcolumn == 1 && (value[index1].DBColumnResult.toLowerCase()).indexOf($scope.query.toLowerCase()) !== -1) {
                        matching = true;
                    }
                });
                if (matching == true) $scope.ResultListFiltered.push(value);
            });
            $scope.ResultListFiltered = $scope.ResultListFiltered;
        }




        /*
        Calling the api method to list the table column details for the  filters  uitable name,id and
        showing the result in table.
        */
        $scope.LoadMasterColumns = function () {
            var data = {
                CommonTable_Id: $scope.UITableName,
                PKId: $scope.PKId
            }

            $http.post(baseUrl + '/getMastercolumnView', data).then(function success(response) {
                $scope.resultCollection = [];
                $scope.ddlValues = [];
                $scope.ControlValues = new Array();
                angular.forEach(response.data, function (value, index) {

                    if ($scope.PKId > 0) {
                        $scope.ControlValues[value.TableColumnItem.dbcolumnname] = value.DBColumnResult;
                    } else {
                        $scope.ControlValues[value.TableColumnItem.dbcolumnname] = "";
                    }
                    if (value.TableColumnItem.fieldtype == 3) {
                        $scope.ddlValues[value.TableColumnItem.dbcolumnname] = value.ddlresult;
                        if ($scope.Mode == 2) {
                            $scope.DBColumnName1 = value.ddlresult;
                            ////console.log(value.DBColumnResult);
                            angular.forEach($scope.DBColumnName1, function (value1, index) {

                                if (value1.id == value.DBColumnResult) {
                                    $scope.ControlValues[value.TableColumnItem.dbcolumnname] = value1.name;
                                    ////console.log(value1.Name);
                                }
                            });
                        }
                    } else {
                        $scope.ddlValues[value.TableColumnItem.dbcolumnname] = "";
                    }
                    $scope.resultCollection.push(value.TableColumnItem);

                });
                ////console.log($scope.resultCollection);
                angular.element('#MasterAddmodal').modal('show');
            })
        };


        /*
        Call the api method for insert and Update the record for a master list tables
        and display the record of selected master list tables when Id is greater than 0
        in edit.html and provide an option for create and modify the master list tables and save the master list tables record
        */
        $scope.SaveMasterColumns = function () {
            
           // if ($scope.Valid($scope.returnvalue) == true) {
                $scope.errorList = "";
                $scope.ResultArray = [];
                $scope.ControlValues['Id'] = $scope.PKId;
                angular.forEach($scope.resultCollection, function (value, index) {

                    var obj = {
                        commontablename: $scope.tableName,
                        dbcolumnname: value.dbcolumnname,
                        fieldtype: value.fieldtype,
                        isdefault: value.isdefault,
                        validationtype: value.validationtype,
                        ispk: value.ispk,
                        isunique: value.isunique,
                        uicolumnname: value.uicolumnname,
                        uniquecolumn: value.uniquecolumn,
                        id: value.id,
                        validationtype: value.validationtype,
                        filtercolumn: value.filtercolumn,
                    };

                    // if (value.UIMandatory == 1 && value.IsPk == "0" && $scope.ControlValues[value.DBColumnName] == "") {
                    //     $scope.errorList = $scope.errorList + "\n Please enter " + value.UIColumnName
                    // }

                    var objresult = {
                        TableColumnItem: obj,
                        DBColumnResult: $scope.ControlValues[value.dbcolumnname],
                        "InstitutionId": $scope.InstitutionId
                    };

                    $scope.ResultArray.push(objresult);
                })

                if ($scope.errorList == "") {
                    if ($scope.PKId > 0) {
                        $http.post(baseUrl + '/getAddMastervalues', $scope.ResultArray).then(function success(response) {
                            var listId = response.data;

                            if (!isNaN(listId)) {

                                $scope.TableColumn_ListSearchpop(listId, $scope.Mode = 1);
                                angular.element('#MasterAddmodal').modal('hide');
                            } else {

                                $scope.errorList = $scope.errorList + response.data;
                            }

                        });
                    } else {

                        $http.post(baseUrl + '/getAddMastervalues', $scope.ResultArray).then(function success(response) {

                            var listId = response.data;
                            if (!isNaN(listId)) {
                                $scope.TableColumn_ListSearchpop(listId, $scope.Mode = 1);
                                angular.element('#MasterAddmodal').modal('hide');
                            } else {
                                $scope.errorList = $scope.errorList + response.data;
                            }
                        });

                    }
                }
           // }
        };


        $scope.Valid = function () {
            $scope.returnvalue = false;
            $scope.errorList = "";
            angular.forEach($scope.resultCollection, function (value, index) {
                var obj = {
                    CommonTableName: $scope.tableName,
                    DBColumnName: value.dbcolumnname,
                    FieldType: value.fieldtype,
                    IsDefault: value.isdefault,
                    ValidationType: value.validationtype,
                    IsPK: value.ispk,
                    IsUnique: value.isunique,
                    UIColumnName: value.uicolumnname,
                    UniqueColumn: value.uniquecolumn,
                    Id: value.id,
                    ValidationType: value.validationtype,
                    FilterColumn: value.filtercolumn,
                };
                if (value.uimandatory == 1 && value.ispk == "0" && $scope.ControlValues[value.dbcolumnname] == "") {
                    alert($scope.errorList + " Please enter " + value.uicolumnname);
                    $scope.returnvalue = false;
                    return $scope.returnvalue;
                } else if (value.uimandatory == 1 && value.ispk == "0" && $scope.ControlValues[value.dbcolumnname] != "") {
                    $scope.returnvalue = true;
                    return $scope.returnvalue;
                }

            });
            return $scope.returnvalue;
        };

        $scope.Clearfunction = function (currentColumn) {
            angular.forEach($scope.resultCollection, function (value, index) {
                if (value.filtercolumn == currentColumn) {
                    $scope.ControlValues[value.dbcolumnname] = "";
                }
            });
        };

        /*This the function for edit the master list tables */
        $scope.EditMasterColumns = function () {
            $location.path('/masteritem' + $scope.UITableName + '/3' + $scope.PKId);
        }

        /*This the function for clear the list of master tables */
        $scope.CancelMasterColumns = function () {
            $scope.errorList = "";
            angular.element('#MasterAddmodal').modal('hide');
        }

    }
]);

//this is for Login controller
OEMSController.controller("LoginController", ['$scope', '$http', '$state', 'filterFilter', '$stateParams', '$window',
    function ($scope, $http, $state, $ff, $stateParams, $window) {


        $scope.LoginId = $window.localStorage['UserId'];


        $scope.EmployeeNameList = [];

        // $http.get(baseUrl + '/getManageLogin_EmployeeNameList').then(function success(response) {
        //     $scope.EmployeeNameList = response.data;
        // })

        $scope.PasswordPolicy = function () {

            var data = {
                Id: 1
            }

            $http.post(baseUrl + '/getPasswordpolicyvalidations', data).then(function success(response) {
                //console.log(response.data);
                $scope.Id = response.data[0].id;
                $scope.MinLength = response.data[0].minlength;
                $scope.MaxLength = response.data[0].maxlength;
                $scope.MinOneNumchar = response.data[0].minonenumchar;
                $scope.MinOneSpecchar = response.data[0].minonespecchar;
                $scope.WithoutChar = response.data[0].withoutchar;
                $scope.AllowUserName = response.data[0].allowusername;
                $scope.AtleastOneUpperCase = response.data[0].atleastoneuppercase;
                $scope.MinLoginMins = response.data[0].minloginmins;
            })
        };


        //$scope.PasswordPolicy();



        /* Validating the create page mandatory fields
        checking mandatory for the follwing fields
        NewPasssword,ReenterPassword
        and showing alert message when it is null.
        */
        $scope.Validationresetcontrols = function () {

            //$scope.PasswordPolicy();

            if (typeof ($scope.Employee_Selected) == "undefined" || $scope.Reset_EMPId == "") {
                alert("Please Select Employee");
                return false;
            } else if (typeof ($scope.NewPassword) == "undefined" || $scope.NewPassword == '') {
                alert("Please enter New password");
                return false;
            }
            if (typeof ($scope.ReenterPassword) == "undefined" || $scope.ReenterPassword == '') {
                alert("Please enter Re-enter password");
                return false;
            }
            if (($scope.NewPassword) != ($scope.ReenterPassword)) {
                alert("New password and Re-enter Password mismatch please enter same password");
                return false;
            } 
            // else if (parseInt(('' + $scope.NewPassword).length) < parseInt($scope.MinLength)) {
            //     alert("Your Name Should Contain Minimum Length is " + "" + $scope.MinLength);
            //     return false;
            // } else if (parseInt(('' + $scope.NewPassword).length) > parseInt($scope.MaxLength)) {
            //     alert("Sorry You are Exceeding the Limit is " + "" + $scope.MaxLength);
            //     return false;
            // }

            return true;

            $scope.flag = 0;
            $scope.flagchar = 0;

            var newpass = ('' + $scope.NewPassword).length;

            /* Validation for new password have a special character password */
            if (($scope.MinOneSpecchar != 0)) {

                var newpasschar = ('' + $scope.NewPassword).length;
                var format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

                while (newpasschar--) {

                    var y = $scope.NewPassword.substring(newpasschar, newpasschar + 1);

                    if (y.match(format)) {

                        $scope.flagchar += 1;
                    }
                }

                if ($scope.flagchar <= 0) {
                    alert("Please enter atleast one special character ");
                    return false;
                }

                // return false;

            }


            $scope.flagspl = 0;
            $scope.flagchars = 0;

            /* Validation for new password have not a special character and number in password */

            if (($scope.WithoutChar != null)) {

                var newpasssplchar = ('' + $scope.NewPassword).length;
                while (newpasssplchar--) {
                    var z = $scope.NewPassword.substring(newpasssplchar, newpasssplchar + 1);

                    var leng = ('' + $scope.WithoutChar).length;
                    while (leng--) {
                        var a = $scope.WithoutChar.substring(leng, leng + 1);

                        if (angular.equals(z, a)) {
                            //if (z.valueOf() == a.valueOf()) {
                            //if (typeof(z) == typeof(a)) {                       
                            //$scope.flagspl += 1;
                            alert($scope.WithoutChar + "  characters not allowed, please check");
                            return false;
                        }

                    }

                }
            }

            /* Validation for new password have a number password */
            if (($scope.MinOneNumchar != 0)) {

                while (newpass--) {

                    var x = $scope.NewPassword.substring(newpass, newpass + 1);
                    if (!isNaN(x)) {

                        $scope.flag += 1;
                    }

                }
                if ($scope.flag <= 0) {
                    alert("Please enter atleast one number ");
                    return false;
                }

            }

            /* Allow the user name same as password*/
            $scope.flagAllow = 0;
            if (($scope.AllowUserName == 0)) {
                ////console.log($window.localStorage['User_Name']);
                //$scope.username = $window.localStorage['User_Name'];
                var user = $scope.username;
                var pwd = $scope.NewPassword

                if (user == pwd) {
                    alert("Username and Password is same, please check the password");
                    return false;
                }

            }




            $scope.flagUpper = 0;
            $scope.flagcharUpper = 0;

            var newpass = ('' + $scope.NewPassword).length;

            /* Validation for new password have a special character password */
            if (($scope.AtleastOneUpperCase != 0)) {

                var newpassupperchar = ('' + $scope.NewPassword).length;
                var format = /[A-Z]/;

                while (newpassupperchar--) {

                    var y = $scope.NewPassword.substring(newpassupperchar, newpassupperchar + 1);

                    if (y.match(format)) {

                        $scope.flagcharUpper += 1;
                    }
                }

                if ($scope.flagcharUpper <= 0) {
                    alert("Please enter atleast one uppercase letter ");
                    return false;
                }
                // return false;

            }

            return true;

        };


        /* Validating the create page mandatory fields
     checking mandatory for the follwing fields based on password policy
     NewPasssword,confirmpassword,minimum length,maximum length,minimum special characters,minimum characters,allow the username
     and showing alert message when it is null.
     */

        $scope.Validationcontrolspassword = function () {

            //$scope.PasswordPolicy();
            if (typeof ($scope.OldPassword) == "undefined" || $scope.OldPassword == '') {
                alert("Please enter Password");
                return false;
            }

            if (typeof ($scope.NewPassword) == "undefined" || $scope.NewPassword == '') {
                alert("Please enter New password");
                return false;
            } else if (typeof ($scope.confirmpassword) == "undefined" || $scope.confirmpassword == '') {
                alert("Please enter Confirm password");
                return false;
            } else if (($scope.confirmpassword) != ($scope.NewPassword)) {
                alert("New password and Confirm Password mismatch Please enter same password");
                return false;
            } 
            // else if (parseInt(('' + $scope.NewPassword).length) < parseInt($scope.MinLength)) {
            //     alert("Your Name Should Contain Minimum Length is " + "" + $scope.MinLength);
            //     return false;
            // } else if (parseInt(('' + $scope.NewPassword).length) > parseInt($scope.MaxLength)) {
            //     alert("Sorry You are Exceeding the Limit is " + "" + $scope.MaxLength);
            //     return false;
            // }
            return true;
            $scope.flag = 0;
            $scope.flagchar = 0;

            var newpass = ('' + $scope.NewPassword).length;

            /* Validation for new password have a special character password */
            if (($scope.MinOneSpecchar != 0)) {

                var newpasschar = ('' + $scope.NewPassword).length;
                var format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

                while (newpasschar--) {

                    var y = $scope.NewPassword.substring(newpasschar, newpasschar + 1);

                    if (y.match(format)) {

                        $scope.flagchar += 1;
                    }
                }

                if ($scope.flagchar <= 0) {
                    alert("Please enter atleast one special character ");
                    return false;
                }
                // return false;

            }


            $scope.flagspl = 0;
            $scope.flagchars = 0;

            /* Validation for new password have not a special character and number in password */

            if (($scope.WithoutChar != null)) {

                var newpasssplchar = ('' + $scope.NewPassword).length;
                while (newpasssplchar--) {
                    var z = $scope.NewPassword.substring(newpasssplchar, newpasssplchar + 1);

                    var leng = ('' + $scope.WithoutChar).length;
                    while (leng--) {
                        var a = $scope.WithoutChar.substring(leng, leng + 1);

                        if (angular.equals(z, a)) {
                            //if (z.valueOf() == a.valueOf()) {
                            //if (typeof(z) == typeof(a)) {                       
                            //$scope.flagspl += 1;
                            alert($scope.WithoutChar + "  characters not allowed, please check");
                            return false;
                        }

                    }

                }
            }


            /* Validation for new password have a number password */

            if (($scope.MinOneNumchar != 0)) {
                while (newpass--) {
                    var x = $scope.NewPassword.substring(newpass, newpass + 1);
                    if (!isNaN(x)) {
                        $scope.flag += 1;
                    }
                }

                if ($scope.flag <= 0) {
                    alert("Please enter atleast one number ");
                    return false;
                }
            }

            /* Allow the user name same as password*/
            $scope.flagAllow = 0;
            if (($scope.AllowUserName == 0)) {
                $scope.username = $window.localStorage['User_Name'];
                var user = $scope.username;
                var pwd = $scope.NewPassword

                if (user == pwd) {
                    alert("Username and password is same, please check the password");
                    return false;
                }

            }

            $scope.flagUpper = 0;
            $scope.flagcharUpper = 0;

            var newpass = ('' + $scope.NewPassword).length;

            /* Validation for new password have a special character password */
            if (($scope.AtleastOneUpperCase != 0)) {

                var newpassupperchar = ('' + $scope.NewPassword).length;
                var format = /[A-Z]/;

                while (newpassupperchar--) {
                    var y = $scope.NewPassword.substring(newpassupperchar, newpassupperchar + 1);
                    if (y.match(format)) {
                        $scope.flagcharUpper += 1;
                    }
                }

                if ($scope.flagcharUpper <= 0) {
                    alert("Please enter atleast one uppercase letter ");
                    return false;
                }
            }
            return true;
        }



        $scope.Validationchangepasscontrols = function () {
            if (typeof ($scope.Password) != ($scope.OldPassword == "")) {
                $scope.errorlist = "Not a valid password";
                return false;
            }
            return true;
        };



        $scope.PasswordList = [];

        /* Clear the reset password */
        $scope.resetpass = function () {

            $scope.NewPassword = "";
            $scope.OldPassword = "";
            $scope.confirmpassword = "";

        };

      
        $scope.Id = 0;
        $scope.DuplicatedId = 0;
        $scope.ModifiedUser_Id = "0";
        //  $scope.ModifiedUser_Id = 1;


        /*
         Call the api method for insert and Update the record for a change password
       and display the record of selected change password when Id is greater than 0
       in edit.html and provide an option for create and modify the change password and save the change password record
       */
        $scope.changepassword = function () {

            if ($scope.Validationcontrolspassword() == true) {



                var obj = {
                    Id: $scope.LoginId,
                    NewPasssword: $scope.NewPassword,
                    OldPassword: $scope.OldPassword,
                    confirmpassword: $scope.confirmpassword,
                    ModifiedUser_Id: $scope.LoginId
                }
                //console.log(obj);

                $http.post(baseUrl + '/getLogin_ResetPassword', obj).then(function success(response) {
                    //console.log(response.data);

                    if (response.data[0].data == 0) {
                        alert("Old Password not matching with existing password");
                    }
                    if (response.data[0].data == 5) {
                        alert("The New Password same for Existing Password");
                    }
                    // if (response.data[0].v_retVal == 1) 
                    else
                    {
                        alert('Password changed successfully');
                    }
                    // else {
                    //     alert("Not a valid password");
                    // }
                    var passobj = {
                        id: $scope.LoginId,
                    }
                    
                    $http.post(baseUrl + '/getPasswordHistory', passobj).then(function success(response) {
                        //console.log(response);
                        $scope.loginhistory = response.data[0].id;
                     
                   
                    if( $scope.loginhistory == 1){
                        $state.go('Home');
                   // window.location.href = baseUrl + "Home#/Home";
                    $scope.resetpass();
                    }
                    else if( $scope.loginhistory == 0 ){
                        $state.go('ChangePassword');
                     //   window.location.href = baseUrl + "Home#/ChangePassword";
                        $scope.resetpass();
                        }
                    });
                });
            }


        };


        /*
     Call the api method for insert and Update the record for a reset password
     and display the record of selected reset password when Id is greater than 0
     in edit.html and provide an option for create and modify the reset password and save the reset password record
     */



        /* Clear the reset password */
        $scope.resetclear = function () {
            $scope.NewPassword = "";
            $scope.ReenterPassword = "";
            $scope.password = "";
            $scope.$broadcast('angucomplete-alt:clearInput', 'employee');
        };

        /*Add/Edit function*/
        $scope.Resetpassword = function () {
            if ($scope.Validationresetcontrols() == true) {
                if ($scope.Employee_Selected != undefined) {
                    $scope.Reset_EMPId = $scope.Employee_Selected.originalObject.Id;
                    ////console.log($scope.ReferenceNameId);
                }
                var data = {
                    ReferenceId: $scope.Reset_EMPId,
                    Password: $scope.NewPassword,
                    Password: $scope.ReenterPassword

                }

                //obj.push({ MenuPersonalizeModel: $scope.FirstMenuLevelList});
                $http.post(baseUrl + '/getResetpassword', data).then(function success(response) {
                    if (response.data != null) {
                        alert('Reset Password successfully  ');
                    }
                    $scope.resetclear();
                });
            }
        };
    }
]);


//this is for Student Details controller
OEMSController.controller("StudentMasterController", ['$scope', '$http', '$state','$window', '$stateParams', '$filter', 'filterFilter', 'CommonLabelNames', 'CommonHeadingNames', 'CommonButtonNames',
    function ($scope, $http, $state, $window,$stateParams, $filter, $ff, $CommonLabelNames, $CommonHeadingNames, $CommonButtonNames) {
       
       if(loginFrom==0)
       {
            window.location.href = baseUrl + "/";        
       }
            
       $scope.InstitutionId = $window.localStorage['Institution_Id'];
        var InstObj = {
            InstitutionId: $scope.InstitutionId
        }
        $scope.Id = 0;
        $scope.StudentId = '';
        $scope.AdmissionNumber = '';
        $scope.AdmissionDate = '';
        $scope.StudentName = '';
        $scope.FirstName = '';
        $scope.LastName = '';
        $scope.StudentPhoto = '';
        $scope.DOB = '';
        $scope.FatherName = '';
        $scope.MotherName = '';
        $scope.GuardianName = '';
        $scope.Gender = "";
        $scope.Religion = "";
        $scope.Caste = "";
        $scope.Community = "";
        $scope.MotherTongue = "";
        $scope.BloodGroup = "";
        $scope.IdentityMark = '';
        $scope.RegisterNumber = '';
        $scope.SSN_UID_Number = '';
        $scope.SMobileNumber = '';
        $scope.SEmail = '';
        // $scope.AcademicYearId = "2";
        //$scope.AcademicYearId=$ff({ AcademicFlag: '1' });

        $scope.MediumName = "";
        $scope.Course = "";
        $scope.Section = "0";

        $scope.FOccupation = '';
        $scope.FQualification = '0';
        $scope.FSSN_UID_Number = '';
        $scope.FMobileNumber = '';
        $scope.FEmail = '';
        $scope.MOccupation = '';
        $scope.MQualification = "0";
        $scope.MSSN_UID_Number = '';
        $scope.MMobileNumber = '';
        $scope.MEmail = '';
        $scope.GOccupation = '';
        $scope.GQualification = '0';
        $scope.GSSN_UID_Number = '';
        $scope.GMobileNumber = '';
        $scope.GEmail = '';
        $scope.RAddress1 = '';
        $scope.RAddress2 = '';
        $scope.RAddress3 = '';
        $scope.RDistrict = '';
        $scope.RPinCode = '';
        $scope.RLandmark = '';
        $scope.StateName = "0";
        $scope.CountryName = "0";
        $scope.LocationName = "0";
        $scope.PermanentCityName1 = "0";
        $scope.PermanentStateName1 = "0";

        $scope.PermanentCountryName1 = "0";


        $scope.AnnualIncome = '';
        $scope.AccountName = '';
        $scope.AccountNumber = '';
        $scope.IFSC_Code = '';
        $scope.MICR_Number = '';
        $scope.BankName = "0";
        $scope.BranchName = "0";
        $scope.InstituteName = '';
        $scope.TC_Number = '';
        $scope.MarksObtained = '';
        $scope.Address = '';
        $scope.Remarks = '';
        $scope.MediumPrevious = "0";
        $scope.CoursePrevious = "0";
        $scope.Eligibility = '';
        $scope.Description = '';
        $scope.Year = "0";
        // $scope.ReferenceType = "";
        $scope.Document = "";
        $scope.Father_Qualification = "0";
        $scope.Mother_Qualification = "0";
        $scope.Guardian_Qualification = "0";

        $scope.ReferenceType = "1";

        // Filter Function
        $scope.MediumId = "";
        $scope.CourseId = "0";
        $scope.SectionId = "";
        $scope.AcademicYearId = "0";
        $scope.Name = '';
        $scope.flag = 0;

        $scope.StudentCategory = "0";
        $scope.CategoryName = "";

        //Enrollment
        $scope.EnrollmentAcademicYear = '';
        $scope.EnrollmentMediumName = "0";
        $scope.EnrollmentCourse = "0";
        $scope.EnrollmentSection = "0";
        $scope.EnrollmentCategory = '';
        $scope.CommonTransId = "0";
        $scope.CommonTransName = "";
        $scope.CommonTransaction_Title = "";
        $scope.CommontransactionList = [];
        var app = angular.module('exampleApp', []);



    $scope.List_filters_load=function () {
        $scope.AcademicYearBasedCourseFunction();
        $scope.CourseBasedSectionFunction();
        $scope.EnrollmentAcademicYearBasedCourseFunction();
        $scope.mediumlistforstudent();
       
    }   
    
    $scope.mediumlistforstudent=function(){
        $scope.MediumList = [];
        $http.post(baseUrl + '/getmediumlist',InstObj).then(function success(response) {
            $scope.Mediumlist = response.data;
            $scope.Medium_list = $ff(response.data, {
                isactive: 1
            });
            $scope.Medium_Lists = $ff(response.data, {
                isactive: 1
            });
        });
    }
        $scope.AcademicStatusFunction = function () {
            alert("Closed Academic Year cannot be edited");
        }

        $scope.AdmissionDateInit = function () {
            var Currentdate = $filter('date')(new Date(), 'dd-MMM-yyyy');
            $scope.AdmissionDate = Currentdate
        }
        
        $scope.calculatePreviousAcademicYear = function () {
            //if ($scope.Last_Working_Day == '')
            {
                $scope.Year = Number($scope.AcademicYear) - 1;
            }
        }


        // Clear the date function
        // $scope.dateclear();
        $scope.dateclear = function () {
            $scope.DOB = "";
            $('#DateBirth').val('');
        };

        $scope.dateclear1 = function () {
            $scope.AdmissionDate = "";
            $('#AdmDate').val('');
        };

        $scope.dateclear1();
        /* Clear the document/files */
        $scope.fileclear = function () {
            $scope.AdmissionDate = "";
            $('#AdmDate').val('');
        };
       

        $scope.PermanentStateClearFunction = function () {
            $scope.PermanentStateName1 = "0";
        };

        $scope.PermanentLocationClearFunction = function () {
            $scope.PermanentCityName1 = "0";
        };
        $scope.ClearStatefunction = function () {
            $scope.StateName = "0";
        };

        $scope.ClearCityfunction = function () 
        {
            $scope.LocationName = "0";
        };

        /* This is function for Pagination */
        $scope.listdata = [];
        $scope.current_page = 1;
        $scope.page_size = 10;
        $scope.rembemberCurrentPage = function (p) {
            $scope.current_page = p
        }

        $scope.Studentlist = [];
        $http.post(baseUrl + '/getstudentnamelist',InstObj).then(function success(response) {
            $scope.Studentlist = response.data;
        });


        // $scope.EmployeeNameList = [];
        // $http.get('/getStaffNamelist/',InstObj).then(function success(response) {
        //     $scope.EmployeeNameList = $ff(response.data, {
        //         IsActive: 1

        //     });

        // });

        $scope.studentresult = function () {

            if ($scope.Validationrollnumber == true) {



                var obj = {
                    Id: $scope.Id,
                    
                }

                $http.post(baseUrl + '/getStudent_result', obj).then(function success(response) {
                    //console.log(response.data);

                    if (response.data[0].data == 0) {
                        alert("Fteched data successfully");

                    }
                    if (response.data[0].data == 5) {
                        alert("Wrong Details");
                    } 
                    else
                    {
                        alert('Wrong Data');
                    }
                });
                }
            }


       
        $scope.Convert24to12Timeformat = function (inputTime) {
            var outputTime = null;
            if (inputTime != '' && inputTime != null) {
                inputTime = inputTime.toString(); //value to string for splitting
                var splitTime = inputTime.split(':');
                splitTime.splice(2, 1);
                var ampm = (splitTime[0] >= 12 ? ' PM' : ' AM'); //determine AM or PM
                splitTime[0] = splitTime[0] % 12;
                splitTime[0] = (splitTime[0] == 0 ? 12 : splitTime[0]); //adjust for 0 = 12
                outputTime = splitTime.join(':') + ampm;
            }
            return outputTime;
        };
        $scope.Convert12To24Timeformat = function (timeval) {
            var outputTime = null;
            if (timeval != '' && timeval != null) {
                var time = timeval;
                var hours = Number(time.match(/^(\d+)/)[1]);
                var minutes = Number(time.match(/:(\d+)/)[1]);
                var AMPM = time.match(/\s(.*)$/)[1];
                if (AMPM == "PM" && hours < 12) hours = hours + 12;
                if (AMPM == "AM" && hours == 12) hours = hours - 12;
                var sHours = hours.toString();
                var sMinutes = minutes.toString();
                if (hours < 10) sHours = "0" + sHours;
                if (minutes < 10) sMinutes = "0" + sMinutes;
                outputTime = sHours + ":" + sMinutes;
            }
            return outputTime;
        };
        $scope.ManageStudentValidations = function () {
            if (typeof ($scope.AcademicYearId) == "undefined" || $scope.AcademicYearId == "0") {
                alert("Please select Academic Year");
                return false;
            } else if (typeof ($scope.CourseId) == "undefined" || $scope.CourseId == "0") {
                alert("Please select Course");
                return false;
            }
            else if (typeof ($scope.MediumId) == "undefined" || $scope.MediumId == "") {
                alert("Please select Medium");
                return false;
            }
            else if (typeof ($scope.SectionId) == "undefined" || $scope.SectionId == "") {
                alert("Please select Section");
                return false;
            }
            return true;
        };

        $scope.PresentAddress = function () {

            if ($scope.CommunicationAddress == true) {
                $scope.PAddress1 = $scope.RAddress1,
                    $scope.PAddress2 = $scope.RAddress2,
                    $scope.PermanentCountryName1 = $scope.CountryName,
                    $scope.PermanentStateName1 = $scope.StateName,
                    $scope.PermanentCityName1 = $scope.LocationName,
                    $scope.PPinCode = $scope.RPinCode,
                    $scope.PLandmark = $scope.RLandmark
            }
            
            if ($scope.CommunicationAddress == false) {
                $scope.PAddress1 = "",
                    $scope.PAddress2 = "",
                    $scope.PermanentCountryName1 = "0",
                    $scope.PermanentStateName1 = "0",
                    $scope.PermanentCityName1 = "0",
                    $scope.PPinCode = "",
                    $scope.PLandmark = ""

                return false;
            }
        };
        $scope.flag = 0;
        $scope.studentlist = [];
   
        $scope.studentmasterlist = function () {
            
            $scope.List_filters_load();
            if ($scope.ManageStudentValidations() == true) {
                $("#chatLoaderPV").show();
                var obj = {
                    MediumId: $scope.MediumId,
                    CourseId: $scope.CourseId,
                    SectionId: $scope.SectionId,
                    StudentName: $scope.Name,
                    AcademicYearId: $scope.AcademicYearId,
                    RollNumber: $scope.RollNumber,
                    InstitutionId : $scope.InstitutionId
                };
                $scope.Enrollment_AcademicYear = $scope.AcademicYearId,
                    $http.post(baseUrl + '/getStudentList', obj).then(function success(response) {
                        $scope.emptydata = [];
                        $scope.studentlist = [];
                        $scope.studentlist = response.data;
                        $state.go('ManageStudent');

                        if ($scope.studentlist.length > 0) {
                            $scope.flag = 1;
                        } else {
                            $scope.flag = 0;
                        }

                        // $scope.UserId = 2;

                        // $scope.exportData = $scope.studentlist;
                        // $scope.HeaderTitle = $scope.CommonTransaction_Title;
                        // $scope.schoolname = $scope.SchoolNameList[0].SchoolName;
                        // $scope.address = $scope.SchoolNameList[0].Address;
                        // $scope.loginuserId = $scope.UserId;

                        $("#chatLoaderPV").hide();
                    })
            }
            $scope.AcademicChild = $scope.AcademicYearId;
            // $scope.Id = 0;
        }


        $scope.ListRedirect = function () {

            $state.go('ManageStudent');

        }
        $scope.addnewdrodowns=function(){
        $scope.GenderList = [];
        $http.post(baseUrl + '/getGenderList',InstObj).then(function success(response) {
            $scope.GenderList = response.data;
            $scope.Gender_list = $ff(response.data, {
                isactive: 1
            });
        });

        $scope.CommunityList = [];
        $http.post(baseUrl + '/getcommunitylist',InstObj).then(function success(response) {
            $scope.Communitylist = response.data;
            $scope.Community_list = $ff(response.data, {
                isactive: 1
            });
        });

       

        $scope.CourseList = [];
        $http.post(baseUrl + '/getcourselist', InstObj).then(function success(response) {
            $scope.Course_list = $ff(response.data, {
                isactive: 1
            });
            $scope.Course_Lists = $ff(response.data, {
                isactive: 1
            });
        });

        $scope.ReferenceTypeList = [];
        $http.get(baseUrl + '/getreferencetypelist').then(function success(response) {
            $scope.ReferenceTypelist = response.data;
        });

        $scope.MotherTongueList = [];
        $http.post(baseUrl + '/getMotherTongueList',InstObj).then(function success(response) {
            $scope.MotherTonguelist = response.data;
            $scope.MotherTongue_list = $ff(response.data, {
                isactive: 1
            });
        });

        $scope.ReligionList = [];
        $http.post(baseUrl + '/getReligionList',InstObj).then(function success(response) {
            $scope.ReligionList = response.data;
            $scope.Religion_list = $ff(response.data, {
                isactive: 1
            });
        });

        $scope.SectionList = [];
        $http.post(baseUrl + '/getSectionList',InstObj).then(function success(response) {
            $scope.SectionList = response.data;
            $scope.Section_List = $ff(response.data, {
                isactive: 1
            });
        });

        $scope.StudentCategoryList = [];
        $scope.StudentCategory_List = [];
        $http.post(baseUrl + '/getStudentCategoryList',InstObj).then(function success(response) {
            $scope.StudentCategoryList = response.data;
            $scope.StudentCategory_List = $ff(response.data, {
                isactive: 1
            });
        });
        $scope.StateList = [];
        $http.post(baseUrl + '/getStateList',InstObj).then(function success(response) {
            $scope.StateList = response.data;
            $scope.State_List = $ff(response.data, {
                isactive: 1
            });
        });

        $scope.CountryList = [];
        $http.post(baseUrl + '/getCountryList',InstObj).then(function success(response) {
            $scope.CountryList = response.data;
            $scope.Country_List = $ff(response.data, {
                isactive: 1
            });
        });

        $scope.LocationList = [];
        $http.post(baseUrl + '/getLocationList',InstObj).then(function success(response) {
            $scope.LocationList = response.data;
            $scope.Location_List = $ff(response.data, {
                isactive: 1
            });
        });
        
        $scope.BloodGroupList = [];
        $http.post(baseUrl + '/getBloodGroupList',InstObj).then(function success(response) {
            $scope.BloodGroupList = response.data;
            $scope.BloodGroup_List = $ff(response.data, {
                isactive: 1
            });
        });
        $scope.BankList = [];
        $http.post(baseUrl + '/getBankNameList',InstObj).then(function success(response) {
            $scope.BankList = response.data;
            $scope.Bank_List = $ff(response.data, {
                isactive: 1
            });
        });


        $scope.BranchList = [];
        $http.post(baseUrl + '/getBranchList',InstObj).then(function success(response) {
            $scope.BranchList = response.data;
            $scope.Branch_List = $ff(response.data, {
                isactive: 1
            });
        });


        $scope.QualificationList = [];
        $http.post(baseUrl + '/getQualificationList',InstObj).then(function success(response) {
            $scope.QualificationList = response.data;
            $scope.Qualification_List = $ff(response.data, {
                isactive: 1
            });
        });
        $scope.CasteList = [];
        $http.post(baseUrl + '/getcastelist',InstObj).then(function success(response) {
            $scope.CasteList = response.data;
            $scope.Caste_List = $ff(response.data, {
                isactive: 1
            });
        });

        $scope.AddDocument = [];
        $http.post(baseUrl + '/getDocumentTypeList',InstObj).then(function success(response) {
            $scope.AddDocument = response.data;
        });
        $scope.LanguageList = [];
        $http.post(baseUrl + '/getLanguageList',InstObj).then(function success(response) {
            $scope.Languagelist = response.data;
        });

    }
        if($state.current.url=="/StudentDetails" || $state.current.url=="/EditStudentDetails/:Id")
        {
            $scope.addnewdrodowns();
            $scope.mediumlistforstudent();    
        }

        $scope.AcademicYearBasedCourseFunction = function () {
            if ($scope.AcademicYearId == 0) {
                $http.post(baseUrl + '/getcourselist',InstObj).then(function success(response) {
                    $scope.Filter_Courselist = response.data;
                });
            } else {
                var obj = {
                    AcademicYearId: $scope.AcademicYearId,
                    InstitutionId : $scope.InstitutionId
                }
                $http.post(baseUrl + '/getAcademicYearBasedCourse', obj).then(function success(response) {
                    $scope.Filter_Courselist = response.data;
                });
            }
        }

        $scope.JoiningAcademicYearBasedCourseFunction = function () {            
            var obj = {
                AcademicYearId: $scope.AcademicYear,
                InstitutionId : $scope.InstitutionId
            }
            $http.post(baseUrl + '/getAcademicYearBasedCourse', obj).then(function success(response) {
                $scope.Course_list = $ff(response.data, {
                    isactive: 1
                });
            });
        }
        $scope.CourseClearFunction = function () {
            $scope.CourseId = "0";
        }


        $scope.CourseBasedSectionList = [];
        $scope.CourseBasedSectionFunction = function () {
            if ($scope.CourseId == 0) {
                $http.post(baseUrl + '/getSectionList',InstObj).then(function success(response) {

                    $scope.CourseBasedSectionList = response.data;
                });
            } else {
                var obj = {
                    AcademicYearId: $scope.AcademicYearId,
                    CourseId: $scope.CourseId

                };

                $http.post(baseUrl + '/getCourseBasedSectionList', obj).then(function success(response) {

                    $scope.CourseBasedSectionList = response.data;
                });
            }
        }



        $scope.EnrollmentCourseBasedSection = function () {
            var obj = {
                CourseId: $scope.EnrollmentCourse
            };
            $http.post(baseUrl + '/getCourseBasedSectionList', obj).then(function success(response) {
                $scope.CourseBasedSectionList = response.data;
            });

        }
        $scope.CourseBasedSectionClear = function () {
            $scope.Section = "0";

        }

        // $scope.CourseBasedSectionList = [];
        // $http.post(baseUrl + '/getCourseBasedSectionList').then(function success(response) {
        //     $scope.CourseBasedSectionList = response.data;
        // });
       
        $scope.AcademicYearList = [];
      
        $http.post(baseUrl + '/getAcademicYearList', InstObj).then(function success(response) {
            $scope.AcademicYearList = $ff(response.data, {
                status: 0
            });
            $scope.AcyYear = $ff(response.data, {
                academicflag: 1
            });
            $scope.AcademicYearId = $scope.AcyYear[0].id.toString();
            $scope.AcademicYear = $scope.AcyYear[0].id.toString();
            $scope.AcademicYearBasedCourseFunction();
            $scope.CourseBasedSectionFunction();
            $scope.EnrollmentAcademicYearBasedCourseFunction();

        });
  

      

      


        $scope.AddModal = function (OTId) {
            $scope.addnewdrodowns();
            $scope.Id = OTId;
            // $scope.BloodGroup = "0";
            // $scope.StateName = "0";
            // $scope.CountryName = "0";
            // $scope.LocationName = "0";
            // $scope.PermanentCityName1 = "0";
            // $scope.PermanentStateName1 = "0";
            // $scope.PermanentCountryName1 = "0";
            // $scope.BankName = "0";
            // $scope.BranchName = "0";
            // $scope.Year = "0";
            // // $scope.ReferenceType = "0";
            // $scope.MediumPrevious = "0";
            // $scope.CoursePrevious = "0";
            $state.go('StudentDetails');
        }

        $scope.ViewModal = function (OTId) {
            $state.go('StudentDetailsView', {
                Id: OTId
            });
        }

        $scope.EditModal = function (OTId) {
            $scope.Id = OTId;
            $scope.ViewStudentDetails();
            $state.go('EditStudentDetails', {
                Id: OTId
            });
        }

        // AssignLanguage EditModal
        $scope.EditLanguageModal = function (OTId) {
            $scope.Id = OTId;
            angular.element('#AssignRollNumberAddModal').modal('show');
        }

     

        //This is Check box select function for Technical skill //



        $scope.RollNumberList = [];
        $scope.StudSelectionList = [];
        $scope.FirstLanguageName = [];
        $scope.SecondLanguageName = [];
        $scope.FirstLanguageId = [];
        $scope.SecondLanguageId = [];
        // Login Page
        $scope.LoginAddModal = function (OTId) {
            $scope.Id = OTId;
            angular.element('#StudentLoginAddModal').modal('show');
        }

        $scope.EnrollmentAddModal = function (OTId) {
            $scope.Id = OTId;
            $scope.AcademicyearBasedcouSecMed();
            angular.element('#StudentEnrollmentAddModal').modal('show');
        }

        $scope.EnrollmentAcademicYearBasedCourseFunction = function () {
            alert
            if ($scope.Enrollment_AcademicYear == 0) {
                $http.get(baseUrl + '/getcourselist').then(function success(response) {
                    // $scope.Courselist = response.data;
                    $scope.Courselist = $ff(response.data, {
                        isactive: 1
                    });
                });
            } else {
                var obj = {
                    AcademicYearId: $scope.Enrollment_AcademicYear,
                    InstitutionId : $scope.InstitutionId
                }
                $http.post(baseUrl + '/getAcademicYearBasedCourse', obj).then(function success(response) {
                    $scope.Courselist = $ff(response.data, {
                        isactive: 1
                    });
                });
            }
        }


        $scope.AcademicyearBasedcouSecMed = function ()
        {
            // $scope.EnrollmentCourse = "0";
            // $scope.EnrollmentSection = "0";
            // $scope.EnrollmentMediumName = "0";
            var obj = {
                StudentId: $scope.Id,
                AcademicYearId: $scope.Enrollment_AcademicYear
            }

            $http.post(baseUrl + '/getEnrollmentAutofill', obj).then(function success(response) {
              
                $scope.EnrollmentAcademicYearBasedCourseFunction();
                $scope.EnrollmentCourse = response.data[0].CourseId.toString();
                $scope.EnrollmentSection = response.data[0].SectionId.toString();
                $scope.EnrollmentMediumName = response.data[0].MediumId.toString();

            });

        };
       
        $scope.StudentEnrollmentValidations= function() {

            if (typeof ($scope.Enrollment_AcademicYear) == "undefined" || $scope.Enrollment_AcademicYear == "0") {
                alert("Please select Academic Year");
                return false;
            } else if (typeof ($scope.EnrollmentCourse) == "undefined" || $scope.EnrollmentCourse == "0") {
                alert("Please select Course");
                return false;
            }  else if (typeof ($scope.EnrollmentMediumName) == "undefined" || $scope.EnrollmentMediumName == "0") {
                alert("Please select Medium");
                return false;
            } else if (typeof ($scope.EnrollmentSection) == "undefined" || $scope.EnrollmentSection == "0") {
                alert("Please select Section");
                return false;
            } 

            return true;
        
        };

        $scope.StudentEnrollment_AddEdit = function () {
            if ($scope.StudentEnrollmentValidations() == true) {
            var obj = {
                Id: $scope.Id,
                InstitutionId: $scope.InstitutionId,
                StudentId: $scope.Id,
                EnrollmentAcademicYearId: $scope.Enrollment_AcademicYear,
                EnrollmentMediumId: $scope.EnrollmentMediumName,
                EnrollmentCourseId: $scope.EnrollmentCourse,
                EnrollmentSectionId: $scope.EnrollmentSection,
                EnrollmentCategoryId: $scope.EnrollmentCategory

            };
            $http.post(baseUrl + '/addStudentEnrollment', obj).then(function success(response) {
                $http.post(baseUrl + '/UpdateEnrollment', obj).then(function success(response) {
                    if (response.data !== 0) {
                        alert("Added/Updated successfully");
                        $scope.ListCancelPopup();
                        $sid = response.data;
                    } else {
                        alert("Insert/Update Problem");
                    }
                });
            });
         }
        };

        $scope.EnrollmentClearPopUp = function () {
            $scope.EnrollmentAcademicYear = '';
            $scope.EnrollmentMediumName = "0";
            // $scope.EnrollmentCourse = "0";
            $scope.EnrollmentSection = "0";
            $scope.EnrollmentCategory = '';
        }

        $scope.ListCancelPopup = function () {
            angular.element('#StudentEnrollmentAddModal').modal('hide');
            angular.element('#StudentTransportAddModal').modal('hide');
            angular.element('#StudentLoginAddModal').modal('hide');

            $scope.EnrollmentClearPopUp();
        }
     


        $scope.StudentLogin_AddEdit = function () {

            var obj = {
                Id: $scope.Id,
                LoginName: $scope.LoginName

            };
            ////console.log(obj);
            $http.post(baseUrl + '/addStudentLogin', obj).then(function success(response) {
                ////console.log(response.data);
                if (response.data !== 0) {
                    alert("Added/Updated successfully");
                    $scope.CancelPopup();
                    $sid = response.data;
                } else {
                    alert("Insert/Update Problem");
                }
            });
        };

        $scope.StudentPhoto1 = "";
        $scope.ViewStudentDetails = function () {
        
            if ($stateParams.Id != undefined && $stateParams.Id > 0) {
                var data = {
                    Id: $stateParams.Id,

                }
                ////console.log(data);
                $http.post(baseUrl + '/getStudentView', data).then(function success(response) {
                    $scope.Id = response.data[0].id;
                    $scope.InstitutionId = response.data[0].institutionid;
                    $scope.DuplicateId = response.data[0].id;
                    $scope.StudentId = response.data[0].studentid;

                    $scope.StudentPhoto = response.data[0].studentphoto;
                    $scope.StudentPhoto1 = "/Uploads/" + response.data[0].studentphoto;

                    $scope.DocumentFileName = response.data[0].documentname;
                    $scope.ApplicationNumber = response.data[0].applicationnumber;
                    $scope.AdmissionNumber = response.data[0].admissionnumber;
                    $scope.AdmissionDate = $filter('date')(response.data[0].admissiondate, "dd-MMM-yyyy");
                    $scope.StudentName = response.data[0].studentname;
                    $scope.FirstName = response.data[0].firstname;
                    $scope.MiddleName = response.data[0].middlename;
                    $scope.LastName = response.data[0].lastname;

                    $scope.DOB = $filter('date')(response.data[0].dob, "dd-MMM-yyyy");
                    $scope.FatherName = response.data[0].fathername;
                    $scope.MotherName = response.data[0].mothername;
                    $scope.GuardianName = response.data[0].guardianname;
                    $scope.Gender = response.data[0].genderid.toString();
                    $scope.ViewGender = response.data[0].gender;

                    $scope.Religion = response.data[0].religionid.toString();
                    $scope.ViewReligion = response.data[0].religion;
                    $scope.Caste = response.data[0].casteid.toString();
                    $scope.ViewCaste = response.data[0].castename;
                    $scope.Community = response.data[0].communityid.toString();
                    $scope.ViewCommunity = response.data[0].community;

                    $scope.MotherTongue = response.data[0].mothertongueid.toString();
                    $scope.ViewMotherTongue = response.data[0].mothertongue;

                    $scope.BloodGroup = response.data[0].bloodgroupid.toString();
                    $scope.ViewBloodGroup = response.data[0].bloodgroup;

                    $scope.IdentityMark = response.data[0].identitymark;
                    $scope.RegisterNumber = response.data[0].registernumber;
                    $scope.SSN_UID_Number = response.data[0].ssn_uid_number;
                    $scope.SMobileNumber = response.data[0].smobilenumber;
                    $scope.SEmail = response.data[0].semail;
                    //Bank details
                    $scope.AnnualIncome = response.data[0].annualincome;

                    $scope.AccountName = response.data[0].accountname;
                    $scope.AccountNumber = response.data[0].accountnumber;
                    $scope.IFSC_Code = response.data[0].ifsc_code;
                    $scope.MICR_Number = response.data[0].micr_number;

                    $scope.BankName = response.data[0].banknameid.toString();
                    $scope.ViewBankName = response.data[0].bankname;
                    $scope.BranchName = response.data[0].branchnameid.toString();
                    $scope.ViewBranchName = response.data[0].branchname;
                    $scope.TC_Number = response.data[0].tc_number;
                    $scope.MarksObtained = response.data[0].marksobtained;
                    $scope.InstituteName = response.data[0].institutename;
                    $scope.Address = response.data[0].address;
                    $scope.Remarks = response.data[0].remarks;

                    $scope.MediumPrevious = response.data[0].mediumpreviousid.toString();
                    $scope.ViewMediumPrevious = response.data[0].mediumprevious;

                    $scope.CoursePrevious = response.data[0].coursepreviousid.toString();
                    $scope.ViewCoursePrevious = response.data[0].previouscourse;



                    $scope.FamilyDoctorName = response.data[0].familydoctorname;
                    $scope.FamilyDoctorNumber = response.data[0].familydoctornumber;
                    $scope.FamilyDoctorAddress = response.data[0].familydoctoraddress;
                    $scope.Description = response.data[0].description;

                    $scope.Year = response.data[0].yearid.toString();
                    $scope.ViewYear = response.data[0].year;
                    $scope.ReferenceType = response.data[0].referencetypeid.toString();
                    $scope.ViewReferenceType = response.data[0].referencetype;
                    $scope.Document = response.data[0].documentid.toString();
                    $scope.ViewDocument = response.data[0].document;
                    if (response.data[0].healthissue === 1) {
                        $scope.HealthIssue = true;
                    } else {
                        $scope.HealthIssue = false;
                    }
                    if (response.data[0].communicationaddress === 1) {
                        $scope.CommunicationAddress = true;
                    } else {
                        $scope.CommunicationAddress = false;
                    }
                    $scope.HealthIssueType = response.data[0].healthissuetype;
                    $scope.IdentityMark2 = response.data[0].identitymark2;
                    $scope.Remarks2 = response.data[0].remarks2;

                    $scope.Father_CommunicationNumber = response.data[0].father_communicationnumber;
                    $scope.Father_CommunicationEmail = response.data[0].father_communicationemail;
                    $scope.Father_OrganisationName = response.data[0].father_organisationname;
                    $scope.Father_OrganisationNumber = response.data[0].father_organisationnumber;
                    $scope.Father_OrganisationAddress = response.data[0].father_organisationaddress;

                    $scope.Mother_CommunicationNumber = response.data[0].mother_communicationnumber;
                    $scope.Mother_CommunicationEmail = response.data[0].mother_communicationemail;
                    $scope.Mother_OrganisationName = response.data[0].mother_organisationname;
                    $scope.Mother_OrganisationNumber = response.data[0].mother_organisationnumber;
                    $scope.Mother_OrganisationAddress = response.data[0].mother_organisationaddress;

                    $scope.Guardian_CommunicationNumber = response.data[0].guardian_communicationnumber;
                    $scope.Guardian_CommunicationEmail = response.data[0].guardian_communicationemail;
                    $scope.Guardian_OrganisationName = response.data[0].guardian_organisationname;
                    $scope.Guardian_OrganisationNumber = response.data[0].guardian_organisationnumber;
                    $scope.Guardian_OrganisationAddress = response.data[0].guardian_organisationaddress;

                    $scope.MediumName = response.data[0].mediumid.toString();
                    $scope.ViewMediumName = response.data[0].mname;


                    $scope.AcademicYear = response.data[0].academicyearid.toString();
                    $scope.ViewAcademicYear = response.data[0].academicyear;


                    $scope.Section = response.data[0].sectionid.toString();

                    $scope.ViewSection = response.data[0].sectionname;

                    $scope.Course = response.data[0].courseid.toString();
                    $scope.ViewCourse = response.data[0].course;

                    $scope.StudentCategory = response.data[0].studentcategoryid.toString();
                    $scope.CategoryName = response.data[0].categoryname;


                    $scope.FOccupation = response.data[0].foccupation;

                    $scope.Father_Qualification = response.data[0].father_qualificationid.toString();
                    $scope.ViewFather_Qualification = response.data[0].father_qualification;

                    $scope.FSSN_UID_Number = response.data[0].fssn_uid_number;
                    $scope.FMobileNumber = response.data[0].fmobilenumber;
                    $scope.FEmail = response.data[0].femail;
                    $scope.MOccupation = response.data[0].moccupation;

                    $scope.Mother_Qualification = response.data[0].mother_qualificationid.toString();
                    $scope.ViewMother_Qualification = response.data[0].mother_qualification;
                    $scope.MSSN_UID_Number = response.data[0].mssn_uid_number;
                    $scope.MMobileNumber = response.data[0].mmobilenumber;
                    $scope.MEmail = response.data[0].memail;
                    $scope.GOccupation = response.data[0].goccupation;
                    $scope.Guardian_Qualification = response.data[0].guardian_qualificationid.toString();
                    $scope.ViewGuardian_Qualification = response.data[0].guardian_qualification;
                    $scope.GSSN_UID_Number = response.data[0].gssn_uid_number;
                    $scope.GMobileNumber = response.data[0].GMobileNumber;
                    $scope.GEmail = response.data[0].gemail;

                    $scope.RAddress1 = response.data[0].raddress1;
                    $scope.RAddress2 = response.data[0].raddress2;
                    $scope.RAddress3 = response.data[0].raddress3;
                    $scope.RDistrict = response.data[0].rdistrict;
                    $scope.RLandmark = response.data[0].rlandmark;
                    $scope.RPinCode = response.data[0].rpincode;

                    // $scope.DifferentAddress = response.data[0].DifferentAddress;
                    if (response.data[0].differentaddress === 1) {
                        $scope.DifferentAddress = false;
                    } else {
                        $scope.DifferentAddress = true;
                    }
                    if (response.data[0].eligibility === 1) {
                        $scope.Eligibility = false;
                    } else {
                        $scope.Eligibility = true;
                    }

                    $scope.PAddress1 = response.data[0].paddress1;
                    $scope.PAddress2 = response.data[0].paddress2;
                    $scope.PAddress3 = response.data[0].paddress3;
                    $scope.PDistrict = response.data[0].pdistrict;
                    $scope.PLandmark = response.data[0].plandmark;
                    $scope.PPinCode = response.data[0].ppincode;
                    $scope.LocationName = response.data[0].locationid.toString();
                    $scope.ViewLocationName = response.data[0].locationname;
                    $scope.StateName = response.data[0].stateid.toString();
                    $scope.ViewStateName = response.data[0].statename;
                    $scope.CountryName = response.data[0].countryid.toString();
                    $scope.ViewCountryName = response.data[0].countryname;
                    $scope.PermanentCityName1 = response.data[0].permanentcityname.toString();
                    $scope.ViewPermanentCityName = response.data[0].permanentcityname1;
                    $scope.PermanentStateName1 = response.data[0].permanentstatename.toString();
                    $scope.ViewPermanentStateName = response.data[0].permanentstatename1;
                    $scope.PermanentCountryName1 = response.data[0].permanentcountryname.toString();
                    $scope.ViewPermanentCountryName = response.data[0].permanentcountryname1;
                    $scope.OthersId = response.data[0].others;
                    $scope.EMPId = response.data[0].employeename;
                    $scope.ViewEmployeeName = response.data[0].employeename;

                    $scope.Students = response.data[0].studentname;
                    $scope.ViewStudentName = response.data[0].studentname;
                    $scope.$broadcast('angucomplete-alt:changeInput', 'EmployeeId', $scope.ViewEmployeeName);
                    $scope.$broadcast('angucomplete-alt:changeInput', 'StudentId', $scope.ViewStudentName);

                    // $scope.HealthIssue = response.data[0].HealthIssue;

                    var data = {
                        StudentId: $scope.Id
                    }
                    $scope.ViewDocument = [];
                    $http.post(baseUrl + '/getDocumentDetails', data).then(function success(response) {

                        angular.forEach(response.data, function (value, index) {
                           
                            $scope.ViewDocument.push({
                                'Id': value.Id,
                                'Document': value.Document,
                                'DocumentTypeId': value.DocumentTypeId,
                                'docfile': '',
                                'DocumentLocation': value.DocumentLocation,
                                'DocumentFileName': value.DocumentName,
                                'DocumentFullPath': value.DocumentFullPath
                            })
                        });
                    });
                   $scope.AddDocument = [];
                        $http.post(baseUrl + '/DocumentDetailsEditList', data).then(function success(response) {
                            angular.forEach(response.data, function (value, index) {
                               
                                $scope.AddDocument.push({
                                    'Id': value.Id,
                                    'Document': value.Document,
                                    'DocumentTypeId': value.DocumentTypeId,
                                    'docfile': '',
                                    'DocumentLocation': value.DocumentLocation,
                                    'DocumentFileName': value.DocumentName,
                                    'DocumentFullPath': value.DocumentFullPath
                                })
                                //console.log($scope.AddDocument);
                            });
                           
                        });
            
                
                  
                })
            }
        };

        $scope.ForEligibility = function (Eligibility) {
            $scope.Eligibility = Eligibility;
            if (Eligibility == 1) {
                $scope.EligibilityView = "Yes";
            } else {
                $scope.EligibilityView = "No";
            }
        }


        $scope.Joiningdatecalculation = function () {

            $scope.Today_Date = $filter('date')(new Date(), 'DD-MMM-YYYY');
            $scope.Join_Day = moment(ParseDate($scope.Today_Date).subtract(3, 'years')).format("DD-MMM-YYYY");
            if ((ParseDate($scope.DOB)) > (ParseDate($scope.Join_Day))) {
                alert("Please enter valid date for DOB");
                return false;
            }
            return true;
        };


        $scope.Validationcontrols = function () {

            if (typeof ($scope.StudentId) == "undefined" || $scope.StudentId == "") {
                alert("Please enter Student Id");
                return false;
            } else if (typeof ($scope.AdmissionNumber) == "undefined" || $scope.AdmissionNumber == "") {
                alert("Please enter Admission No.");
                return false;
            } else if (isDate($scope.AdmissionDate) == false) {
                alert("Admission Date is in Invalid format, please enter dd-mm-yyyy");
                return false;
            } else if (typeof ($scope.AdmissionDate) == "undefined" || $scope.AdmissionDate == "") {
                alert("Please select Admission Date");
                return false;
            } else if (typeof ($scope.FirstName) == "undefined" || $scope.FirstName == "") {
                alert("Please enter First Name");
                return false;
            } else if (typeof ($scope.LastName) == "undefined" || $scope.LastName == "") {
                alert("Please enter Last Name");
                return false;
            } else if (typeof ($scope.DOB) == "undefined" || $scope.DOB == "") {
                alert("Please select DOB");
                return false;
            } else if (isDate($scope.DOB) == false) {
                alert("DOB is in Invalid date format, please enter dd-mm-yyyy");
                return false;
            } else if ((ParseDate($scope.DOB) > ParseDate($scope.AdmissionDate))) {
                alert('hi');
                alert("DOB should not be greater than Admission Date");
                return false;
            }

            else if (typeof ($scope.Gender) == "undefined" || $scope.Gender == "") {
                alert("Please select Gender");
                return false;
            } else if (typeof ($scope.Community) == "undefined" || $scope.Community == "") {
                alert("Please select Community");
                return false;
            } else if (typeof ($scope.MotherTongue) == "undefined" || $scope.MotherTongue == "") {
                alert("Please select Mother Tongue");
                return false;
            } else if (EmailFormate($scope.SEmail) == false) {
                alert("Student Email is in invalid format");
                return false;
            } else if (typeof ($scope.IdentityMark) == "undefined" || $scope.IdentityMark == "") {
                alert("Please enter Identity Mark1");
                return false;
            }
            // else if (typeof($scope.RegisterNumber) == "undefined" || $scope.RegisterNumber == "") {
            //     alert("Please enter Register No.");
            //     return false;
            // } 
            else if (typeof ($scope.SMobileNumber) == "undefined" || $scope.SMobileNumber == "") {
                alert("Please enter Mobile No.");
                return false;
            } else if (typeof ($scope.AcademicYear) == "undefined" || $scope.AcademicYear == "") {
                alert("Please select Academic Year");
                return false;
            } else if (typeof ($scope.Course) == "undefined" || $scope.Course == "") {
                alert("Please select Course");
                return false;
            } else if (typeof ($scope.MediumName) == "undefined" || $scope.MediumName == "") {
                alert("Please select Medium");
                return false;
            } else if (EmailFormate($scope.FEmail) == false) {
                alert("Father Email is in invalid format");
                return false;
            } else if (EmailFormate($scope.Father_CommunicationEmail) == false) {
                alert("Father Communication  Email is in invalid format");
                return false;
            } else if (EmailFormate($scope.MEmail) == false) {
                alert("Mother Email is in invalid format");
                return false;
            } else if (EmailFormate($scope.Mother_CommunicationEmail) == false) {
                alert("Mother Communication  Email is in invalid format");
                return false;
            } else if (EmailFormate($scope.GEmail) == false) {
                alert("Guardian Email is in invalid format");
                return false;
            } else if (EmailFormate($scope.Guardian_CommunicationEmail) == false) {
                alert("Guardian Communication  Email is in invalid format");
                return false;
            }
            return true;
        };

        $scope.uploadme = "";
        $scope.FileName = "";

        /*This is for getting a file url for uploading the url into the database*/
        $scope.dataURItoBlob = function (dataURI) {
            var binary = atob(dataURI.split(',')[1]);
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            var array = [];
            for (var i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
            }
            return new Blob([new Uint8Array(array)], {
                type: mimeString
            });
        }

    
        $scope.Documentclear = function () {
            $scope.DocumentFileName = "";
        }

        /* Clear the uploaded image */
        $scope.imageclear = function () {
            $scope.CompanyLogo = "";
            $scope.FileName = "";
            $scope.uploadme = "";
            $scope.uploadPhoto = "";
            $('#companyphoto').val('');
        };

        //This is for Document file clear functions//
        $scope.fileclear = function () {
            $('#documentfile').val = ('');
            $scope.DocFileName = "";
        };

        /*This is for getting a file url for uploading the url into the database*/
        $scope.dataURItoBlob = function (dataURI) {
            var binary = atob(dataURI.split(',')[1]);
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            var array = [];
            for (var i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
            }
            return new Blob([new Uint8Array(array)], {
                type: mimeString
            });
        }
        //This is for change photo function//
        $scope.photoChange = function () {
            if ($('#PhotoID')[0].files[0] != undefined) {
                $scope.FileName = $('#PhotoID')[0].files[0]['name'];
            }
        }

        //This is for file change function//
        $scope.docfileChange = function (e, index) {
            //console.log(index);
            var row = $scope.AddDocument[index];
            if(row!=undefined)
                row.DocumentFileName = e.files[0]['name'];

          
        }


        //this is for image upload function//
        $scope.uploadImage = function (Photo) {
            var filename = "";
            if ($('#PhotoID')[0].files[0] != undefined) {
                filename = $('#PhotoID')[0].files[0]['name'];
            }
        }

        $scope.DocumentFileName = "";
        $scope.DocumentRow = -1;
        $scope.ChildId = 0;
        $scope.AddDocument = [];
        $scope.MasterId = 0;
        //$scope.DocumentTypeId = 0;

        $scope.AddDocument = [{
            'Id': $scope.ChildId,
            'DocumentTypeId': $scope.DocumentTypeId,
            'docfile': $scope.docfile,
            'DocumentFileName': ''
        }];

        $scope.DocumentSave = function (document) {


            if ($scope.DocumentRow >= 0) {
                var obj = {
                    'Id': $scope.ChildId,
                    'DocumentTypeId': $scope.DocumentTypeId,
                    'docfile': $scope.docfile,
                    'DocumentFileName': ''
                }
                $scope.AddDocument[$scope.DocumentRow] = obj;
            } else {
                $scope.AddDocument.push({
                    'Id': $scope.ChildId,
                    'DocumentTypeId': $scope.DocumentTypeId, //== 0 ? null : $scope.DocumentTypeId,
                    'docfile': $scope.docfile, //== "" ? null ? $scope.DocumentFileName
                    'DocumentFileName': ''
                })
            }
        };

        /*on click Remove in Previous Experience Filed its calling the Qualification delete funtion */
        $scope.RemoveDocumentItem = function () {
            //alert("Id::::::::::" + $scope.MasterId);
            var DocumentItem = [];
            var IsItemSelected = false;
            if ($scope.MasterId <= 0) {
                angular.forEach($scope.AddDocument, function (selectedQual) {
                    if (!selectedQual.selectedQual) {
                        DocumentItem.push(selectedQual);
                    } else {
                        IsItemSelected = true;
                    }
                    $scope.AddDocument = DocumentItem;
                });

            } else if ($scope.MasterId > 0) {
                angular.forEach($scope.AddDocument, function (selectedQual, index) {

                    if (selectedQual.selectedQual) {
                        //alert(selectedQual.Id);
                        $scope.QuaId = selectedQual.Id;
                        $scope.DocumentItemDelete();
                        IsItemSelected = true;
                    }
                    if (!selectedQual.selectedQual) {
                        DocumentItem.push(selectedQual);
                    }
                    $scope.AddDocument = DocumentItem;
                });
            }
            //alert(IsItemSelected);
            if (IsItemSelected == false) {
                alert("Please select atleast one Document item to remove");
            }
        };

        /*Calling api method for delete selected Qualification details for the candidate*/
        $scope.DocumentItemDelete = function () {
            var obj = {
                Id: $scope.QuaId
            };
            $http.post(baseUrl + '/deleteDocumentItem', obj).then(function success(response) {
                
            });
        };

        $scope.Enquiryupdate = function () {
            $http.get(baseUrl + '/getStatusList').then(function success(response) {
                $scope.EnquiryStatus = $ff(response.data, {
                    status: 'Closed'
                });
                angular.forEach($scope.EnquiryStatus, function (value, index) {
                    $scope.Enquiryupdatestatus = value.Id;
                })
            });
        }

        $scope.Enquiryupdate();

        $scope.docid = 0;
        $scope.DuplicateId = 0;

        $scope.Value = [];
        $scope.StudentDetails_AddEdit = function () {
            if ($scope.AdmissionNumber != "") {
               
                var obj = {
                    Id: $scope.DuplicateId,
                    StudentId: $scope.StudentId,
                    AdmissionNumber: $scope.AdmissionNumber
                }

                $http.post(baseUrl + '/getAdmissionNumberDuplicate', obj).then(function success(response1) {
                    $scope.Value1 = response1.data;

                    angular.forEach($scope.Value1, function (v1, index1) {
                        $scope.val1 = v1.val;
                    })
                    if ($scope.val1 == 1) {
                        alert("Admission Number  already exists,cannot duplicate");
                        return AdmissionNumber;
                    }

                    $scope.StudentDetails_Add();
                })
                // })

            } else {

                $scope.StudentDetails_Add();
            }


        };

        $scope.StudentDetails_Add = function () {
            $scope.EMPId = "";
            if ($scope.employeeselected != undefined) {
                $scope.EMPId = $scope.employeeselected.originalObject.Id;
            }
            $scope.Students = "";
            if ($scope.StudentSelected != undefined) {
                $scope.Students = $scope.StudentSelected.originalObject.Id;
            }
            if ($scope.Validationcontrols() == true) {

                if ($scope.Joiningdatecalculation() == true) {

                    var filename = "";
                    var Licensefilename = "";

                    var fd = new FormData();
                    var imgBlob;
                    var imgBlobfile;
                    var itemIndexLogo = -1;
                    var itemIndexdoc = -1;

                    var fd = new FormData();
                    if ($('#StudentPhoto')[0].files[0] != undefined) {
                        filename = $('#StudentPhoto')[0].files[0]['name'];
                        imgBlob = $scope.dataURItoBlob($scope.StudentPhoto1);
                        itemIndexLogo = 0;
                    }

                    // if ($('#documentfile')[0].files[0] != undefined) {
                    //     Licensefilename = $('#documentfile')[0].files[0]['name'];
                    //     imgBlobfile = $scope.dataURItoBlob($scope.uploadme);
                    //     if (itemIndexLogo == -1) {
                    //         itemIndexdoc = 0;
                    //     } else {
                    //         itemIndexdoc = 1;
                    //     }
                    // }

                    if (itemIndexLogo != -1) {
                        fd.append('file', imgBlob);
                    }

                    // if (itemIndexdoc != -1) {
                    //     fd.append('file1', imgBlobfile);
                    // }

                    $scope.StudentPhoto1 = '';
                    $http.post(baseUrl + '/PhotoStudent',
                        fd, {
                            transformRequest: angular.identity,
                            headers: {
                                'Content-Type': undefined
                            }
                        }
                    ).then(function success(response) {
                        if (response.data == 0) {
                            // //console.log("Problem occured on Image upload!!!");
                            responseStudentPhoto = '';
                            responsePhotoFullPath = '';
                        } else {
                            responseStudentPhoto = response.data.Filepath;
                            responsePhotoFullPath = response.data.DirectoryPath + response.data.Filepath;
                        }

                        var obj = {
                            Id: $scope.Id,
                            ApplicationNumber: $scope.ApplicationNumber,
                            StudentPhoto: responseStudentPhoto,
                            PhotoName: filename,
                            PhotoFullPath: responsePhotoFullPath,
                            StudentId: $scope.StudentId,
                            AdmissionNumber: $scope.AdmissionNumber,
                            AdmissionDate: $scope.AdmissionDate,
                            FirstName: $scope.FirstName,
                            MiddleName: $scope.MiddleName,
                            LastName: $scope.LastName,
                            StudentName: $scope.StudentName,
                            DOB: $scope.DOB,
                            FatherName: $scope.FatherName,
                            MotherName: $scope.MotherName,
                            GuardianName: $scope.GuardianName,
                            GenderId: $scope.Gender,
                            ReligionId: $scope.Religion,
                            CasteId: $scope.Caste,
                            CommunityId: $scope.Community,
                            MotherTongueId: $scope.MotherTongue,
                            BloodGroupId: $scope.BloodGroup,
                            IdentityMark: $scope.IdentityMark,
                            RegisterNumber: $scope.RegisterNumber,
                            SSN_UID_Number: $scope.SSN_UID_Number,
                            SMobileNumber: $scope.SMobileNumber,
                            AadharNumber: $scope.AadharNumber,
                            SEmail: $scope.SEmail,
                            AcademicYearId: $scope.AcademicYear,
                            MediumId: $scope.MediumName,
                            CourseId: $scope.Course,
                            SectionId: $scope.Section,
                            FileName: $scope.FileName,
                            Photo_Fullpath: $scope.Photo_Fullpath,
                            FOccupation: $scope.FOccupation,
                            Father_QualificationId: $scope.Father_Qualification,
                            FSSN_UID_Number: $scope.FSSN_UID_Number,
                            FMobileNumber: $scope.FMobileNumber,
                            FEmail: $scope.FEmail,
                            MOccupation: $scope.MOccupation,
                            Mother_QualificationId: $scope.Mother_Qualification,
                            MSSN_UID_Number: $scope.MSSN_UID_Number,
                            MMobileNumber: $scope.MMobileNumber,
                            MEmail: $scope.MEmail,
                            GOccupation: $scope.GOccupation,
                            Guardian_QualificationId: $scope.Guardian_Qualification,
                            GSSN_UID_Number: $scope.GSSN_UID_Number,
                            GMobileNumber: $scope.GMobileNumber,
                            GEmail: $scope.GEmail,
                            RAddress1: $scope.RAddress1,
                            RAddress2: $scope.RAddress2,
                            RAddress3: $scope.RAddress3,
                            LocationId: $scope.LocationName,
                            RDistrict: $scope.RDistrict,
                            RLandmark: $scope.RLandmark,
                            RPinCode: $scope.RPinCode,
                            StateId: $scope.StateName,
                            CountryId: $scope.CountryName,
                            CommunicationAddress: $scope.CommunicationAddress,
                            DifferentAddress: $scope.DifferentAddress,
                            PAddress1: $scope.PAddress1,
                            PAddress2: $scope.PAddress2,
                            PAddress3: $scope.PAddress3,
                            PDistrict: $scope.PDistrict,
                            PLandmark: $scope.PLandmark,
                            PPinCode: $scope.PPinCode,
                            PermanentCountryName: $scope.PermanentCountryName1,
                            PermanentCityName: $scope.PermanentCityName1,
                            PermanentStateName: $scope.PermanentStateName1,
                            AnnualIncome: $scope.AnnualIncome,
                            AccountName: $scope.AccountName,
                            AccountNumber: $scope.AccountNumber,
                            BankNameId: $scope.BankName,
                            BranchNameId: $scope.BranchName,
                            IFSC_Code: $scope.IFSC_Code,
                            MICR_Number: $scope.MICR_Number,
                            InstituteName: $scope.InstituteName,
                            YearId: $scope.Year,
                            TC_Number: $scope.TC_Number,
                            MarksObtained: $scope.MarksObtained,
                            Address: $scope.Address,
                            Remarks: $scope.Remarks,
                            MediumPreviousId: $scope.MediumPrevious,
                            CoursePreviousId: $scope.CoursePrevious,
                            Eligibility: $scope.Eligibility == "" ? 0 : $scope.Eligibility,
                            Description: $scope.Description,
                            ReferenceTypeId: $scope.ReferenceType,
                            Emp_Id: $scope.EMPId,
                            Stu_Id: $scope.Students,
                            Others_Id: $scope.OthersId,
                            DocumentId: $scope.Document,
                            FamilyDoctorName: $scope.FamilyDoctorName,
                            FamilyDoctorNumber: $scope.FamilyDoctorNumber,
                            FamilyDoctorAddress: $scope.FamilyDoctorAddress,

                            Father_CommunicationNumber: $scope.Father_CommunicationNumber,
                            Father_CommunicationEmail: $scope.Father_CommunicationEmail,
                            Father_OrganisationName: $scope.Father_OrganisationName,
                            Father_OrganisationNumber: $scope.Father_OrganisationNumber,
                            Father_OrganisationAddress: $scope.Father_OrganisationAddress,

                            Mother_CommunicationNumber: $scope.Mother_CommunicationNumber,
                            Mother_CommunicationEmail: $scope.Mother_CommunicationEmail,
                            Mother_OrganisationName: $scope.Mother_OrganisationName,
                            Mother_OrganisationNumber: $scope.Mother_OrganisationNumber,
                            Mother_OrganisationAddress: $scope.Mother_OrganisationAddress,

                            Guardian_CommunicationNumber: $scope.Guardian_CommunicationNumber,
                            Guardian_CommunicationEmail: $scope.Guardian_CommunicationEmail,
                            Guardian_OrganisationName: $scope.Guardian_OrganisationName,
                            Guardian_OrganisationNumber: $scope.Guardian_OrganisationNumber,
                            Guardian_OrganisationAddress: $scope.Guardian_OrganisationAddress,

                            HealthIssue: $scope.HealthIssue,

                            HealthIssueType: $scope.HealthIssueType,
                            IdentityMark2: $scope.IdentityMark2,
                            Remarks2: $scope.Remarks2,
                            StudentCategory: $scope.StudentCategory,
                            InstitutionId: 1
                        };
                        $http.post(baseUrl + '/addStudent', obj).then(function success(response) {
                            $scope.StudentChildId = response.data;
                            var childobj = {
                                StudentChildId: $scope.StudentChildId,
                                AcademicYearId: $scope.AcademicYear,
                                // MediumId: $scope.MediumName,
                                CourseId: $scope.Course,
                                SectionId: $scope.Section
                            }
                            $http.post(baseUrl + '/addChildDetails', childobj).then(function success(response1) {
                                if (response.data !== 0) {
                                    var statusobj = {
                                        Id: $scope.EnquiryId,
                                        StatusId: $scope.Enquiryupdatestatus

                                    }
                                    $http.post(baseUrl + '/updateStudent_Enquirystatus', statusobj).then(function success(response) {});
                                    $scope.sid = response.data;
                                    $scope.MasterId = response.data;
                                    angular.forEach($scope.AddDocument, function (value, index) {
                                        // alert("1");
                                        $scope.StudentId = $scope.MasterId
                                        ////console.log($scope.AddDocument);

                                        var filename = "";
                                        var Documentname = "";

                                        var fd = new FormData();
                                        var imgBlob;
                                        var imgBlobfile;
                                        var itemIndexLogo = -1;
                                        var itemIndexdoc = -1;
                                        //  //console.log($('#DocumentID')[index].files[index]);
                                        // if ($('#DocumentID')[index].files[0] != undefined) {
                                        //     Documentname = $('#DocumentID')[index].files[0]['name'];
                                            imgBlobfile = $scope.dataURItoBlob(value.docfile);
                                            if (itemIndexLogo == -1) {
                                                itemIndexdoc = 0;
                                            } else {
                                                itemIndexdoc = 1;
                                            }
                                        // };
                                        if (itemIndexdoc != -1) {
                                            fd.append('file1', imgBlobfile);
                                        }

                                        $http.post(baseUrl + '/uploadDocument',
                                            fd, {
                                                transformRequest: angular.identity,
                                                headers: {
                                                    'Content-Type': undefined
                                                }
                                            }
                                        ).then(function success(response) {
                                            //console.log(response.data);
                                            if (response.data == 0) {
                                                responseDocumentLocation = '';
                                                responseDocumentFullPath = '';
                                            } else {
                                                responseDocumentLocation = response.data.Filepath;
                                                responseDocumentFullPath = response.data.DirectoryPath + response.data.Filepath;
                                            }

                                            var obj = {
                                                StudentId: $scope.StudentId,
                                                DocumentTypeId: value.Id,
                                                DocumentLocation: responseDocumentLocation,
                                                DocumentName: value.DocumentFileName,
                                                DocumentFullPath: responseDocumentFullPath
                                            };
                                        
                                            $http.post(baseUrl + '/addDocumentDetails', obj).then(function success(response) {
                                                if (response.data == 0) {
                                                    //console.log("Problem occured on insertion!!!");
                                                } else {
                                                    //console.log("Inserted successfully!!!");
                                                }
                                            });
                                        });
                                        //$("#PhotoID").val('');
                                        //$("#DocumentID").val('');
                                    });
                                    $scope.AddDocument = [];
                                    $("#PhotoID").val('');
                                    $("#DocumentID").val('');
                                    $scope.studentlistsave($scope.sid);
                                } else {
                                    alert("Insert/Update Problem");
                                }

                            });
                            alert("Added/Updated successfully");
                            $state.go("ManageStudent");
                        });
                    });
                }
            }
        };
        $scope.statusfunction = function () {
            if ($scope.DifferentAddress) {
                $scope.PAddress1 = $scope.RAddress1,
                    $scope.PAddress2 = $scope.RAddress2,
                    $scope.PAddress3 = $scope.RAddress3,
                    $scope.PDistrict = $scope.RDistrict,
                    $scope.PLandmark = $scope.RLandmark,
                    $scope.PPinCode = $scope.RPinCode,
                    $scope.PermanentStateName1 = $scope.StateName,
                    $scope.PermanentCountryName1 = $scope.CountryName,
                    $scope.PermanentCityName1 = $scope.LocationName
            }
        };



        $scope.ErrorFunction = function () {
            alert("Inactive record cannot be edited");
        }

        $scope.ClearPopup = function () {
            $scope.Id = 0;
            $scope.StudentId = '';
            $scope.AdmissionNumber = '';
            $scope.AdmissionDate = '';

            $scope.FirstName = '';
            $scope.LastName = '';
            $scope.StudentName = '';
            $scope.StudentPhoto = '';
            $scope.DOB = '';
            $scope.FatherName = '';
            $scope.MotherName = '';
            $scope.GuardianName = '';
            $scope.Gender = "";
            $scope.Religion = "";
            $scope.Caste = "";
            $scope.Community = "";
            $scope.MotherTongue = "";
            $scope.BloodGroup = "";
            $scope.IdentityMark = '';
            $scope.RegisterNumber = '';
            $scope.SSN_UID_Number = '';
            $scope.SMobileNumber = '';
            $scope.SEmail = '';
            $scope.AcademicYear = "";
            $scope.Medium = "";
            $scope.Course = "";
            $scope.Section = "0";

            $scope.FOccupation = '';
            $scope.FQualification = '';
            $scope.FSSN_UID_Number = '';
            $scope.FMobileNumber = '';
            $scope.FEmail = '';
            $scope.MOccupation = '';
            $scope.MQualification = '';
            $scope.MSSN_UID_Number = '';
            $scope.MMobileNumber = '';
            $scope.MEmail = '';
            $scope.GOccupation = '';
            $scope.GQualification = '';
            $scope.GSSN_UID_Number = '';
            $scope.GMobileNumber = '';
            $scope.GEmail = '';
            $scope.RAddress1 = '';
            $scope.RAddress2 = '';
            $scope.RAddress3 = '';
            $scope.RDistrict = '';
            $scope.RPinCode = '';
            $scope.RLandmark = '';
            $scope.StateName = "";
            $scope.CountryName = "";
            $scope.LocationName = "";


            $scope.AnnualIncome = '';
            $scope.AccountName = '';
            $scope.AccountNumber = '';
            $scope.IFSC_Code = '';
            $scope.MICR_Number = '';
            $scope.BankName = "";
            $scope.BranchName = "";
            $scope.InstituteName = '';
            $scope.TC_Number = '';
            $scope.MarksObtained = '';
            $scope.Address = '';
            $scope.Remarks = '';
            $scope.Eligibility = '';
            $scope.Description = '';
            $scope.Year = "";
            $scope.ReferenceType = "1";
            $scope.Document = "";
            $scope.FirstLanguage = '';
            $scope.SecondLanguage = '';
            $scope.OthersId = "";
            $scope.$broadcast('angucomplete-alt:clearInput', 'StudentId');
            $scope.$broadcast('angucomplete-alt:clearInput', 'EmployeeId');
        };

        $scope.CancelPopup = function () {
            angular.element('#AssignRollNumberAddModal').modal('hide');
            angular.element('#EnquiryFormViewModal').modal('hide');
            $scope.ClearPopup();
        }

        $scope.studentlistsave = function (sid) {
            $state.go('ManageStudent', {
                Id: sid
            });
        };

        $scope.StudentSaveToList = function () {
            if ($stateParams.Id != undefined && $stateParams.Id > 0) {
                var data = {
                    Id: $stateParams.Id
                }

                $http.post(baseUrl + '/getStudentSingleList', data).then(function success(response) {
                    $scope.studentlist = response.data;
                });
            }
        };
      
        $scope.InActive = function (OTId) {
            $scope.Id = OTId;
            var del = confirm("Do you like to inactivate the selected detail?");
            if (del == true) {
                var data = {
                    Id: $scope.Id
                }
                $http.post(baseUrl + '/inactiveStudent', data).then(function success(response) {
                    if (response.data == 1) {
                        alert("Selected detail has been inactivated successfully");
                        $scope.studentmasterlist();
                    } else {
                        alert("An error has occurred while deleting Detail");
                        $scope.studentmasterlist();
                    }
                });
            };
        }

        $scope.Active = function (OTId) {
            $scope.Id = OTId;
            var del = confirm("Do you like to activate the selected detail?");
            if (del == true) {
                var data = {
                    Id: $scope.Id
                }
                $http.post(baseUrl + '/activeStudent', data).then(function success(response) {
                    if (response.data == 1) {
                        alert("Selected detail has been activated successfully");
                        $scope.studentmasterlist();
                    } else {
                        alert("An error has occurred while ReInserting detail");
                        $scope.studentmasterlist();
                    }
                });
            };
        }
    }
]);

OEMSController.controller("AssignRollNumberController", ['$scope', '$http', '$state', '$filter', '$stateParams', '$window', 'CommonLabelNames', 'CommonHeadingNames', 'CommonButtonNames', 'filterFilter',
    function ($scope, $http, $state, $filter, $stateParams, $window, $CommonLabelNames, $CommonHeadingNames, $CommonButtonNames, $ff) {
        if(loginFrom==0)
        {
             window.location.href = baseUrl + "/";        
        }
        $scope.InstitutionId = $window.localStorage['Institution_Id'];
        var InstObj = {
            InstitutionId: $scope.InstitutionId
        }
        //Value Initialisation
        $scope.AcademicYearId = '0';
        $scope.MediumId = '';
        $scope.CourseId = '0';
        $scope.SectionId = '';
        $scope.flag = 0;


        $scope.EditLanguageModal = function (OTId) {
            $scope.Id = OTId;

            angular.element('#AssignRollNumberAddModal').modal('show');
        }
        /* This is function for Pagination */
        $scope.listdata = [];
        $scope.current_page = 1;
        $scope.page_size = 10;
        $scope.rembemberCurrentPage = function (p) {
            $scope.current_page = p
        }
        $scope.AssignRollNumberValidations = function () {
            if (typeof ($scope.AcademicYearId) == "undefined" || $scope.AcademicYearId == "0") {
                alert("Please select Academic Year");
                return false;
            }
            else if (typeof ($scope.CourseId) == "undefined" || $scope.CourseId == "0") {
                alert("Please select Course");
                return false;
            }
            else if (typeof ($scope.MediumId) == "undefined" || $scope.MediumId == "") {
                alert("Please select Medium");
                return false;
            }
            else if (typeof ($scope.SectionId) == "undefined" || $scope.SectionId == "") {
                alert("Please select Section");
                return false;
            }
            return true;
        };

        $scope.studentlist = [];
        $scope.assignrollnumberlist = function () {
            
            if ($scope.AssignRollNumberValidations() == true) {
                $("#chatLoaderPV").show();
                var obj = {
                    MediumId: $scope.MediumId,
                    CourseId: $scope.CourseId,
                    SectionId: $scope.SectionId,
                    AcademicYearId: $scope.AcademicYearId,

                };
                $http.post(baseUrl + '/getAssignLanguageList', obj).then(function success(response) {
                    $scope.emptydata = [];
                    $scope.studentlist = [];
                    $scope.studentlist = response.data;
                    angular.forEach($scope.studentlist, function (value, index) {
                        $scope.FirstLanguageName[index] = value.Language;
                        $scope.SecondLanguageName[index] = value.LanguageName;
                    });
                    $state.go('AssignRollNumber');

                    if ($scope.studentlist.length > 0) {
                        $scope.flag = 1;
                    } else {
                        $scope.flag = 0;
                    }

                    $scope.UserId = 2;
                    $scope.exportData = $scope.studentlist;
                    // $scope.HeaderTitle = $scope.CommonTransaction_Title;
                    // $scope.schoolname = $scope.SchoolNameList[0].SchoolName;
                    // $scope.address = $scope.SchoolNameList[0].Address;
                    $scope.loginuserId = $scope.UserId;

                    $("#chatLoaderPV").hide();
                })
            }
            
        }


        $scope.getFilterHeaders = function (filterList, filterValue) {
            return $filter('filter')(filterList, function (obj) {
                if (obj.Id == filterValue)
                    return obj;
            })[0];
        };



        $scope.MediumList = [];
        $http.post(baseUrl + '/getmediumlist', InstObj).then(function success(response) {
            $scope.Mediumlist = response.data;
        });


        $scope.AcademicYearList = [];
        $http.post(baseUrl + '/getAcademicYearList',InstObj).then(function success(response) {
            $scope.AcademicYearList = $ff(response.data, {
                status: 0
            });
            $scope.AcyYear = $ff(response.data, {
                academicflag: 1
            });
            $scope.AcademicYearId = $scope.AcyYear[0].id.toString();
            $scope.AcademicYearBasedCourseFunction();
            $scope.CourseBasedSectionFunction();
        });

        $scope.SectionList = [];
        $http.post(baseUrl + '/getSectionList', InstObj).then(function success(response) {
            $scope.SectionList = response.data;
        });

        //This is Check box select function for Technical skill //

        $scope.RollNumberList = [];
        $scope.StudSelectionList = [];
        $scope.FirstLanguageName = [];
        $scope.SecondLanguageName = [];
        $scope.FirstLanguageId = [];
        $scope.SecondLanguageId = [];


        $scope.RollLanguageassign = function () {

            var cnt = ($filter('filter')($scope.studentlist, 'true')).length;
            if (cnt == 0) {
                alert("Please select atleast one student to assign Language");
            } else {
                angular.element('#AssignRollNumberAddModal').modal('show');
            }

        };


        $scope.Validationcontrols = function () {

            $scope.FirstLanguage_Name = $.grep($scope.Languagelist, function (lang) {
                return lang.Id == $scope.FirstLanguage;
            })[0].Language;
            $scope.SecondLanguage_Name = $.grep($scope.Languagelist, function (lang) {
                return lang.Id == $scope.SecondLanguage;
            })[0].Language;

            if (typeof ($scope.FirstLanguage) == "undefined" || $scope.FirstLanguage == "") {
                alert("Please select First Language");
                return false;
            } else if (typeof ($scope.SecondLanguage) == "undefined" || $scope.SecondLanguage == "") {
                alert("Please select Second Language");
                return false;
            } else if ($scope.FirstLanguage == $scope.SecondLanguage) {

                alert("First Language  " + "" + ($scope.FirstLanguage_Name) + "  and Second Language   " + "" + ($scope.SecondLanguage_Name) + "  should  not be same");
                return false;
            }

            return true;
        };

        $scope.AcademicYearBasedCourseFunction = function () {
            if ($scope.AcademicYearId == 0) {
                $http.post(baseUrl + '/getcourselist', InstObj).then(function success(response) {
                    $scope.Filter_Courselist = response.data;
                });
            } else {
                var obj = {
                    AcademicYearId: $scope.AcademicYearId,
                    InstitutionId : $scope.InstitutionId
                }
                $http.post(baseUrl + '/getAcademicYearBasedCourse', obj).then(function success(response) {
                    $scope.Filter_Courselist = response.data;
                });
            }
        }


        $scope.CourseClearFunction = function () {
            $scope.CourseId = "0";
        }

        $scope.CourseBasedSectionList = [];
        $scope.CourseBasedSectionFunction = function () {
            if ($scope.CourseId == 0) {
                $http.post(baseUrl + '/getSectionList', InstObj).then(function success(response) {

                    $scope.CourseBasedSectionList = response.data;
                });
            } else {
                var obj = {
                    AcademicYearId: $scope.AcademicYearId,
                    CourseId: $scope.CourseId
                };

                $http.post(baseUrl + '/getCourseBasedSectionList', obj).then(function success(response) {

                    $scope.CourseBasedSectionList = response.data;
                });
            }
        }


        $scope.SectionClearFunction = function () {
            $scope.SectionId = "";

        }
        $scope.AssignRollNumber_AddEdit = function () {
            if ($scope.Validationcontrols() == true) {

                //  angular.forEach($scope.RollNumberList,function(roll,index){
                //     $scope.RollNumberList[index] = $scope.RollNumber;


                // angular.forEach($scope.studentlist, function (value, index) {

                //     if ($scope.StudSelectionList[index] == 'true') {
                angular.forEach($scope.studentlist, function (selectedstudent, index) {

                    // angular.forEach($scope.Languagelist, function (language,languageindex) {
                    if (selectedstudent.selectedstudent) {

                        cnt = true;
                        
                        $scope.FirstLanguageId[index] = $scope.FirstLanguage;
                        $scope.SecondLanguageId[index] = $scope.SecondLanguage;
                        $scope.FirstLanguageName[index] = $.grep($scope.Languagelist, function (lang) {
                            return lang.Id == $scope.FirstLanguage;
                        })[0].Language;

                        $scope.SecondLanguageName[index] = $.grep($scope.Languagelist, function (lang) {
                            return lang.Id == $scope.SecondLanguage;
                        })[0].Language;

                    }
                  
                });
                // });
                $scope.CancelPopup();
                alert("Language Assigned Successfully");
            }
        };
        $scope.Historyaddedit = function () {
            angular.forEach($scope.studentlist, function (value, index) {
                var obj = {
                    StudentId: value.StudentId
               
                };

            });
            //});
        };




        $scope.AddEdit = function () {

            var cnt = ($filter('filter')($scope.studentlist, 'true')).length;
            if (cnt == 0) {
                alert("Please select atleast one student");
            } else {
                $scope.StudentRollNumber_AddEdit();
            }
        };


        $scope.rollValidationcontrols = function () {

            angular.forEach($scope.studentlist, function (value1, index1) {

                /*angular.forEach($scope.studentlist, function (value2, index2) {
                    if (value1.selectedstudent || value2.selectedstudent) {
                    if (index1 != null && value2.RollNumber == "" && $scope.studentlist.length > 1) {
                        alert("Please enter Roll No.");
                        return RollNumber;
                    }
                }
                });*/
                if (value1.selectedstudent) {
                    if (value1.rollnumber == undefined || value1.rollnumber == null) {
                        alert("Please enter Roll No.");
                        return rollnumber;
                    }
                }
            });
            return true;


        };

        $scope.DuplicateId = 0;

        $scope.Value = [];
        $scope.StudentRollNumber_AddEdit = function () {
            var duplicate = false;
            if ($scope.rollValidationcontrols() == true) {

                angular.forEach($scope.studentlist, function (selectedstudent, studentindex) {
                    if (selectedstudent.rollnumber != undefined) {
                        angular.forEach($scope.studentlist, function (loopstudent, loopostudentindex) {
                            if (selectedstudent.Id != loopstudent.Id && selectedstudent.Course == loopstudent.Course && selectedstudent.RollNumber == loopstudent.RollNumber && loopostudentindex > studentindex && selectedstudent.MediumName == loopstudent.MediumName && selectedstudent.SectionName == loopstudent.SectionName) {
                                alert("Roll No." + selectedstudent.rollnumber + " already exists for Student: " + selectedstudent.StudentName + " from " + selectedstudent.Course + "-" + selectedstudent.SectionName + "-" + selectedstudent.MediumName + ", cannot duplicate");
                                duplicate = true;
                                return false;
                            }
                        });

                    }
                });
                if (duplicate == false) {
                    $scope.StudentHistory_AddEdit();
                }

            }
        };


        $scope.StudentHistory_AddEdit = function () {
            angular.forEach($scope.studentlist, function (selectedstudent, studentindex) {

                if (selectedstudent.selectedstudent) {
                    cnt = true;
                    var obj = {
                        Id: $scope.Id,
                        AcademicYearId: $scope.AcademicYearId,
                        StudentId: selectedstudent.Id,
                        //StudentName:student.StudentName,
                        FirstLanguage: $scope.FirstLanguageId[studentindex],
                        SecondLanguage: $scope.SecondLanguageId[studentindex],
                        // RollNumber: studentindex + 1,
                        rollnumber: selectedstudent.rollnumber
                    };
                    $http.post(baseUrl + '/addStudentHistory', obj).then(function success(response) {
                        $http.post(baseUrl + '/addStudentRollNumber', obj).then(function success(response1) {
                            if (response.data !== 0) {
                                $scope.CancelPopup();
                                $sid = response.data;
                            } else {
                                alert("Insert/Update Problem");
                            }


                        });

                    });

                } //   
            });
            alert("Added/Updated successfully");
        };



        $scope.Student_AddEdit = function () {
            angular.forEach($scope.studentlist, function (selectedstudent, studentindex) {

                if (selectedstudent.selectedstudent) {
                    cnt = true;

                    var obj = {
                        Id: selectedstudent.Id,
                        // StudentName:student.StudentName,
                        FirstLanguage: $scope.FirstLanguageName[studentindex],
                        SecondLanguage: $scope.SecondLanguageName[studentindex],
                        // RollNumber: studentindex + 1,
                        rollnumber: selectedstudent.rollnumber
                    };
                    // $scope.StudentHistoryAddEdit.push(obj);
                    $http.post(baseUrl + '/addStudentRollNumber', obj).then(function success(response) {
                        if (response.data !== 0) {
                            //alert("Added/Updated successfully");
                            $scope.CancelPopup();

                            $sid = response.data;
                        } else {
                            alert("Insert/Update Problem");
                        }
                    });
                }
            });
        };

        $scope.model = {
            selectedLabelList: []
        }

        $scope.isSelectAll = function () {
            $scope.model.selectedLabelList = [];
            if ($scope.master) {
                $scope.master = true;
                for (var i = 0; i < $scope.studentlist.length; i++) {
                    $scope.model.selectedLabelList.push($scope.studentlist[i].Id);
                }
            } else {
                $scope.master = false;
            }
            angular.forEach($scope.studentlist, function (item) {
                item.selectedstudent = $scope.master;
            });
        }



        $scope.ClearPopup = function () {
            $scope.Id = 0;

            $scope.FirstLanguage = '';
            $scope.SecondLanguage = '';
        };

        $scope.CancelPopup = function () {
            angular.element('#AssignRollNumberAddModal').modal('hide');
            $scope.ClearPopup();
        }

    }
]);


OEMSController.controller("AssignEnrollmentNumberController", ['$scope', '$http', '$state', '$filter', '$stateParams', '$window', 'CommonLabelNames', 'CommonHeadingNames', 'CommonButtonNames', 'filterFilter',
    function ($scope, $http, $state, $filter, $stateParams, $window, $CommonLabelNames, $CommonHeadingNames, $CommonButtonNames, $ff) {
        if(loginFrom==0)
        {
             window.location.href = baseUrl + "/";        
        }
        $scope.InstitutionId = $window.localStorage['Institution_Id'];
        var InstObj = {
            InstitutionId: $scope.InstitutionId
        }
        //Value Initialisation
        $scope.AcademicYearId = '0';
        $scope.MediumId = '';
        $scope.CourseId = '0';
        $scope.SectionId = '';
        $scope.flag = 0;
        $scope.ExamId="0";

        $scope.EditLanguageModal = function (OTId) {
            $scope.Id = OTId;

            angular.element('#AssignEnrollmentNumberAddModal').modal('show');
        }
        /* This is function for Pagination */
        $scope.listdata = [];
        $scope.current_page = 1;
        $scope.page_size = 10;
        $scope.rembemberCurrentPage = function (p) {
            $scope.current_page = p
        }
        $scope.AssignEnrollmentNumberValidations = function () {
            if (typeof ($scope.AcademicYearId) == "undefined" || $scope.AcademicYearId == "0") {
                alert("Please select Academic Year");
                return false;
            }
            else if (typeof ($scope.CourseId) == "undefined" || $scope.CourseId == "0") {
                alert("Please select Course");
                return false;
            }
            else if (typeof ($scope.MediumId) == "undefined" || $scope.MediumId == "") {
                alert("Please select Medium");
                return false;
            }
            else if (typeof ($scope.SectionId) == "undefined" || $scope.SectionId == "") {
                alert("Please select Section");
                return false;
            }
            else if (typeof ($scope.ExamId) == "undefined" || $scope.ExamId == "0") {
                alert("Please select Exam");
                return false;
            }
            return true;
        };
        $scope.ExamNameList=[];
        $scope.CourseBasedExamNameFunction = function () {
            if ($scope.CourseId == 0) {
                $http.post(baseUrl + '/getExamNameList', InstObj).then(function success(response) {
                    $scope.ExamNameList = response.data;
                });
            } else {

                var obj = {
                    AcademicYearId: $scope.AcademicYearId,
                    CourseId: $scope.CourseId
                }
                $http.post(baseUrl + '/getCourseBasedExamList', obj).then(function success(response) {
                    $scope.ExamNameList = response.data;
                });
            }

        };
        $scope.studentlist = [];
        $scope.assignEnrollmentNumberlist = function () {
            
            if ($scope.AssignEnrollmentNumberValidations() == true) {
                $("#chatLoaderPV").show();
                var obj = {
                    MediumId: $scope.MediumId,
                    CourseId: $scope.CourseId,
                    SectionId: $scope.SectionId,
                    AcademicYearId: $scope.AcademicYearId,
                    ExamId: $scope.ExamId                    

                };
                $http.post(baseUrl + '/listEnrollmentNumber', obj).then(function success(response) {
                    $scope.emptydata = [];
                    $scope.studentlist = [];
                    $scope.studentlist = response.data;
                    //$state.go('AssignEnrollmentNumber');

                    if ($scope.studentlist.length > 0) {
                        $scope.flag = 1;
                    } else {
                        $scope.flag = 0;
                    }
                    $("#chatLoaderPV").hide();
                })
            }
            
        }

        $scope.getFilterHeaders = function (filterList, filterValue) {
            return $filter('filter')(filterList, function (obj) {
                if (obj.Id == filterValue)
                    return obj;
            })[0];
        };

        $scope.MediumList = [];
        $http.post(baseUrl + '/getmediumlist', InstObj).then(function success(response) {
            $scope.Mediumlist = response.data;
        });

        $scope.AcademicYearList = [];
        $http.post(baseUrl + '/getAcademicYearList',InstObj).then(function success(response) {
            $scope.AcademicYearList = $ff(response.data, {
                status: 0
            });
            $scope.AcyYear = $ff(response.data, {
                academicflag: 1
            });
            $scope.AcademicYearId = $scope.AcyYear[0].id.toString();
            $scope.AcademicYearBasedCourseFunction();
            $scope.CourseBasedSectionFunction();
        });

        $scope.SectionList = [];
        $http.post(baseUrl + '/getSectionList', InstObj).then(function success(response) {
            $scope.SectionList = response.data;
        });

        $scope.LanguageList = [];
        $http.post(baseUrl + '/getLanguageList', InstObj).then(function success(response) {
            $scope.Languagelist = response.data;
        });

        //This is Check box select function for Technical skill //

        $scope.EntrollmentNumberList = [];
        $scope.StudSelectionList = [];


        $scope.RollLanguageassign = function () {

            var cnt = ($filter('filter')($scope.studentlist, 'true')).length;
            if (cnt == 0) {
                alert("Please select atleast one student to assign Language");
            } else {
                angular.element('#AssignEnrollmentNumberAddModal').modal('show');
            }

        };


        $scope.Validationcontrols = function () {

            $scope.FirstLanguage_Name = $.grep($scope.Languagelist, function (lang) {
                return lang.Id == $scope.FirstLanguage;
            })[0].Language;
            $scope.SecondLanguage_Name = $.grep($scope.Languagelist, function (lang) {
                return lang.Id == $scope.SecondLanguage;
            })[0].Language;

            if (typeof ($scope.FirstLanguage) == "undefined" || $scope.FirstLanguage == "") {
                alert("Please select First Language");
                return false;
            } else if (typeof ($scope.SecondLanguage) == "undefined" || $scope.SecondLanguage == "") {
                alert("Please select Second Language");
                return false;
            } else if ($scope.FirstLanguage == $scope.SecondLanguage) {

                alert("First Language  " + "" + ($scope.FirstLanguage_Name) + "  and Second Language   " + "" + ($scope.SecondLanguage_Name) + "  should  not be same");
                return false;
            }

            return true;
        };

        $scope.AcademicYearBasedCourseFunction = function () {
            if ($scope.AcademicYearId == 0) {
                $http.post(baseUrl + '/getcourselist', InstObj).then(function success(response) {
                    $scope.Filter_Courselist = response.data;
                });
            } else {
                var obj = {
                    AcademicYearId: $scope.AcademicYearId,
                    InstitutionId : $scope.InstitutionId
                }
                $http.post(baseUrl + '/getAcademicYearBasedCourse', obj).then(function success(response) {
                    $scope.Filter_Courselist = response.data;
                });
            }
        }


        $scope.CourseClearFunction = function () {
            $scope.CourseId = "0";
        }

        $scope.CourseBasedSectionList = [];
        $scope.CourseBasedSectionFunction = function () {
            if ($scope.CourseId == 0) {
                $http.post(baseUrl + '/getSectionList', InstObj).then(function success(response) {

                    $scope.CourseBasedSectionList = response.data;
                });
            } else {
                var obj = {
                    AcademicYearId: $scope.AcademicYearId,
                    CourseId: $scope.CourseId
                };

                $http.post(baseUrl + '/getCourseBasedSectionList', obj).then(function success(response) {

                    $scope.CourseBasedSectionList = response.data;
                });
            }
        }


        $scope.SectionClearFunction = function () {
            $scope.SectionId = "";

        }
        $scope.AssignEnrollmentNumber_AddEdit = function () {
            if ($scope.Validationcontrols() == true) {

                angular.forEach($scope.studentlist, function (selectedstudent, index) {

                    // angular.forEach($scope.Languagelist, function (language,languageindex) {
                    if (selectedstudent.selectedstudent) {

                        cnt = true;
                        
                        $scope.FirstLanguageId[index] = $scope.FirstLanguage;
                        $scope.SecondLanguageId[index] = $scope.SecondLanguage;
                        $scope.FirstLanguageName[index] = $.grep($scope.Languagelist, function (lang) {
                            return lang.Id == $scope.FirstLanguage;
                        })[0].Language;

                        $scope.SecondLanguageName[index] = $.grep($scope.Languagelist, function (lang) {
                            return lang.Id == $scope.SecondLanguage;
                        })[0].Language;

                    }
                  
                });
                // });
                $scope.CancelPopup();
                alert("Language Assigned Successfully");
            }
        };
        $scope.Historyaddedit = function () {
            angular.forEach($scope.studentlist, function (value, index) {
                var obj = {
                    StudentId: value.StudentId
               
                };

            });
            //});
        };

        $scope.AddEdit = function () {

            var cnt = ($filter('filter')($scope.studentlist, 'true')).length;
            if (cnt == 0) {
                alert("Please select atleast one student");
            } else {
                $scope.StudentEnrollmentNumber_AddEdit();
            }
        };


        $scope.rollValidationcontrols = function () {

            angular.forEach($scope.studentlist, function (value1, index1) {
                if (value1.selectedstudent) {
                    if (value1.EnrollmentNumber == undefined || value1.EnrollmentNumber == null) {
                        alert("Please enter Enrollment Number");
                        return value1.EnrollmentNumber;
                    }
                }
            });
            return true;


        };

        $scope.DuplicateId = 0;

        $scope.Value = [];
        $scope.StudentEnrollmentNumber_AddEdit = function () {
            var duplicate = false;
            if ($scope.rollValidationcontrols() == true) {

                angular.forEach($scope.studentlist, function (selectedstudent, studentindex) {
                    if (selectedstudent.EnrollmentNumber != undefined) {
                        angular.forEach($scope.studentlist, function (loopstudent, loopostudentindex) {
                            if (selectedstudent.Id != loopstudent.Id && selectedstudent.Course == loopstudent.Course && selectedstudent.EnrollmentNumber == loopstudent.EnrollmentNumber && loopostudentindex > studentindex && selectedstudent.MediumName == loopstudent.MediumName && selectedstudent.SectionName == loopstudent.SectionName) {
                                alert("Enrollment No." + selectedstudent.EnrollmentNumber + " already exists for Student: " + selectedstudent.StudentName + " from " + selectedstudent.Course + "-" + selectedstudent.SectionName + "-" + selectedstudent.MediumName + ", cannot duplicate");
                                duplicate = true;
                                return false;
                            }
                        });

                    }
                });
                if (duplicate == false) {
                    $scope.StudentHistory_AddEdit();
                }

            }
        };


        $scope.StudentHistory_AddEdit = function () {
            angular.forEach($scope.studentlist, function (selectedstudent, studentindex) {

                if (selectedstudent.selectedstudent) {
                    cnt = true;
                    var obj = {
                        AcademicYearId: $scope.AcademicYearId,
                        StudentId: selectedstudent.Id,
                        ExamId:$scope.ExamId,
                        EnrollmentNumber: selectedstudent.EnrollmentNumber
                    };
                    $http.post(baseUrl + '/addStudentEnrollmentNumber', obj).then(function success(response1) {
                        if (response.data !== 0) {
                            $scope.CancelPopup();
                            $sid = response.data;
                        } else {
                            alert("Insert/Update Problem");
                        }


                    });

                } //   
            });
            alert("Added/Updated successfully");
        };



        $scope.Student_AddEdit = function () {
            angular.forEach($scope.studentlist, function (selectedstudent, studentindex) {

                if (selectedstudent.selectedstudent) {
                    cnt = true;

                    var obj = {
                        Id: selectedstudent.Id,
                        // StudentName:student.StudentName,
                        FirstLanguage: $scope.FirstLanguageName[studentindex],
                        SecondLanguage: $scope.SecondLanguageName[studentindex],
                        // RollNumber: studentindex + 1,
                        EnrollmentNumber: selectedstudent.EnrollmentNumber
                    };
                    // $scope.StudentHistoryAddEdit.push(obj);
                    $http.post(baseUrl + '/addStudentEnrollmentNumber', obj).then(function success(response) {
                        if (response.data !== 0) {
                            //alert("Added/Updated successfully");
                            $scope.CancelPopup();

                            $sid = response.data;
                        } else {
                            alert("Insert/Update Problem");
                        }
                    });
                }
            });
        };

        $scope.model = {
            selectedLabelList: []
        }

        $scope.isSelectAll = function () {
            $scope.model.selectedLabelList = [];
            if ($scope.master) {
                $scope.master = true;
                for (var i = 0; i < $scope.studentlist.length; i++) {
                    $scope.model.selectedLabelList.push($scope.studentlist[i].Id);
                }
            } else {
                $scope.master = false;
            }
            angular.forEach($scope.studentlist, function (item) {
                item.selectedstudent = $scope.master;
            });
        }



        $scope.ClearPopup = function () {
            $scope.Id = 0;

            $scope.FirstLanguage = '';
            $scope.SecondLanguage = '';
        };

        $scope.CancelPopup = function () {
            angular.element('#AssignEnrollmentNumberAddModal').modal('hide');
            $scope.ClearPopup();
        }

    }
]);

OEMSController.controller("ExamTimeTableController", ['$scope', '$http', '$state','$window','filterFilter', '$stateParams', '$filter',
    function ($scope, $http, $state,$window, $ff, $stateParams, $filter) {
        if(loginFrom==0)
        {
             window.location.href = baseUrl + "/";        
        }
        $scope.InstitutionId = $window.localStorage['Institution_Id'];
        var InstObj = {
            InstitutionId: $scope.InstitutionId
        }
        $scope.Id = 0;
        // $scope.AcademicYear = '2';
        $scope.Course = "0";
        $scope.Examination = '0';
        $scope.Subject = '';
        $scope.ExaminationDate = '';
        $scope.StartTime = '';
        $scope.EndTime = '';
        $scope.Remarks = '';

        //list page initialisation
        // $scope.AcademicYearId = '2';
        $scope.CourseId = '0';
        $scope.ExaminationId = '0';
        $scope.SubjectId = '0';
        $scope.ExamDate = '';
        // $scope.ExamStartTime = '';
        // $scope.ExamEndTime = '';
        $scope.flag = 0;
        $scope.flag4 = 0;

        /* This is function for Pagination */
        $scope.listdata = [];
        $scope.current_page = 1;
        $scope.page_size = 10;
        $scope.rembemberCurrentPage = function (p) {
            $scope.current_page = p
        }
        $scope.AcademicYearList = [];
        $http.post(baseUrl + '/getAcademicYearList', InstObj).then(function success(response) {
            $scope.AcademicYearList = response.data;
            $scope.AcyYear = $ff(response.data, {
                academicflag: 1
            });

            $scope.AcademicYear = $scope.AcyYear[0].id.toString();
            $scope.AcademicYearId = $scope.AcyYear[0].id.toString();
            $scope.Insert_AcademicYearBasedCourseFunction();

        });
        //console.log($scope.AcademicYear);
        $scope.AcademicYearBasedCourseFunction = function () {
            if ($scope.AcademicYearId == 0) {
                $http.post(baseUrl + '/getcourselist', InstObj).then(function success(response) {
                    $scope.Courselist = response.data;
                });
            } else {
                var obj = {
                    AcademicYearId: $scope.AcademicYearId,
                    InstitutionId: $scope.InstitutionId
                }
                $http.post(baseUrl + '/getAcademicYearBasedCourse', obj).then(function success(response) {
                    $scope.Courselist = response.data;
                });
            }
        };

        $scope.Insert_AcademicYearBasedCourseFunction = function () {

         
            var obj = {
                AcademicYearId: $scope.AcademicYear,
                InstitutionId: $scope.InstitutionId
            }
            //console.log(obj);
            $http.post(baseUrl + '/getAcademicYearBasedCourse', obj).then(function success(response) {

                $scope.Courselist = response.data;

            });
            // }
        };

        // $scope.AcademicYearBasedCourseFunction();
        // $scope.Insert_AcademicYearBasedCourseFunction();
        $scope.CourseBasedExamNameFunction = function () {
            if ($scope.CourseId == 0) {
                $http.post(baseUrl + '/getExamNameList', InstObj).then(function success(response) {
                    $scope.ExamNameList = response.data;
                });
            } else {

                var obj = {
                    AcademicYearId: $scope.AcademicYearId,
                    CourseId: $scope.CourseId

                }
                $http.post(baseUrl + '/getCourseBasedExamList', obj).then(function success(response) {
                    //console.log(response.data)
                    $scope.ExamNameList = response.data;
                    // //console.log($scope.ExamNameList);
                });
            }

        };
        $scope.Insert_CourseBasedExamNameFunction = function () {
         

            var obj = {
                AcademicYearId: $scope.AcademicYear,
                CourseId: $scope.Course

            }
            $http.post(baseUrl + '/getCourseBasedExamList', obj).then(function success(response) {
                //console.log(response.data)
                $scope.ExamNameList = response.data;
             
            });
          

        };
        $scope.CourseBasedExamNameFunction();

        $scope.Filter_SubjectList = [];
        $scope.ExamBasedSubjectFunction = function () {
            if ($scope.ExaminationId == 0) {
                $http.post(baseUrl + '/getSubjectNamelist', InstObj).then(function success(response) {
                    $scope.Filter_SubjectList = response.data;
                });
            } else {
                var obj = {
                    AcademicYearId: $scope.AcademicYearId,
                    CourseId: $scope.CourseId,
                    ExamNameId: $scope.ExaminationId

                }
                $http.post(baseUrl + '/getExamBasedSubjectList', obj).then(function success(response) {
                    //console.log(response.data);
                    $scope.Filter_SubjectList = response.data;

                });
            }

        };
        $scope.Insert_Validationcontrols = function () {

            if (typeof ($scope.AcademicYear) == "undefined" || $scope.AcademicYear == "0") {
                alert("Please select Academic Year");
                return false;
            } else if (typeof ($scope.Course) == "undefined" || $scope.Course == "0") {
                alert("Please select Course");
                return false;
            } else if (typeof ($scope.Examination) == "undefined" || $scope.Examination == "0") {
                alert("Please select Exam Name");
                return false;
            }

            return true;
        };
        $scope.Insert_ExamBasedSubjectFunction = function () {
            if ($scope.Insert_Validationcontrols() == true) {
                var obj = {
                    Id: $scope.Id == undefined ? 0 : $scope.Id,
                    AcademicYearId: $scope.AcademicYear,
                    CourseId: $scope.Course,
                    ExamNameId: $scope.Examination
                }
                $http.post(baseUrl + '/ExamTimeTableDuplicateCheck', obj).then(function success(response) {
                    $scope.Value = response.data;
                    angular.forEach($scope.Value, function (v, index) {
                        $scope.val = v.val;
                    })

                    if ($scope.val == 1) {
                        alert("Time Table already exists for this Course and Exam,cannot duplicate");
                        return false;
                    }
                    else
                        $scope.Add_ExamBasedSubjectFunction();
                })
            }
        };
        $scope.ExamBasedSubjectFunction();
        $scope.Add_ExamBasedSubjectFunction = function () {
            var obj = {
                AcademicYearId: $scope.AcademicYear,
                CourseId: $scope.Course,
                ExamNameId: $scope.Examination

            }
            $http.post(baseUrl + '/getExamBasedSubjectList', obj).then(function success(response) {
                $scope.SubjectList = $ff(response.data, {
                    haschild: 0
                });
                //console.log($scope.SubjectList);
            });

            // }
        };
        $scope.CourseClearFunction = function () {
            $scope.CourseId = '0';
            $scope.Course = '0';
            $scope.ExaminationId = "0";
            $scope.Examination = "0";
            $scope.SubjectList = [];
        };
        $scope.SubjectClearFunction = function () {

            $scope.SubjectList = [];
        };
        $scope.ExamNameClearFunction = function () {

            $scope.ExaminationId = "0";
            $scope.Examination = "0";
            $scope.SubjectList = [];
        };
        $scope.ExamBasedSubjectClearFunction = function () {

            $scope.SubjectId = '0';
            $scope.SubjectList = [];
        };
        $scope.ExamTimeTableSearchlistChildfn = function (obj) {


            //console.log(obj);
            $http.post(baseUrl + '/getExamTimetableList', obj).then(function success(response) {
                $http.post(baseUrl + '/getExamTimeTableSearchlistChild',obj).then(function success(Childresponse) {
                    //console.log(Childresponse.data);
                    $scope.emptydata = [];
                    $scope.ExamTimeTablelist = [];
                    $scope.ExamTimeTablelist = response.data;
                    $scope.ExamTimeTableSearchlistChild = [];
                    $scope.ExamTimeTableSearchlistChild = Childresponse.data;
                   

                    if ($scope.ExamTimeTablelist.length > 0) {
                        $scope.flag = 1;
                    } else {
                        $scope.flag = 0;
                    }


                })
            })
            // }
        }

        $scope.ExamTimeTableSearchlistChild = [];
        $scope.ExamTimeTableSearchlist = function () {
            
            if ($scope.ListValidationcontrols() == true) {
                $("#chatLoaderPV").show()
                //  alert('hi');
                var obj = {
                    AcademicYearId: $scope.AcademicYearId,
                    CourseId: $scope.CourseId,
                    ExaminationId: $scope.ExaminationId,
                    SubjectId: $scope.SubjectId
                };
                //console.log(obj);
                $scope.ExamTimeTableSearchlistChildfn(obj);
                $("#chatLoaderPV").hide();
            }
            
        }

        $scope.ListValidationcontrols = function () {
            if (typeof ($scope.AcademicYearId) == "undefined" || $scope.AcademicYearId == "0") {
                alert("Please select Academic Year");
                return false;
            }
            return true;
        };


        $scope.SubjectList = [];
        $scope.flag4 = 0;
        $scope.AddModal = function (OTId) {
            $scope.Id = OTId;
            angular.element('#ExamTimeTableAddModal').modal('show');
        }

        $scope.ViewModal = function (OTId) {
            $scope.Id = OTId;
            $scope.ExamTimetable_View();
            angular.element('#ExamTimeTableViewModal').modal('show');

        }

        $scope.EditModal = function (OTId) {
            $scope.Id = OTId;
            $scope.ExamTimetable_View();
            angular.element('#ExamTimeTableAddModal').modal('show');
        }

        $scope.Convert24to12Timeformat = function (inputTime) {
            var outputTime = null;
            if (inputTime != '' && inputTime != null) {
                inputTime = inputTime.toString(); //value to string for splitting
                var splitTime = inputTime.split(':');
                splitTime.splice(2, 1);
                var ampm = (splitTime[0] >= 12 ? ' PM' : ' AM'); //determine AM or PM
                splitTime[0] = splitTime[0] % 12;
                splitTime[0] = (splitTime[0] == 0 ? 12 : splitTime[0]); //adjust for 0 = 12
                outputTime = splitTime.join(':') + ampm;
            }
            return outputTime;
        };
        $scope.Convert12To24Timeformat = function (timeval) {
            var outputTime = null;
            if (timeval != '' && timeval != null) {
                var time = timeval;
                var hours = Number(time.match(/^(\d+)/)[1]);
                var minutes = Number(time.match(/:(\d+)/)[1]);
                var AMPM = time.match(/\s(.*)$/)[1];
                if (AMPM == "PM" && hours < 12) hours = hours + 12;
                if (AMPM == "AM" && hours == 12) hours = hours - 12;
                var sHours = hours.toString();
                var sMinutes = minutes.toString();
                if (hours < 10) sHours = "0" + sHours;
                if (minutes < 10) sMinutes = "0" + sMinutes;
                outputTime = sHours + ":" + sMinutes;
            }
            return outputTime;
        };

        $scope.flag2 = 0;
        $scope.ExamTimetable_View = function () {
            var data = {
                Id: $scope.Id
            }
            $http.post(baseUrl + '/getExamTimetableView', data).then(function success(response) {
                //console.log(response.data);

                // $scope.EnquiryDate = response.data[0].EnquiryDate;
                $scope.Id = response.data[0].id;
                $scope.mid = response.data[0].id;


                $scope.AcademicYear = response.data[0].academicyearid.toString();
                $scope.ViewAcademicYear = response.data[0].academicyear;


                $scope.Course = response.data[0].courseid.toString();
                $scope.ViewCourse = response.data[0].course;

                $scope.Examination = response.data[0].examinationid.toString();
                $scope.ViewExamination = response.data[0].examination;

                var obj = {
                    ExamTimeTableId: $scope.Id
                }
                //console.log(obj);
                $http.post(baseUrl + '/getExamTimetableChild_View', obj).then(function success(response) {
                    //console.log(response.data);

                    $scope.ViewSubjectList = response.data;


                    angular.forEach($scope.ViewSubjectList, function (value, index) {

                        value.examdate = $filter('date')(value.examdate, "dd-MMM-yyyy");
                        var startTimeSplit =  value.starttime == null ? null :value.starttime.split(":");
                        var endTimeSplit = value.endtime == null ? null :value.endtime.split(":");
                        value.ViewStartTime = $scope.Convert24to12Timeformat($filter('date')(value.starttime, "hh:mm:ss a"));
                        value.ViewEndTime = $scope.Convert24to12Timeformat($filter('date')(value.endtime, "hh:mm:ss a"));
                 
                        value.starttime = moment().hours(0).minutes(0).second(0).milliseconds(0).add(startTimeSplit[0], 'hours').add(startTimeSplit[1], 'minutes').toDate();
                        value.endtime = moment().hours(0).minutes(0).second(0).milliseconds(0).add(endTimeSplit[0], 'hours').add(endTimeSplit[1], 'minutes').toDate();

                    });
                    if ($scope.ViewSubjectList.length > 0) {
                        $scope.flag2 = 1;
                    } else {
                        $scope.flag2 = 0;
                    }
                })
                var data = {
                    AcademicYearId: $scope.AcademicYear,
                    CourseId: $scope.Course,
                    ExamNameId: $scope.Examination
                }
                $http.post(baseUrl + '/getExamTimeTableEdit', data).then(function success(response) {
                   
                    $scope.SubjectList = response.data;


                    angular.forEach($scope.SubjectList, function (value, index) {
                        //console.log($scope.SubjectList);
                        value.examdate = $filter('date')(value.examdate, "dd-MMM-yyyy");
                        var startTimeSplit =  value.starttime == null ? null :value.starttime.split(":");
                     
                        var endTimeSplit = value.endtime == null ? null :value.endtime.split(":");
                        value.ViewStartTime = $scope.Convert24to12Timeformat($filter('date')(value.starttime, "hh:mm:ss a"));
                        value.ViewEndTime = $scope.Convert24to12Timeformat($filter('date')(value.endtime, "hh:mm:ss a"));
                        value.starttime = startTimeSplit == null ? "" : moment().hours(0).minutes(0).second(0).milliseconds(0).add(startTimeSplit[0], 'hours').add(startTimeSplit[1], 'minutes').toDate();
                        value.endtime = endTimeSplit == null ? "" :moment().hours(0).minutes(0).second(0).milliseconds(0).add(endTimeSplit[0], 'hours').add(endTimeSplit[1], 'minutes').toDate();

                    });
                    if ($scope.SubjectList.length > 0) {
                        $scope.flag2 = 1;
                    } else {
                        $scope.flag2 = 0;
                    }
                })
             
            })

        };

        $scope.ListRedirect = function () {

            $state.go('ExamTimeTableList');

        }
        $scope.SubjectList = [];

        $scope.Validationcontrols = function () {
            startdate = 0;
            angular.forEach($scope.SubjectList, function (value, index) {

                if (isDate(value.examdate) == false) {

                    startdate = 1;
                }
            });

            angular.forEach($scope.SubjectList, function (value, index) {

                if (isDate(value.ExamDate) == false) {

                    startdate = 1;
                }
            });

            if (($scope.SubjectList.length) != null) {
                if (startdate == 1) {
                    alert("Exam Date is invalid date format, please enter dd-mm-yy");
                    return false
                }
            };
            ExStartTime = 0;
          

            if (typeof ($scope.AcademicYear) == "undefined" || $scope.AcademicYear == "") {
                alert("Please select Academic Year");
                return false;
            } else if (typeof ($scope.Course) == "undefined" || $scope.Course == "0") {
                alert("Please select Course");
                return false;
            } else if (typeof ($scope.Examination) == "undefined" || $scope.Examination == "0") {
                alert("Please select Exam Name");
                return false;
            }
            // else if (($scope.StartTime != "") && ($scope.EndTime != "")) {
            //     if (($scope.StatTime) > ($scope.EndTime)) {
            //         alert("Exam Start Time should not be greater than Exam End Time");
            //         return false;
            //     }
            // }
            return true;
        };

        $scope.StartTime = new Date();

        $scope.ExamTimetable_AddEdit = function () {

            if ($scope.Validationcontrols() == true) {
                var obj = {
                    Id: $scope.Id,
                    AcademicYearId: $scope.AcademicYear,
                    CourseId: $scope.Course,
                    ExaminationId: $scope.Examination

                };
                //console.log(obj);
                $http.post(baseUrl + '/addExamTimetable', obj).then(function success(response) {
                    $scope.ExamTimeTableId = response.data;
                    var ExamTimeTableId = response.data;
                    angular.forEach($scope.SubjectList, function (value, index) {


                        $scope.StartTime = $filter('date')(value.starttime, "hh:mm:ss a");
                        $scope.EndTime = $filter('date')(value.endtime, "hh:mm:ss a");

                        if(typeof(value.examdate) == "undefined" || (value.examdate == null) || typeof($scope.EndTime == '' ? null : $scope.Convert12To24Timeformat($scope.EndTime)) == null || typeof($scope.StartTime == '' ? null : $scope.Convert12To24Timeformat($scope.StartTime)) == null)
                        {
                           return false;
                        }
                        else
                        {
                            var childobj = {
                                Id: value.childid,
                                ExamTimeTableId: $scope.ExamTimeTableId,
                                SubjectId: value.id,
                                ExamDate: value.examdate,
                                StartTime: $scope.StartTime == '' ? null : $scope.Convert12To24Timeformat($scope.StartTime),
                                EndTime: $scope.EndTime == '' ? null : $scope.Convert12To24Timeformat($scope.EndTime),
                                Remarks: value.remarks
                            };
                            
                            $http.post(baseUrl + '/addExamTimetableChild', childobj).then(function success(response) {
                                //}); 
                            });
                        }
                    
                    });
                    var Filter_obj = {
                        Id: $scope.Id,
                        AcademicYearId: $scope.AcademicYear,
                        CourseId: $scope.Course,
                        ExaminationId: $scope.Examination

                    };
                    if (response.data !== 0) {
                        //console.log(response.data);
                        alert("Added/Updated successfully");
                        $scope.CancelPopup();
                        $sid = response.data;
                        //console.log($sid);
                        $scope.ExamTimetablesave(Filter_obj);
                    } else {
                        alert("Insert/Update Problem");
                    }
                });
            }
        };


        $scope.ErrorFunction = function () {
            alert("Inactive record cannot be edited");
        }

        $scope.ClearPopup = function () {


            $scope.AcademicYear = $scope.AcyYear[0].id.toString();
            $scope.AcademicYearId = $scope.AcyYear[0].id.toString();

            $scope.Course = "0";
            $scope.Examination = '0';
            $scope.Subject = '';
            $scope.ExaminationDate = '';
            $scope.StartTime = '';
            $scope.EndTime = '';
            $scope.Remarks = '';
            $scope.SubjectList = [];
            $scope.flag4 = 0;
        };

        $scope.CancelPopup = function () {
            angular.element('#ExamTimeTableAddModal').modal('hide');
            angular.element('#ExamTimeTableViewModal').modal('hide');
            $scope.ClearPopup();
        }

        $scope.ExamTimetablesave = function (Filter_obj) {
            $scope.ExamTimeTableSearchlistChildfn(Filter_obj);
        }

        $scope.InActive = function (OTId) {
            $scope.Id = OTId;
            var del = confirm("Do you like to inactivate the selected detail?");
            if (del == true) {
                var data = {
                    Id: $scope.Id
                }
                $http.post(baseUrl + '/inactiveExamTimetable', data).then(function success(response) {
                    if (response.data == 1) {
                        alert("Selected detail has been inactivated successfully");
                        $scope.ExamTimeTableSearchlist();
                    } else {
                        alert("An error has occurred while deleting Detail");
                        $scope.ExamTimeTableSearchlist();
                    }
                });
            };
        }

        $scope.Active = function (OTId) {
            $scope.Id = OTId;
            var del = confirm("Do you like to activate the selected detail?");
            if (del == true) {
                var data = {
                    Id: $scope.Id
                }
                $http.post(baseUrl + '/activeExamTimetable', data).then(function success(response) {
                    if (response.data == 1) {
                        alert("Selected detail has been activated successfully");
                        $scope.ExamTimeTableSearchlist();
                    } else {
                        alert("An error has occurred while ReInserting detail");
                        $scope.ExamTimeTableSearchlist();
                    }
                });
            };
        }

    }
]);

OEMSController.controller("GenerateHallTicketController", ['$scope', '$http', '$state','$window' ,'$filter', '$stateParams', '$window', 'CommonLabelNames', 'CommonHeadingNames', 'CommonButtonNames', 'filterFilter',
    function ($scope, $http, $state,$window, $filter, $stateParams, $window, $CommonLabelNames, $CommonHeadingNames, $CommonButtonNames, $ff) {
        if(loginFrom==0)
        {
             window.location.href = baseUrl + "/";        
        }
        $scope.InstitutionId = $window.localStorage['Institution_Id'];
        var InstObj = {
            InstitutionId: $scope.InstitutionId
        }
        $scope.Id = 0;

        //list page initialisation
        $scope.MediumId = '';
        $scope.CourseId = '';
        $scope.SectionId = "0";
        $scope.ExamNameId = "0";
        $scope.SubjectNameId = '0';
        $scope.flag = 0;
        $scope.StudentMasterList = [];

        /* This is function for Pagination */
        $scope.listdata = [];
        $scope.current_page = 1;
        $scope.page_size = 10;

        $scope.rembemberCurrentPage = function (p) {
            $scope.current_page = p
        }

        $scope.model = {
            selectedLabelList: []
        }
        $scope.previewHallTicket=function(HT_Id)
        {
            $state.go('PreviewHallTicket',
            {
                "Id": HT_Id
            });
        }
        $scope.isSelectAll = function () {
            $scope.model.selectedLabelList = [];
            if ($scope.master) {
                $scope.master = true;
                for (var i = 0; i < $scope.HallTicketList.length; i++) {
                    $scope.model.selectedLabelList.push($scope.HallTicketList[i].Id);
                }
            } else {
                $scope.master = false;
            }
            angular.forEach($scope.HallTicketList, function (item) {
                item.selectedstudent = $scope.master;
            });
        }

        $scope.SchoolNameList = [];
        $http.get('/getSchool_NameList/').then(function success(response) {
            $scope.SchoolNameList = response.data;
        });

        $scope.HallTicketList = [];

        $scope.examlistsearch = function () {
            
            if ($scope.Validationcontrols() == true) {
                $("#chatLoaderPV").show();
                var obj = {
                    AcademicYearId: $scope.AcademicYearId,
                    MediumId: $scope.MediumId,
                    CourseId: $scope.CourseId,
                    SectionId: $scope.SectionId,
                    ExamNameId: $scope.ExamNameId,
                    SubjectNameId: $scope.SubjectNameId
                };
                $http.post(baseUrl + '/GenerateHallTicketList', obj).then(function success(response) {
                    //console.log(response.data);
                    $scope.emptydata = [];
                    $scope.HallTicketList = [];
                    $scope.HallTicketList = response.data;

                    if ($scope.HallTicketList.length > 0) {
                        $scope.flag = 1;
                    } else {
                        $scope.flag = 0;
                    }
                    $("#chatLoaderPV").hide();
                });
            }
            



        };
        
        $scope.HallTicketlistsearch = function () {
            if ($scope.Validationcontrols() == true) {
                var obj = {
                    AcademicYearId: $scope.AcademicYearId,
                    MediumId: $scope.MediumId,
                    CourseId: $scope.CourseId,
                    SectionId: $scope.SectionId,
                    ExamNameId: $scope.ExamNameId,
                    SubjectNameId: $scope.SubjectNameId
                };
                $http.post(baseUrl + '/getHallTicketList', obj).then(function success(response) {
                    //console.log(response.data);
                    $scope.emptydata = [];
                    $scope.HallTicketList = [];
                    $scope.HallTicketList = response.data;

                    if ($scope.HallTicketList.length > 0) {
                        $scope.flag = 1;
                    } else {
                        $scope.flag = 0;
                    }
                });

            }

        };
        $scope.AcademicYearList = [];
        $http.post(baseUrl + '/getAcademicYearList', InstObj).then(function success(response) {
            $scope.AcademicYearList = response.data;
            $scope.AcyYear = $ff(response.data, {
                academicflag: 1
            });
            $scope.AcademicYearId = $scope.AcyYear[0].id.toString();
            $scope.AcademicYearBasedCourseFunction();
        });
        $scope.AcademicYearBasedCourseFunction = function () {
            var obj = {
                AcademicYearId: $scope.AcademicYearId,
                InstitutionId: $scope.InstitutionId
            }
            $http.post(baseUrl + '/getAcademicYearBasedCourse', obj).then(function success(response) {
                $scope.Courselist = response.data;
            });
        }
        $scope.MediumList = [];
        $http.post(baseUrl + '/getmediumlist', InstObj).then(function success(response) {
            $scope.Mediumlist = response.data;
        });

        $scope.SectionList = [];
        $http.post(baseUrl + '/getSectionList', InstObj).then(function success(response) {
            $scope.SectionList = response.data;
        });

        $scope.CourseBasedSectionList = [];
        $scope.CourseBasedSectionFunction = function () {
            var obj = {
                AcademicYearId: $scope.AcademicYearId,
                CourseId: $scope.CourseId
            };
            $http.post(baseUrl + '/getCourseBasedSectionList', obj).then(function success(response) {
                $scope.CourseBasedSectionList = response.data;
            });
        }

        $scope.CourseClearFunction = function () {
            $scope.CourseId = '';
            $scope.HallTicketList = [];
        };
        $scope.CourseBasedExamNameFunction = function () {
            var obj = {
                AcademicYearId: $scope.AcademicYearId,
                CourseId: $scope.CourseId
            }
            $http.post(baseUrl + '/getCourseBasedExamList', obj).then(function success(response) {
                $scope.ExamNameList = response.data;
            });
        };
        $scope.ExamNameClearFunction = function () {
            $scope.ExamNameId = "0";
            $scope.SectionId = "0";
            $scope.flag = 0;
            $scope.HallTicketList = [];
        };
        $scope.List_SubjectList = [];

        $scope.SubjectClearfunction = function () {
            $scope.SubjectNameId = "0";
            $scope.HallTicketList = [];
            $scope.flag = 0;
        };

        $scope.Validationcontrols = function () {
            if (typeof ($scope.AcademicYearId) == "undefined" || $scope.AcademicYearId == "0") {
                alert("Please select Academic Year");
                return false;
            } else if (typeof ($scope.CourseId) == "undefined" || $scope.CourseId == "") {
                alert("Please select Course");
                return false;
            } else if (typeof ($scope.ExamNameId) == "undefined" || $scope.ExamNameId == "0") {
                alert("Please select Exam Name");
                return false;
            }

            return true;
        };

        $scope.checkAll = function () {
            if (!$scope.selectedall) {
                $scope.selectedall = true;
            } else {
                $scope.selectedall = false;
            }
            // row in StudentList
            angular.forEach($scope.StudentList, function (row) {
                row.StudSelectionList[$index] = $scope.selectedall;
            });
        };
        $scope.StudSelection = [];
        $scope.StudSelectionList = [];
        $scope.Present = 1;
        $scope.Absent = 0;
        $scope.GenerateHallTicket_AddEdit = function () {
            if ($scope.Validationcontrols() == true) {
                angular.forEach($scope.HallTicketList, function (value, studentindex) {
                    if (value.selectedstudent == true) {
                        var obj = {
                            Id: $scope.Id,
                            StudentId: value.Id,
                            CourseId: $scope.CourseId,
                            AcademicYearId: $scope.AcademicYearId,
                            ExamNameId: $scope.ExamNameId
                        };

                        $http.post(baseUrl + '/GenerateHallTicket_AddEdit', obj).then(function success(response) {
                            $scope.FeeNameDuplicateList = response.data;
                            angular.forEach($scope.FeeNameDuplicateList, function (value, index) {
                                $scope.FeeDuplicate = value.val;
                            })
                            if ($scope.FeeDuplicate == 1) {
                                alert("Hall Ticket Already Issued");
                                return false;
                            }
                            //$scope.GenerateHallTicket();
                            
                            // alert at the end
                            if($scope.HallTicketList.length==studentindex+1)
                                alert("Hall Ticket Generated Successfully");
                        })
                    }
                });
            }
        };


        $scope.GenerateHallTicket = function () {
            angular.forEach($scope.HallTicketList, function (value, studentindex) {
                if (value.selectedstudent == true) {
                    var obj = {
                        Id: $scope.Id,
                        StudentId: value.Id,
                        CourseId: $scope.CourseId,
                        AcademicYearId: $scope.AcademicYearId,
                        ExamNameId: $scope.ExamNameId
                    };

                    $http.post(baseUrl + '/GenerateHallTicket_AddEdit', obj).then(function success(response) {
                        if (response.data !== 0) {
                            $sid = response.data;
                        } else {
                            alert("Insert/Update Problem");
                        }
                    });

                }
                // alert at the end
                if($scope.HallTicketList.length==studentindex+1)
                    alert("Hall Ticket Generated Successfully");
            });

        };
    }
]);

OEMSController.controller("PrintHallTicketController", ['$scope', '$http', '$state', '$filter', '$stateParams', '$window', 'filterFilter',
    function ($scope, $http, $state, $filter, $stateParams, $window, $ff) {
        if(loginFrom==0)
        {
             window.location.href = baseUrl + "/";        
        }
        $scope.InstitutionId = $window.localStorage['Institution_Id'];
        var InstObj = {
            InstitutionId: $scope.InstitutionId
        }
        $scope.Id = $stateParams.Id;
       // $scope.Id=4;
        //list page initialisation
        $scope.MediumId = '';
        $scope.CourseId = '';
        $scope.SectionId = "0";
        $scope.ExamNameId = "0";
        $scope.SubjectNameId = '0';
        $scope.flag = 0;
        $scope.StudentMasterList = [];

        /* This is function for Pagination */
        $scope.listdata = [];
        $scope.current_page = 1;
        $scope.page_size = 10;

        $scope.rembemberCurrentPage = function (p) {
            $scope.current_page = p
        }

        $scope.model = {
            selectedLabelList: []
        }
        $scope.previewHallTicket=function(Id)
        {
            $state.go('PreviewHallTicket', {
                Id: Id
            });
    
          //  $state.go('PreviewHallTicket');

        }
        $scope.isSelectAll = function () {
            $scope.model.selectedLabelList = [];
            if ($scope.master) {
                $scope.master = true;
                for (var i = 0; i < $scope.HallTicketList.length; i++) {
                    $scope.model.selectedLabelList.push($scope.HallTicketList[i].Id);
                }
            } else {
                $scope.master = false;
            }
            angular.forEach($scope.HallTicketList, function (item) {
                item.selectedstudent = $scope.master;
            });
        }

        $scope.HallTicketList = [];

        $scope.examlistsearch = function () {
            if ($scope.Validationcontrols() == true) {
                var obj = {
                    AcademicYearId: $scope.AcademicYearId,
                    MediumId: $scope.MediumId,
                    CourseId: $scope.CourseId,
                    SectionId: $scope.SectionId,
                    ExamNameId: $scope.ExamNameId,
                    SubjectNameId: $scope.SubjectNameId
                };
                $http.post(baseUrl + '/GenerateHallTicketList', obj).then(function success(response) {
                    console.log(response.data);
                    $scope.emptydata = [];
                    $scope.HallTicketList = [];
                    $scope.HallTicketList = response.data;

                    if ($scope.HallTicketList.length > 0) {
                        $scope.flag = 1;
                    } else {
                        $scope.flag = 0;
                    }
                });

            }

        };
        $scope.AcademicYearList = [];
        $http.post(baseUrl + '/getAcademicYearList', InstObj).then(function success(response) {
            $scope.AcademicYearList = response.data;
            $scope.AcyYear = $ff(response.data, {
                academicflag: 1
            });
            $scope.AcademicYearId = $scope.AcyYear[0].id.toString();
            $scope.AcademicYearBasedCourseFunction();
        });
        $scope.AcademicYearBasedCourseFunction = function () {
            var obj = {
                AcademicYearId: $scope.AcademicYearId,
                InstitutionId: $scope.InstitutionId
            }
            $http.post(baseUrl + '/getAcademicYearBasedCourse', obj).then(function success(response) {
                $scope.Courselist = response.data;
            });
        }
        $scope.MediumList = [];
        $http.post(baseUrl + '/getmediumlist', InstObj).then(function success(response) {
            $scope.Mediumlist = response.data;
        });

        $scope.HallTicketHeaderData = [];
        var HTObj={"HallTicketId":$scope.Id};
        $http.post(baseUrl + '/PrintHallTicket_HeaderData', HTObj).then(function success(response) {
            $scope.HallTicketHeaderData = response.data[0];
            //console.log($scope.HallTicketHeaderData);
        });
        $scope.HallTicketChildData = [];
        $http.post(baseUrl + '/PrintHallTicket_ChildData', HTObj).then(function success(response) {
            $scope.HallTicketChildData = response.data;
        });

        $scope.SectionList = [];
        $http.post(baseUrl + '/getSectionList', InstObj).then(function success(response) {
            $scope.SectionList = response.data;
        });


        $scope.PrintableHallTicketList = [];

        $scope.PrintHallTicketList1=[];
        $scope.PrintHallTicketList2=[];
    
        $scope.PrintHallTicketListSearch = function () {
            if ($scope.Validationcontrols() == true) {
                var obj = {
                    AcademicYearId: $scope.AcademicYearId,
                    // MediumId: $scope.MediumId,
                    CourseId: $scope.CourseId,
                    // SectionId: $scope.SectionId,
                    ExamNameId: $scope.ExamNameId,
                    // SubjectNameId: $scope.SubjectNameId
                };
                $http.post(baseUrl + '/PrintHallTicketList', obj).then(function success(response) {
                    //console.log(response.data);
                    $scope.emptydata = [];
                    $scope.PrintableHallTicketList = [];
                    $scope.PrintableHallTicketList = response.data;
                    $scope.StudentId = response.data[0].Id;
                });
               
    
            }
    
    
            $http.post(baseUrl + '/PrintHallTicketDetails', obj).then(function success(response) {
                $scope.PrintHallTicketList1 = [];
                $scope.PrintHallTicketList1 = response.data;
                $scope.Id = response.data[0].Id;
                
                $http.post(baseUrl + '/PrintHallTicketSubjectDetails', obj).then(function success(response) {
                    $scope.PrintHallTicketList2 = [];
                    $scope.PrintHallTicketList2 = response.data;
    
                });
    
            });
            
    
        };
    

        $scope.CourseBasedSectionList = [];
        $scope.CourseBasedSectionFunction = function () {
            var obj = {
                AcademicYearId: $scope.AcademicYearId,
                CourseId: $scope.CourseId
            };
            $http.post(baseUrl + '/getCourseBasedSectionList', obj).then(function success(response) {
                $scope.CourseBasedSectionList = response.data;
            });
        }

        $scope.CourseClearFunction = function () {
            $scope.CourseId = '';
            $scope.HallTicketList = [];
        };
        $scope.CourseBasedExamNameFunction = function () {
            var obj = {
                AcademicYearId: $scope.AcademicYearId,
                CourseId: $scope.CourseId
            }
            $http.post(baseUrl + '/getCourseBasedExamList', obj).then(function success(response) {
                $scope.ExamNameList = response.data;
            });
        };
        $scope.ExamNameClearFunction = function () {
            $scope.ExamNameId = "0";
            $scope.SectionId = "0";
            $scope.flag = 0;
            $scope.HallTicketList = [];
        };
        $scope.List_SubjectList = [];

        $scope.SubjectClearfunction = function () {
            $scope.SubjectNameId = "0";
            $scope.HallTicketList = [];
            $scope.flag = 0;
        };

        $scope.Validationcontrols = function () {
            if (typeof ($scope.AcademicYearId) == "undefined" || $scope.AcademicYearId == "0") {
                alert("Please select Academic Year");
                return false;
            } else if (typeof ($scope.CourseId) == "undefined" || $scope.CourseId == "") {
                alert("Please select Course");
                return false;
            } else if (typeof ($scope.ExamNameId) == "undefined" || $scope.ExamNameId == "0") {
                alert("Please select Exam Name");
                return false;
            }

            return true;
        };

        $scope.checkAll = function () {
            if (!$scope.selectedall) {
                $scope.selectedall = true;
            } else {
                $scope.selectedall = false;
            }
            // row in StudentList
            angular.forEach($scope.StudentList, function (row) {
                row.StudSelectionList[$index] = $scope.selectedall;
            });
        };
        $scope.StudSelection = [];
        $scope.StudSelectionList = [];
        $scope.Present = 1;
        $scope.Absent = 0;
        $scope.GenerateHallTicket_AddEdit = function () {
            if ($scope.Validationcontrols() == true) {
                angular.forEach($scope.HallTicketList, function (value, studentindex) {
                    if (value.selectedstudent == true) {
                        var obj = {
                            Id: $scope.Id,
                            StudentId: value.Id,
                            CourseId: $scope.CourseId,
                            AcademicYearId: $scope.AcademicYearId,
                            ExamNameId: $scope.ExamNameId
                        };

                        $http.post(baseUrl + '/GenerateHallTicket_AddEdit', obj).then(function success(response) {
                            $scope.FeeNameDuplicateList = response.data;
                            angular.forEach($scope.FeeNameDuplicateList, function (value, index) {
                                $scope.FeeDuplicate = value.val;
                            })
                            if ($scope.FeeDuplicate == 1) {
                                alert("Hall Ticket Already Issued");
                                return false;
                            }
                            $scope.GenerateHallTicket();
                        })
                    }
                });
            }
        };


        $scope.GenerateHallTicket = function () {
            angular.forEach($scope.HallTicketList, function (value, studentindex) {
                if (value.selectedstudent == true) {
                    var obj = {
                        Id: $scope.Id,
                        StudentId: value.Id,
                        CourseId: $scope.CourseId,
                        AcademicYearId: $scope.AcademicYearId,
                        ExamNameId: $scope.ExamNameId
                    };

                    $http.post(baseUrl + '/GenerateHallTicket_AddEdit', obj).then(function success(response) {
                        if (response.data !== 0) {
                            $sid = response.data;
                        } else {
                            alert("Insert/Update Problem");
                        }
                    });

                }
                if($scope.HallTicketList.length==studentindex+1)
                    alert("Hall Ticket Generated Successfully");
            });

        };
    }
]);
//this is for Manage Employee controller
OEMSController.controller("ManageEmployeeController", ['$scope', '$http', '$state', '$filter', '$stateParams', '$window', 'CommonLabelNames', 'CommonHeadingNames', 'CommonButtonNames', 'filterFilter',
    function ($scope, $http, $state, $filter, $stateParams, $window, $CommonLabelNames, $CommonHeadingNames, $CommonButtonNames, $ff) {
        if(loginFrom==0)
        {
             window.location.href = baseUrl + "/";        
        }
        //Value Initialization
        $scope.Id = 0;
        //$scope.Department_Id="";
        $scope.Title = '';
        $scope.FirstName = '';
        $scope.LastName = '';
        $scope.EmployeeName = '';
        $scope.EmployeeNumber = '';
        $scope.EmployeePhoto = '';
        $scope.FatherName = '';
        $scope.MotherName = '';
        $scope.Gender = '';
        $scope.DOB = null;
        $scope.DOJ = null;
        $scope.MasterQualification = '';
        $scope.EmployeeType = '';
        $scope.Experience_Years = '';
        $scope.Experience_Months = '';
        $scope.Designation = '';
        $scope.Specification = '';
        $scope.DepartmentName = '';
        $scope.MaritalStatus = "0";
        $scope.Religion = '';
        $scope.BloodGroup = '';
        $scope.SSN_UID_No = '';
        $scope.Email = '';
        $scope.Mobile = '';
        $scope.LastOrganization = '';
        $scope.OthersDesignation = '';
        $scope.OthersQualification = '';
        $scope.YearOfPassedOut = '';
        $scope.CollegedUniv = '';
        $scope.Percentage = 0;
        $scope.HouseNo = '';
        $scope.Town = '';
        $scope.LocationName = '';
        $scope.District = '';
        $scope.StateName = '';
        $scope.PinCode = '';
        $scope.CountryName = '';
        $scope.PAN_No = '';
        $scope.BankACCNo = '';
        $scope.PF_ACCNo = '';
        $scope.ESI_ACCNo = '';
        $scope.BankName = '';
        $scope.BranchName = '';
        $scope.PassportNumber = '';
        $scope.DrivingLicenseNo = '';
        $scope.IFSC_Code = '';
        $scope.AadharNo = '';
        $scope.MICR_No = '';
        $scope.Department = "";
        $scope.flag = 0;
        $scope.IsActive = "1";
        $scope.Qualification = '';
        $scope.CommonTransId = "0";
        $scope.CommonTransName = "";
        $scope.CommonTransaction_Title = "";

        $scope.StatusName = "0"
        $scope.SId = "0";


        $scope.InstitutionId =1;
        var InstObj = {
            InstitutionId: $scope.InstitutionId
        }

        $scope.getStatusEmployee = [];
        $scope.manageEnquirylist = [];
        $scope.Autofillemployee = function () {
            var data = {
                EnquiryNumber: $scope.EnquiryNumber,
                CandidateName: $scope.CandidateName,
                PositionAppliedId: $scope.PositionName,
                QualificationId: $scope.QualificationName,
                EmployeeCategoryId: $scope.EmployeeCategory,
                GenderId: $scope.GenderName,
                SpecificationId: $scope.SpecificationName,
                IsActive: $scope.IsActive
            }
            $http.post(baseUrl + '/getWorkflowStatusemployee', data).then(function success(response) {
                //console.log(response.data);
                // $scope.WorkflowStatusEmployee = response.data;

                $scope.emptydata = [];
                $scope.getStatusEmployee = $ff(response.data, {
                    status: 'Open'
                });
                $scope.manageEnquirylist = $ff(response.data, {
                    status: 'Open'
                });
                if ($scope.getStatusEmployee.length > 0) {
                    $scope.flag = 1;
                } else {
                    $scope.flag = 0;
                }
                ////console.log($scope.getStatusEmployee);
            });


        }


        $scope.dateclear1 = function () {
            $scope.DOJ = "";
            $('#DOJ').val('');
        };

        $scope.dateclear = function () {
            $scope.DOB = "";
            $('#DOB').val('');
        };



        //getCommonEnquiryList
        $scope.EnquiryList = [];
        $scope.commonenquirydetails = function () {
            // var obj = {
            //     Id: $scope.SId,
            //     StatusId: $scope.StatusName,
            //     IsActive: $scope.IsActive
            // }
            // ////console.log(obj);
            // $http.post(baseUrl + '/getCommonEnquiryList', obj).then(function success(response) {
            //     //console.log(response.data);

            //     $scope.EnquiryList = $ff(response.data, {
            //         Status: 'Open'
            //     });
            // });
            // //console.log($scope.Workflowinitialstatus);
        }


        $scope.commonenquirydetails();

        //This is for Auto fill Employee Details by selected Employee code
        $scope.AttendanceEnquiryList = function () {
            var Name = '';
            if ($scope.enquiryselected != undefined) {
                $scope.EMPId = $scope.enquiryselected.originalObject.Id;
            }
            var obj = {
                Id: $scope.EMPId
            }
            $http.post(baseUrl + '/getEnquiryView', obj).then(function success(response) {
                ////console.log(response.data);
                $scope.EnquiryId = response.data[0].Id;
                $scope.EmployeeNumber = response.data[0].EnquiryNumber;
                $scope.FirstName = response.data[0].FirstName;
                $scope.MiddleName = response.data[0].MiddleName;
                $scope.LastName = response.data[0].LastName;
                $scope.EmployeeName = response.data[0].CandidateName;
                $scope.TitleName = response.data[0].TitleId.toString();
                $scope.Title = $scope.TitleName;
                $scope.FatherName = response.data[0].FatherName;
                $scope.MotherName = response.data[0].MotherName;
                $scope.GenderName = response.data[0].GenderId.toString();
                $scope.Gender = $scope.GenderName;
                //$scope.Gender = selectedemployee.Gender;
                $scope.DOB = $filter('date')(response.data[0].DOB, "dd-MMM-yyyy");
                $scope.DOJ = $filter('date')(response.data[0].DOJ, "dd-MMM-yyyy");
                $scope.MasterQualification = response.data[0].Qualification;
                $scope.EmployeeType = response.data[0].EmployeeCategory;
                $scope.Experience_Years = response.data[0].TotExperience_Years;
                $scope.Experience_Months = response.data[0].TotExperience_Months;
                $scope.DesignationName = response.data[0].PositionAppliedId.toString();
                $scope.Designation = $scope.DesignationName;
                $scope.SpecificationName = response.data[0].SpecificationId.toString();
                $scope.Specification = $scope.SpecificationName;
                $scope.MaritalStatusName = response.data[0].MaritalStatusId.toString();
                $scope.MaritalStatus = $scope.MaritalStatusName;

                $scope.HouseNo = response.data[0].Address1;
                $scope.Town = response.data[0].Address2;
                $scope.Location = response.data[0].LocationId.toString();
                $scope.LocationName = $scope.Location;
                $scope.State = response.data[0].StateId.toString();
                $scope.StateName = $scope.State;
                $scope.Country = response.data[0].CountryId.toString();
                $scope.CountryName = $scope.Country;
                $scope.PinCode = response.data[0].PinCode;
                $scope.Status = response.data[0].StatusId.toString();
                $scope.StatusName = $scope.Status;
                $scope.Address1 = response.data[0].Address1;
                $scope.Address2 = response.data[0].Address2;
                $scope.Mobile = response.data[0].ContactNumber;

            });



        };


        $scope.Active_ErrorFunction = function () {
            alert("Relieved employee record cannot be activated");
        };


        $scope.ListValidationcontrolls = function () {
            if (typeof ($scope.EnquiryNumber) == "undefined" || $scope.employeeselected == undefined) {
                alert("Please select Enquiry no.");
                return false;
            }
            return true;
        }

        /* This is function for Pagination */
        $scope.listdata = [];
        $scope.current_page = 1;
        $scope.page_size = 10;
        $scope.rembemberCurrentPage = function (p) {
            $scope.current_page = p
        }

        $scope.EnquiryNumber = "";
        $scope.CandidateName = "";
        $scope.PositionName = "";
        $scope.QualificationName = "";
        $scope.EmployeeCategory = "";
        $scope.GenderName = "";
        $scope.SpecificationName = "";
        $scope.StatusName = "";




        $scope.getStatusEmployee = [];
        $scope.Autofillemployee = function () {
         
            
            //if($scope.ListValidationcontrolls()==true){
            var data = {
                EnquiryNumber: $scope.EnquiryNumber,
                CandidateName: $scope.CandidateName,
                PositionAppliedId: $scope.PositionName,
                QualificationId: $scope.QualificationName,
                EmployeeCategoryId: $scope.EmployeeCategory,
                GenderId: $scope.GenderName,
                SpecificationId: $scope.SpecificationName,
                IsActive: $scope.IsActive
            }
            $http.post(baseUrl + '/getWorkflowStatusemployee', data).then(function success(response) {
                //console.log(response);
                $scope.emptydata = [];
                $scope.getStatusEmployee = $ff(response.data, {
                    status: 'Open'
                });

                if ($scope.getStatusEmployee.length > 0) {
                    $scope.flag = 1;
                } else {
                    $scope.flag = 0;
                }
                ////console.log($scope.getStatusEmployee);
            });
          
            //  }
        }

        $scope.AddPrevious = [];
        /*This is array function for display default row from Previous Experience*/
        $scope.AddPrevious = [{
            'Id': $scope.ChildId,
            'CompanyName': $scope.CompanyName,
            'CompanyAddress': $scope.CompanyAddress,
            //'Start_Date': $scope.Start_Date,
            'StartDate': $filter('date')($scope.StartDate, "dd-MMM-yyyy"),
            //'End_Date': $scope.End_Date,
            'EndDate': $filter('date')($scope.EndDate, "dd-MMM-yyyy"),
            'Skills_Utilized': $scope.Skills_Utilized,
            'PrimaryResponsibility': $scope.PrimaryResponsibility
        }];


        $scope.PreviousSave = function () {

            if ($scope.PreviousRow >= 0) {
                var obj = {
                    'Id': $scope.ChildId,
                    'CompanyName': $scope.CompanyName,
                    'CompanyAddress': $scope.CompanyAddress,
                    //'Start_Date': $scope.Start_Date,
                    'StartDate': $filter('date')($scope.StartDate, "dd-MMM-yyyy"),
                    //'End_Date': $scope.End_Date,
                    'EndDate': $filter('date')($scope.EndDate, "dd-MMM-yyyy"),
                    'Skills_Utilized': $scope.Skills_Utilized,
                    'PrimaryResponsibility': $scope.PrimaryResponsibility
                }
                $scope.AddPrevious[$scope.PreviousRow] = obj;

            } else {
                $scope.AddPrevious.push({
                    'Id': $scope.ChildId,
                    'CompanyName': $scope.CompanyName,
                    'CompanyAddress': $scope.CompanyAddress,
                    //'Start_Date': $scope.Start_Date,
                    'StartDate': $filter('date')($scope.StartDate, "dd-MMM-yyyy"),
                    //'End_Date': $scope.End_Date,
                    'EndDate': $filter('date')($scope.EndDate, "dd-MMM-yyyy"),
                    'Skills_Utilized': $scope.Skills_Utilized,
                    'PrimaryResponsibility': $scope.PrimaryResponsibility
                })
            }

        };



        $scope.AddEducationalDetails = [];
        /*This is array function for display default row from Previous Experience*/
        $scope.AddEducationalDetails = [{
            'Id': $scope.EductionId,
            'QualificationId': $scope.QualificationId,
            'YearOfPassedOut': $scope.YearOfPassedOut,
            'CollegedUnivercity': $scope.CollegedUnivercity,
            'Percentage': $scope.Percentage
        }];


        $scope.EducationalDetailsSave = function () {

            if ($scope.PreviousEducationalRow >= 0) {
                var obj = {
                    'Id': $scope.EductionId,
                    'QualificationId': $scope.QualificationId,
                    'YearOfPassedOut': $scope.YearOfPassedOut,
                    'CollegedUnivercity': $scope.CollegedUnivercity,
                    'Percentage': $scope.Percentage
                }
                $scope.AddEducationalDetails[$scope.PreviousEducationalRow] = obj;

            } else {
                $scope.AddEducationalDetails.push({
                    'Id': $scope.EductionId,
                    'QualificationId': $scope.QualificationId,
                    'YearOfPassedOut': $scope.YearOfPassedOut,
                    'CollegedUnivercity': $scope.CollegedUnivercity,
                    'Percentage': $scope.Percentage
                })
            }

        };

        $scope.RemoveEducationalDetails = function (rowIndex) {
            var del = confirm("Do you like to delete Educational Details?");
            if (del == true) {
                var Previous_Item = [];

                if ($scope.Id == undefined) {
                    angular.forEach($scope.AddEducationalDetails, function (selectedPre, index) {
                        if (index != rowIndex)
                            Previous_Item.push(selectedPre);
                    });
                    $scope.AddEducationalDetails = Previous_Item;
                } else if ($scope.Id > 0) {
                    angular.forEach($scope.AddEducationalDetails, function (selectedPre, index) {
                        if (index == rowIndex) {
                            $scope.EducationId = selectedPre.EducationId;

                            $scope.EducationalDetails_Delete();
                        } else {
                            Previous_Item.push(selectedPre);
                        }
                    });
                    $scope.AddEducationalDetails = Previous_Item;
                }
            }
        };
        $scope.EducationalDetails_Delete = function () {
            var data = {
                Id: $scope.EducationId
            }
            $http.post(baseUrl + '/EducationalDetailsDelete', data).then(function success(Prevdata) {

            })
        };

        /*on click Remove in Previous Experience Filed its calling the 
             Previous Experience delete funtion */
        $scope.RemovePrevious_Item = function (rowIndex) {
            var del = confirm("Do you like to delete this Employee Experience Details?");
            if (del == true) {
                var Previous_Item = [];
                //console.log($scope.Id);
                if ($scope.Id == undefined) {
                    angular.forEach($scope.AddPrevious, function (selectedPre, index) {
                        if (index != rowIndex)
                            Previous_Item.push(selectedPre);
                    });
                    $scope.AddPrevious = Previous_Item;
                } else if ($scope.Id > 0) {
                    angular.forEach($scope.AddPrevious, function (selectedPre, index) {
                        if (index == rowIndex) {
                            $scope.ChildId = selectedPre.ChildId;
                            //console.log($scope.ChildId);
                            $scope.EmployeePrevious_Delete();
                        } else {
                            Previous_Item.push(selectedPre);
                        }
                    });
                    $scope.AddPrevious = Previous_Item;
                }
            }
        };
        $scope.EmployeePrevious_Delete = function () {
            var data = {
                ChildId: $scope.ChildId
            }
            //console.log(data);
            // $http.get(baseUrl + '/getPaperPatternDelete',data).success(function (Prevdata) {
            $http.post(baseUrl + '/getEmployeeExperienceDelete', data).then(function success(Prevdata) {
                //alert("Requirement Details deleted Successfully");

            })
        };

        $scope.EmployeeNameList = [];
        $http.get(baseUrl + '/getStaffNamelist').then(function success(response) {
            $scope.EmployeeNameList = $ff(response.data, {
                isactive: 1
            });
            //console.log($scope.EmployeeNameList);
        });

        // $scope.Autofillemployee();
        // $scope.Gender = 0;

        $scope.EmployeeAutofill = function () {
            // alert("hi");

            angular.forEach($scope.getStatusEmployee, function (selectedemployee, index) {
                angular.element('#EmployeeAddModal').modal('hide');
                $state.go('EmployeeMaster');
                $scope.EnquiryId = selectedemployee.Id;
                $scope.EmployeeNumber = selectedemployee.EnquiryNumber;
                $scope.FirstName = selectedemployee.FirstName;
                $scope.MiddleName = selectedemployee.MiddleName;
                $scope.LastName = selectedemployee.LastName;
                $scope.EmployeeName = selectedemployee.CandidateName;
                $scope.TitleName = selectedemployee.TitleId.toString();
                $scope.Title = $scope.TitleName;
                $scope.FatherName = selectedemployee.FatherName;
                $scope.MotherName = selectedemployee.MotherName;
                $scope.GenderName = selectedemployee.GenderId.toString();
                $scope.Gender = $scope.GenderName;
                // $scope.Gender = selectedemployee.Gender;
                $scope.DOB = $filter('date')(selectedemployee.DOB, "dd-MMM-yyyy");
                $scope.DOJ = $filter('date')(selectedemployee.DOJ, "dd-MMM-yyyy");
                $scope.MasterQualification = selectedemployee.Qualification;
                $scope.EmployeeType = selectedemployee.EmployeeCategory;
                $scope.Experience_Years = selectedemployee.TotExperience_Years;
                $scope.Experience_Months = selectedemployee.TotExperience_Months;
                $scope.DesignationName = selectedemployee.PositionAppliedId.toString();
                $scope.Designation = $scope.DesignationName;
                $scope.SpecificationName = selectedemployee.SpecificationId.toString();
                $scope.Specification = $scope.SpecificationName;
                $scope.MaritalStatusName = selectedemployee.MaritalStatusId.toString();
                $scope.MaritalStatus = $scope.MaritalStatusName;

                $scope.HouseNo = selectedemployee.Address1;
                $scope.Town = selectedemployee.Address2;
                $scope.Location = selectedemployee.LocationId.toString();
                $scope.LocationName = $scope.Location;
                $scope.State = selectedemployee.StateId.toString();
                $scope.StateName = $scope.State;
                $scope.Country = selectedemployee.CountryId.toString();
                $scope.CountryName = $scope.Country;
                $scope.PinCode = selectedemployee.PinCode;
                $scope.Status = selectedemployee.StatusId.toString();
                $scope.StatusName = $scope.Status;
                $scope.Address1 = selectedemployee.Address1;
                $scope.Address2 = selectedemployee.Address2;
                $scope.Mobile = selectedemployee.ContactNumber;

                //console.log($scope.Gender);
            })
            //$scope.CancelEmp_Popup


        }

        $scope.CancelEmp_Popup = function () {
            angular.element('#EmployeeAddModal').modal('hide');
        }

        $scope.SchoolNameList = [];
        $http.get('/getSchool_NameList/').then(function success(response) {
            $scope.SchoolNameList = response.data;
            // //console.log($scope.SchoolNameList);
        });


        $scope.Employeelist = [];
        $scope.manageemployeelist = function () {
            
            if ($stateParams.Id != undefined) {
                $("#chatLoaderPV").show();
                $scope.Id = $stateParams.Id;

                var obj = {
                    Id: $stateParams.Id,
                    DepartmentId: $scope.Department,
                    IsActive: $scope.IsActive
                }
                $http.post(baseUrl + '/getManageEmployeeList', obj).then(function success(response) {
                    $scope.Employeelist = response.data;
                    //console.log(response.data);
                    $state.go('ManageEmployee');
                    if ($scope.Employeelist.length > 0) {
                        $scope.flag = 1;
                    } else {
                        $scope.flag = 0;
                    }
                    $("#chatLoaderPV").hide();

                    // $scope.UserId = 2;

                    // $scope.exportData = $scope.Employeelist;
                    // $scope.HeaderTitle = $scope.fileName;
                    // $scope.schoolname = $scope.SchoolNameList[0].SchoolName;
                    // $scope.address = $scope.SchoolNameList[0].Address;
                    // $scope.loginuserId = $scope.UserId;

                    $scope.Department_Name = $scope.Employeelist[0].DepartmentName;

                });
            }
            
        }

        $scope.getFilterHeaders = function (filterList, filterValue) {
            return $filter('filter')(filterList, function (obj) {
                if (obj.Id == filterValue)
                    return obj;
            })[0];
        };


        /*calling clear function */
        $scope.ClearListfunction = function () {
            $scope.StateID = "0";
            $scope.StateName = "0";
            $scope.LocationNameId = "0";
            $scope.LocationName = "0";

        };

        /*calling clear function */
        $scope.Clearstatefunction = function () {
            $scope.LocationNameId = "0";
            $scope.LocationName = "0";

        };



        $scope.Manageemployeelist_Go = function () {
            //$state.go('EmployeeMasterList');
            $scope.manageemployeelist($stateParams.Id = 0);
        }

        $scope.EmployeeTypeList = [];
        $http.post(baseUrl + '/getEmployeeTypeList', InstObj).then(function success(response) {
            $scope.EmployeeTypeList = response.data;
        });

        $scope.GenderList = [];
        $http.post(baseUrl + '/getGenderList',InstObj).then(function success(response) {
            $scope.GenderList = response.data;
            $scope.GenderList = response.data;
        });


        $scope.CategoryList = [];
        $http.get(baseUrl + '/getCategoryList', InstObj).then(function success(response) {
            $scope.CategoryList = response.data;
        });

        $scope.QualificationList = [];
        $http.post(baseUrl + '/getQualificationList', InstObj).then(function success(response) {
            $scope.QualificationList = response.data;
        });

        $scope.TitleList = [];
        $http.post(baseUrl + '/getTitleList', InstObj).then(function success(response) {
            $scope.TitleList = response.data;
        });

        $scope.DesignationList = [];
        $http.post(baseUrl + '/getDesignationList', InstObj).then(function success(response) {
            $scope.DesignationList = response.data;
        });

        $scope.DepartmentList = [];
        $http.post(baseUrl + '/getDepartmentList', InstObj).then(function success(response) {
            $scope.DepartmentList = response.data;
            // //console.log(response.data);
        });

        $scope.SpecificationList = [];
        $http.post(baseUrl + '/getSpecificationList', InstObj).then(function success(response) {
            $scope.SpecificationList = response.data;
        });

        $scope.MaritalStatusList = [];
        $http.post(baseUrl + '/getMaritalStatusList', InstObj).then(function success(response) {
            $scope.MaritalStatusList = response.data;
        });

        $scope.ReligionList = [];
        $http.post(baseUrl + '/getReligionList', InstObj).then(function success(response) {
            $scope.ReligionList = response.data;
        });

        $scope.BloodGroupList = [];
        $http.post(baseUrl + '/getBloodGroupList', InstObj).then(function success(response) {
            $scope.BloodGroupList = response.data;
        });

        $scope.StateList = [];
        $http.post(baseUrl + '/getStateList', InstObj).then(function success(response) {
            $scope.StateList = response.data;

        });

        $scope.CountryList = [];
        $http.post(baseUrl + '/getCountryList', InstObj).then(function success(response) {
            $scope.CountryList = response.data;

        });

        $scope.LocationList = [];
        $http.post(baseUrl + '/getLocationList', InstObj).then(function success(response) {
            $scope.LocationList = response.data;

        });

        $scope.BankNameList = [];
        $http.post(baseUrl + '/getBankNameList', InstObj).then(function success(response) {
            $scope.BankNameList = response.data;
        });

        $scope.BranchList = [];
        $http.post(baseUrl + '/getBranchList', InstObj).then(function success(response) {
            $scope.BranchList = response.data;
        });


        $scope.GradeList = [];
        $http.post(baseUrl + '/getGradeList', InstObj).then(function success(response) {
            $scope.GradeList = response.data;
        });


        $scope.ManageEmplyeeDetailslist = function () {
            var obj = {
                DepartmentId: $scope.Department,
                IsActive: $scope.IsActive
            }

            $http.post(baseUrl + '/getManageEmployeeList', obj).then(function success(response) {
                $scope.Employeelist = response.data;
                //$state.go('ManageEmployee');
                if ($scope.Employeelist.length > 0) {
                    $scope.flag = 1;
                } else {
                    $scope.flag = 0;
                }
            })
        }

        $scope.ListModal = function (OTId) {
            $state.go('EmployeeMasterList', {
                Id: 0
            });
            $scope.flag1 = 1;
        }




        $scope.AddModal = function (OTId) {
            $scope.Id = OTId;
            $state.go('EmployeeMaster');
        }


        $scope.ViewModal = function (OTId) {
            //$scope.Id = OTId;
            $scope.EmployeeMaster_View();
            $state.go('EmployeeMasterView', {
                Id: OTId
            });
        }
        $scope.EditModal = function (OTId) {
            $scope.Id = OTId;
            $scope.EmployeeMaster_View();
            //$location.path("/ManageEmployee_AddEdit/" + $scope.Id); 
            $state.go('EditEmployeeMaster', {
                Id: OTId
            });
        }

        //EmployeeAddModal
        $scope.AutoFillEmployeeModal = function (OTId) {

            angular.element('#EmployeeAddModal').modal('Show');
        }
        /* $scope.EditEmployee = function (CatId) {
               $scope.Id = CatId;
               $scope.ViewEmployeeDetails();
               $location.path("/EditEmployee/" + $scope.Id);
               // window.location.href = baseUrl + "/Home/Index#/EditEmployee/" + $scope.Id;
           }; */

        $scope.EducationalDetailsFlag = 0;
        $scope.uploadphoto = "";
        $scope.EmployeeMaster_View = function () {

            if ($stateParams.Id != undefined && $stateParams.Id > 0) {

                var data = {
                    Id: $stateParams.Id
                }
                $http.post(baseUrl + '/getEmployeeMaster_View', data).then(function success(response) {
                    $scope.Id = response.data[0].id;
                    $scope.FirstName = response.data[0].firstname;
                    $scope.LastName = response.data[0].lastname;
                    $scope.EmployeeName = response.data[0].employeename;

                    $scope.Title = response.data[0].titleid.toString();
                    $scope.ViewTitle = response.data[0].title;
                    $scope.EmployeeNumber = response.data[0].employeenumber;
                    $scope.Emp_EmployeeNumber = response.data[0].emp_employeenumber;
                    $scope.EmployeePhoto = response.data[0].employeephoto;
                    $scope.uploadphoto = "/Uploads/" + response.data[0].employeephoto;
                    $scope.PhotoName = response.data[0].photoname;
                    $scope.PhotoFullPath = response.data[0].photofullpath;
                    $scope.FatherName = response.data[0].fathername;
                    $scope.MotherName = response.data[0].mothername;
                    $scope.Gender = response.data[0].genderid.toString();
                    $scope.ViewGender = response.data[0].gender;
                    // $scope.DOB = response.data[0].DOB;
                    //$scope.DOJ = response.data[0].DOJ;
                    $scope.DOB = $filter('date')(response.data[0].dob, "dd-MMM-yyyy");
                    $scope.DOJ = $filter('date')(response.data[0].doj, "dd-MMM-yyyy");
                    //$scope.MasterQualification = response.data[0].MasterQualification;   
                    $scope.EmployeeType = response.data[0].employeetypeid.toString();
                    $scope.ViewEmployeeType = response.data[0].employeetype;
                    $scope.Experience_Years = response.data[0].experience_years;
                    $scope.Experience_Months = response.data[0].experience_months;
                    $scope.Designation = response.data[0].designationid.toString();
                    $scope.ViewDesignation = response.data[0].designation;
                    $scope.Specification = response.data[0].specificationid.toString();
                    $scope.ViewSpecification = response.data[0].specification;
                    $scope.DepartmentName = response.data[0].departmentid.toString();
                    $scope.ViewDepartment = response.data[0].departmentname;
                    $scope.GradeName = response.data[0].gradeid.toString();
                    $scope.ViewGrade = response.data[0].gradename;
                    $scope.MaritalStatus = response.data[0].maritalstatusid.toString();
                    $scope.ViewMaritalStatus = response.data[0].maritalstatus;
                    $scope.Religion = response.data[0].religionid.toString();
                    $scope.ViewReligion = response.data[0].religion;
                    $scope.BloodGroup = response.data[0].bloodgroupid.toString();
                    $scope.ViewBloodGroup = response.data[0].bloodgroup;

                    //$scope.Qualification = response.data[0].QualificationId.toString();
                    //$scope.ViewQualification = response.data[0].Qualification;

                    $scope.SSN_UID_No = response.data[0].ssn_uid_no;
                    $scope.Email = response.data[0].email;
                    $scope.Mobile = response.data[0].mobile;
                    $scope.LastOrganization = response.data[0].lastorganization;
                    $scope.OthersDesignation = response.data[0].othersdesignation;
                    $scope.OthersQualification = response.data[0].othersqualification;
                    $scope.YearOfPassedOut = response.data[0].yearofpassedout;
                    $scope.CollegedUniv = response.data[0].collegeduniv;
                    $scope.Percentage = response.data[0].percentage;
                    $scope.HouseNo = response.data[0].houseno;
                    $scope.Town = response.data[0].town;
                    $scope.LocationName = response.data[0].locationnameid.toString();
                    $scope.ViewLocationName = response.data[0].locationname;
                    // $scope.District = response.data[0].District;
                    $scope.StateName = response.data[0].stateid.toString();
                    $scope.ViewState = response.data[0].statename;
                    $scope.PinCode = response.data[0].pincode;
                    $scope.CountryName = response.data[0].countryid.toString();
                    $scope.ViewCountry = response.data[0].countryname;
                    $scope.PAN_No = response.data[0].pan_no;
                    $scope.BankACCNo = response.data[0].bankaccno;
                    $scope.PF_ACCNo = response.data[0].pf_accno;
                    $scope.ESI_ACCNo = response.data[0].esi_accno;

                    $scope.BankName = response.data[0].banknameid.toString();
                    $scope.ViewBankName = response.data[0].bankname;

                    $scope.BranchName = response.data[0].branchnameid.toString();
                    $scope.ViewBranchName = response.data[0].branchname;

                    $scope.PassportNumber = response.data[0].passportnumber;
                    $scope.DrivingLicenseNo = response.data[0].drivinglicenseno;
                    $scope.IFSC_Code = response.data[0].ifsc_code;
                    $scope.AadharNo = response.data[0].aadharno;
                    $scope.MICR_No = response.data[0].micr_no;
                    $scope.ResignationDate = $filter('date')(response.data[0].ResignationDate, "dd-MMM-yyyy");
                    $scope.LastWorkingDay = $filter('date')(response.data[0].LastWorkingDay, "dd-MMM-yyyy");
                    $scope.FB_AC = response.data[0].fb_ac;
                    $scope.Linked_In = response.data[0].linked_in;
                    $scope.Googleplus = response.data[0].googleplus;
                    $scope.GTalk = response.data[0].gtalk;
                    $scope.Whatsapp = response.data[0].whatsapp;
                    $scope.Twitter = response.data[0].twitter;
                    $scope.Others1 = response.data[0].others1;
                    $scope.Others2 = response.data[0].others2;
                    $scope.Address1 = response.data[0].address1;
                    $scope.Address2 = response.data[0].address2;

                    var sel = {
                        Id: response.data[0].empid,
                        Employee: response.data[0].employee,
                        // Employee: response.data[0].Employee
                    };
                    $scope.DisplayFullName = sel;


                    $scope.$broadcast('angucomplete-alt:changeInput', 'ex1', $scope.EmployeeNumber);

                    // $scope.$broadcast('angucomplete-alt:changeInput', 'ex1', $scope.ViewName);
                    $scope.$broadcast('angucomplete-alt:changeInput', 'ex2', $scope.ViewStudentName);

                    $http.post(baseUrl + '/getEmployee_PreviousDetailsView', data).then(function success(response) {
                        //console.log(response.data);

                        $scope.AddPrevious = [];
                        $scope.AddPrevious = $ff(response.data, {
                            isactive: 1
                        });
                        angular.forEach($scope.AddPrevious, function (v, index) {
                            v.StartDate = $filter('date')(response.data[0].startdate, "dd-MMM-yyyy");
                            v.EndDate = $filter('date')(response.data[0].enddate, "dd-MMM-yyyy");
                        });
                        if ($scope.AddPrevious.length > 0) {
                            $scope.flag1 = 1;
                        } else {
                            $scope.flag1 = 0;
                        }



                    });

                    $http.post(baseUrl + '/EducationalDetails_View', data).then(function success(response) {

                        //console.log(response.data);
                        $scope.AddEducationalDetails = [];
                        $scope.AddEducationalDetails = response.data;

                        if ($scope.AddEducationalDetails.length > 0) {
                            $scope.EducationalDetailsFlag = 1;
                        } else {
                            $scope.EducationalDetailsFlag = 0;
                        }

                    });
                })
            }
        };



        /* Read file name for the  Photo and file */
        $scope.logoChange = function () {

            if ($('#EmployeePhoto')[0].files[0] != undefined) {
                $scope.FileName = $('#EmployeePhoto')[0].files[0]['name'];
            }
        }

        $scope.uploadImage = function (Photo) {
            var filename = "";
            //var fd = new FormData();
            if ($('#EmployeePhoto')[0].files[0] != undefined) {
                filename = $('#EmployeePhoto')[0].files[0]['name'];
                //var imgBlob = $scope.dataURItoBlob($scope.CompanyLogo);
                //fd.append('file', imgBlob);
            }
        }

        $scope.EmployeeListRedirect = function () {

            $state.go('ManageEmployee');

        }


        $scope.Validationcontrols = function () {

            var from = 0;
            angular.forEach($scope.AddPrevious, function (value, index) {


                if ((ParseDate(value.StartDate)) > (ParseDate(value.EndDate))) {
                    from = 1;
                }
            });


            startdate = 0;
            angular.forEach($scope.AddPrevious, function (value, index) {

                if (isDate(value.StartDate) == false) {

                    startdate = 1;
                }
            });

            enddate = 0;
            angular.forEach($scope.AddPrevious, function (value, index) {

                if (isDate(value.EndDate) == false) {
                    enddate = 1;
                }
            });
            if (($scope.AddPrevious.length) != null) {
                if (startdate == 1) {
                    alert("Start date is invalid date format, please enter dd-mm-yy");
                    return false
                }
            };

            if (($scope.AddPrevious.length) != null) {
                if (enddate == 1) {
                    alert("End date is invalid date format, please enter dd-mm-yy");
                    return false
                }
            };

            if (($scope.AddPrevious.length) != null) {

                if (from == 1) {

                    alert("Please enter Start date is greater than End date");
                    return false;
                }
            }
            // if (typeof ($scope.EmployeeNumber) == "undefined" || $scope.EmployeeNumber == "") {
            //     alert("Please select Enquiry No.");
            //     return false;
            // } else 
            if (typeof ($scope.Emp_EmployeeNumber) == "undefined" || $scope.Emp_EmployeeNumber == "") {
                alert("Please enter Employee No.");
                return false;
            } else if (typeof ($scope.Title) == "undefined" || $scope.Title == 0) {
                alert("Please select Title");
                return false;
            } else if (typeof ($scope.FirstName) == "undefined" || $scope.FirstName == 0) {
                alert("Please enter First Name");
                return false;
            } else if (typeof ($scope.LastName) == "undefined" || $scope.LastName == 0) {
                alert("Please enter Last Name");
                return false;
            }
            // else if (typeof ($scope.EmployeeNumber) == "undefined" || $scope.EmployeeNumber == 0) {
            //     alert("Please enter Employee No.");
            //     return false;
            // }
            else if (typeof ($scope.Gender) == "undefined" || $scope.Gender == 0) {
                alert("Please select Gender");
                return false;
            } else if (typeof ($scope.DOB) == "undefined" || $scope.DOB == 0) {
                alert("Please select DOB");
                return false;
            } else if (typeof ($scope.DOJ) == "undefined" || $scope.DOJ == 0) {
                alert("Please select DOJ");
                return false;
            } 
            // else if (typeof ($scope.GradeName) == "undefined" || $scope.GradeName == 0) {
            //     alert("Please select Grade");
            //     return false;
            // } 
            else if (typeof ($scope.EmployeeType) == "undefined" || $scope.EmployeeType == 0) {
                alert("Please select Employee Type");
                return false;
            }
            //  else if (typeof ($scope.Specification) == "undefined" || $scope.Specification == 0) {
            //     alert("Please select Specification");
            //     return false;
            // } 
            else if (typeof ($scope.Designation) == "undefined" || $scope.Designation == 0) {
                alert("Please select Designation");
                return false;
            } else if (typeof ($scope.DepartmentName) == "undefined" || $scope.DepartmentName == 0) {
                alert("Please select Department");
                return false;
            } else if (typeof ($scope.MaritalStatus) == "undefined" || $scope.MaritalStatus == 0) {
                alert("Please select Marital Status");
                return false;
            } 
            // else if (typeof ($scope.Religion) == "undefined" || $scope.Religion == 0) {
            //     alert("Please select Religion");
            //     return false;
            // } 
            // else if (typeof ($scope.BloodGroup) == "undefined" || $scope.BloodGroup == 0) {
            //     alert("Please select Blood Group");
            //     return false;
            // } 
            else if (typeof ($scope.Mobile) == "undefined" || $scope.Mobile == 0) {
                alert("Please enter Contact No.");
                return false;
            } else if (typeof ($scope.Address1) == "undefined" || $scope.Address1 == "") {
                alert("Please enter Address1");
                return false;
            } else if (typeof ($scope.Address2) == "undefined" || $scope.Address2 == "") {
                alert("Please enter Address2");
                return false;
            } else if (typeof ($scope.CountryName) == "undefined" || $scope.CountryName == 0) {
                alert("Please select Country");
                return false;
            } else if (typeof ($scope.StateName) == "undefined" || $scope.StateName == 0) {
                alert("Please select State");
                return false;
            }
            // else if (typeof ($scope.District) == "undefined" || $scope.District == 0) {
            //     alert("Please enter District");
            //     return false;
            // }
            else if (typeof ($scope.LocationName) == "undefined" || $scope.LocationName == 0) {
                alert("Please select City");
                return false;
            }  else if (typeof ($scope.PinCode) == "undefined" || $scope.PinCode == 0) {
                alert("Please enter Pin Code");
                return false;
            } 
            // else if (typeof ($scope.BankACCNo) == "undefined" || $scope.BankACCNo == 0) {
            //     alert("Please enter Bank A/C No.");
            //     return false;
            // } else if (typeof ($scope.BankName) == "undefined" || $scope.BankName == 0) {
            //     alert("Please select Bank Name");
            //     return false;
            // } else if (typeof ($scope.BranchName) == "undefined" || $scope.BranchName == 0) {
            //     alert("Please select Branch Name");
            //     return false;
            // }
             else if (isDate($scope.DOB) == false) {
                alert("Please enter the Proper Date Format for DOB");
                return false;
            } else if (isDate($scope.DOJ) == false) {
                alert("Please enter the Proper Date Format for DOJ");
                return false;
            } else if (EmailFormate($scope.Email) == false) {
                alert("Email is in invalid format");
                return false;
            }
            return true;
        };

        $scope.Joiningdatecalculation = function () {

            $scope.Today_Date = $filter('date')(new Date(), 'DD-MMM-YYYY');
            $scope.Join_Day = moment(ParseDate($scope.Today_Date).subtract(18, 'years')).format("DD-MMM-YYYY");
            // //console.log($scope.Join_Day);

            if ((ParseDate($scope.DOB)) > (ParseDate($scope.Join_Day))) {
                alert("Please enter valid date for Date of Birth");
                return false;
            }
            return true;
            if (parseDate($scope.Join_Day <= 17)) {
                alert("Joining should be greater than birthdate ");
                return false;
            }

        };


        /* Clear the uploaded image */
        $scope.imageclear = function () {
            $scope.CompanyLogo = "";
            $scope.FileName = "";
            $scope.uploadme = "";
            $scope.uploadphoto = "";
            $('#companyphoto').val('');
        };

        //This is for Document file clear functions//
        $scope.fileclear = function () {
            $('#documentfile').val = ('');
            $scope.DocFileName = "";
        };

        /*This is for getting a file url for uploading the url into the database*/
        $scope.dataURItoBlob = function (dataURI) {
            var binary = atob(dataURI.split(',')[1]);
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            var array = [];
            for (var i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
            }
            return new Blob([new Uint8Array(array)], {
                type: mimeString
            });
        }
        //This is for change photo function//
        $scope.photoChange = function () {

            if ($('#PhotoID')[0].files[0] != undefined) {
                $scope.FileName = $('#PhotoID')[0].files[0]['name'];
            }
        }

        //This is for file change function//
        $scope.docfileChange = function () {

            if ($('#ResumeID')[0].files[0] != undefined) {
                $scope.ResumeFileName = $('#ResumeID')[0].files[0]['name'];
            }
        }

        //this is for image upload function//
        $scope.uploadImage = function (Photo) {
            var filename = "";
            if ($('#PhotoID')[0].files[0] != undefined) {
                filename = $('#PhotoID')[0].files[0]['name'];
            }
        }


        $scope.ManageEmployee_AddEdit = function () {

            if ($scope.employeeselected != undefined) {
                $scope.EMPId = $scope.employeeselected.originalObject.Id;
            }
            if ($scope.enquiryselected != undefined) {
                $scope.EmployeeNo = $scope.enquiryselected.originalObject.Id;
            }
            //console.log($scope.EmployeeNo);
            var filename = "";
            var Licensefilename = "";

            var fd = new FormData();
            var imgBlob;
            var imgBlobfile;
            var itemIndexLogo = -1;
            var itemIndexdoc = -1;

            var fd = new FormData();
            if ($('#companyphoto')[0].files[0] != undefined) {
                filename = $('#companyphoto')[0].files[0]['name'];
                imgBlob = $scope.dataURItoBlob($scope.uploadphoto);
                itemIndexLogo = 0;
            }

            if (itemIndexLogo != -1) {
                fd.append('file', imgBlob);
            }

            if (itemIndexdoc != -1) {
                fd.append('file1', imgBlobfile);
            }

            $scope.EmployeePhoto = '';
            $http.post(baseUrl + '/PhotoEmployee',
                fd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                }
            ).then(function success(response) {
                if (response.data == 0) {
                    //console.log("Problem occured on Image upload!!!");
                    responseEmployeePhoto = '';
                    responsePhotoFullPath = '';
                } else {
                    responseEmployeePhoto = response.data.Filepath;

                    responsePhotoFullPath = response.data.DirectoryPath + response.data.Filepath;
                }
                if ($scope.Validationcontrols() == true) {
                    if ($scope.Joiningdatecalculation() == true) {
                        var obj = {
                            Id: $scope.Id,
                            TitleId: $scope.Title,
                            FirstName: $scope.FirstName,
                            LastName: $scope.LastName,
                            EmployeeNumber: $scope.EmployeeNumber,
                            Emp_EmployeeNumber: $scope.Emp_EmployeeNumber,
                            //    EmployeeNumber: $scope.EmployeeNo,
                            EmployeePhoto: responseEmployeePhoto,
                            PhotoName: filename,
                            PhotoFullPath: responsePhotoFullPath,
                            FatherName: $scope.FatherName,
                            MotherName: $scope.MotherName,
                            GenderId: $scope.Gender,
                            DOB: $scope.DOB,
                            DOJ: $scope.DOJ,
                            Reporting_To: $scope.EMPId,
                            QualificationId: $scope.Qualification,
                            EmployeeTypeId: $scope.EmployeeType,
                            Experience_Years: $scope.Experience_Years,
                            Experience_Months: $scope.Experience_Months,
                            DesignationId: $scope.Designation,
                            SpecificationId: $scope.Specification,
                            DepartmentId: $scope.DepartmentName,
                            GradeId: $scope.GradeName,
                            MaritalStatusId: $scope.MaritalStatus,
                            ReligionId: $scope.Religion,
                            BloodGroupId: $scope.BloodGroup,
                            SSN_UID_No: $scope.SSN_UID_No,
                            Email: $scope.Email,
                            Mobile: $scope.Mobile,
                            LastOrganization: $scope.LastOrganization,
                            OthersDesignation: $scope.OthersDesignation,
                            OthersQualification: $scope.OthersQualification,
                            YearOfPassedOut: $scope.YearOfPassedOut,
                            CollegedUniv:1,
                            Percentage: $scope.Percentage,
                            HouseNo: $scope.HouseNo,
                            Town: $scope.Town,
                            LocationNameId: $scope.LocationName,
                            District: $scope.District,
                            StateId: $scope.StateName,
                            PinCode: $scope.PinCode,
                            CountryId: $scope.CountryName,
                            PAN_No: $scope.PAN_No,
                            BankACCNo: $scope.BankACCNo,
                            PF_ACCNo: $scope.PF_ACCNo,
                            ESI_ACCNo: $scope.ESI_ACCNo,
                            BankNameId: $scope.BankName,
                            BranchNameId: $scope.BranchName,
                            PassportNumber: $scope.PassportNumber,
                            DrivingLicenseNo: $scope.DrivingLicenseNo,
                            IFSC_Code: $scope.IFSC_Code,
                            AadharNo: $scope.AadharNo,
                            MICR_No: $scope.MICR_No,
                            FB_AC: $scope.FB_AC,
                            Linked_In: $scope.Linked_In,
                            Googleplus: $scope.Googleplus,
                            GTalk: $scope.GTalk,
                            Whatsapp: $scope.Whatsapp,
                            Twitter: $scope.Twitter,
                            Others1: $scope.Others1,
                            Others2: $scope.Others2,
                            Address1: $scope.Address1,
                            Address2: $scope.Address2
                        };
                        //console.log(obj);
                        $http.post(baseUrl + '/addManageEmployee', obj).then(function success(response) {
                            $scope.EmployeeId = response.data;
                            $scope.MasterId = response.data;

                            angular.forEach($scope.AddPrevious, function (value, index) {
                                //console.log($scope.AddPrevious);
                                var Previousobj = {
                                    Id: value.ChildId,
                                    EmployeeId: $scope.EmployeeId,
                                    CompanyName: value.CompanyName,
                                    CompanyAddress: value.CompanyAddress,
                                    StartDate: value.StartDate,
                                    EndDate: value.EndDate,
                                    Skills_Utilized: value.Skills_Utilized,
                                    PrimaryResponsibility: value.PrimaryResponsibility
                                }
                                //console.log(Previousobj);
                                $http.post(baseUrl + '/getaddEmployee_PreviousDetails', Previousobj).then(function success(response) {
                                    $scope.previousflag = 'role';


                                });
                            });
                            angular.forEach($scope.AddEducationalDetails, function (value1, index1) {

                                var Educationalobj = {
                                    Emp_Education_Id: value1.EducationId,
                                    EmployeeId: $scope.EmployeeId,
                                    QualificationId: value1.QualificationId,
                                    YearOfPassedOut: value1.YearOfPassedOut,
                                    CollegedUnivercity: value1.CollegedUnivercity,
                                    Percentage: value1.Percentage
                                }
                                //console.log(Educationalobj);
                                $http.post(baseUrl + '/addEmployee_EducationalDetails', Educationalobj).then(function success(response) {
                                    // $scope.previousflag = 'role';


                                });
                            });
                            if (response.data !== 0) {
                                var statusobj = {
                                    Id: $scope.EnquiryId,
                                    StatusId: $scope.Enquiryupdatestatus

                                }
                                //console.log(statusobj);
                                $http.post(baseUrl + '/getupdate_Enquirystatus', statusobj).then(function success(response) {});
                                alert("Added/Updated successfully");
                                //console.log(response.data);
                                //$scope.CancelPopup();
                                $sid = response.data;
                                
                                // $state.go('ManageEmployee', {
                                //     Id: $sid
                                // });
                                 $state.go('ManageEmployee');
                            }
                            // else {
                            //     alert("Insert/Update Problem");
                            // }
                        });
                    }
                }
            });

        };
        $scope.Employeelistsave = function (eid) {

            //console.log($stateParams.Id);
            $stateParams.Id = eid;

            $state.go('ManageEmployee', {
                Id: eid
            })
        };


        $scope.EmployeeSaveToList = function () {


            if ($stateParams.Id != undefined && $stateParams.Id > 0) {

                var data = {
                    Id: $stateParams.Id
                }

                $http.post(baseUrl + '/getEmployeeMaster_View', data).then(function success(response) {
                    $scope.Employeelist = response.data;
                });
            }
        }


        //  /*calling clear function */
        // $scope.ClearListfunction = function () {
        //     $scope.StateID = "0";
        //     $scope.StateName = "0";
        //     $scope.LocationNameId = "0";
        //     $scope.LocationName = "0";

        // };

        // /*calling clear function */
        // $scope.Clearstatefunction = function () {
        //     $scope.LocationNameId = "0";
        //     $scope.LocationName = "0";

        // };

        $scope.ErrorFunction = function () {
            alert("Inactive record cannot be edited");
        }

        $scope.ClearPopup = function () {
            $scope.Id = 0;
            $scope.Title = '';
            $scope.FirstName = '';
            $scope.LastName = '';
            //$scope.EmployeeName = '';
            $scope.EmployeeNumber = '';
            $scope.EmployeePhoto = '';
            $scope.FatherName = '';
            $scope.MotherName = '';
            $scope.Gender = '';
            $scope.DOB = null;
            $scope.DOJ = null;
            $scope.MasterQualification = '';
            $scope.EmployeeType = '';
            $scope.Experience_Years = '';
            $scope.Experience_Months = '';
            $scope.Designation = '';
            $scope.Specification = '';
            $scope.DepartmentName = '';
            $scope.MaritalStatus = "0";
            $scope.Religion = '';
            $scope.BloodGroup = '';
            $scope.SSN_UID_No = '';
            $scope.Email = '';
            $scope.Mobile = '';
            $scope.LastOrganization = '';
            $scope.OthersDesignation = '';
            $scope.OthersQualification = '';
            $scope.YearOfPassedOut = '';
            $scope.CollegedUniv = '';
            $scope.Percentage = 0;
            $scope.HouseNo = '';
            $scope.Town = '';
            $scope.LocationName = '';
            $scope.District = '';
            $scope.StateName = '';
            $scope.PinCode = '';
            $scope.CountryName = '';
            $scope.PAN_No = '';
            $scope.BankACCNo = '';
            $scope.PF_ACCNo = '';
            $scope.ESI_ACCNo = '';
            $scope.BankName = '';
            $scope.BranchName = '';
            $scope.PassportNumber = 0;
            $scope.DrivingLicenseNo = '';
            $scope.IFSC_Code = '';
            $scope.AadharNo = '';
            $scope.MICR_No = '';
            $scope.Department = '';

        };

        $scope.CancelPopup = function () {
            angular.element('#AcademicYearAddModal').modal('hide');
            angular.element('#ManageEmployeeViewModal').modal('hide');
            $scope.ClearPopup();
        }


        $scope.InActive = function (OTId) {
            $scope.Id = OTId;
            var del = confirm("Do you like to inactivate the selected detail?");
            if (del == true) {
                var data = {
                    Id: $scope.Id
                }
                $http.post(baseUrl + '/inactiveEmployee', data).then(function success(response) {
                    if (response.data == 1) {
                        alert("Selected detail has been inactivated successfully");
                        $scope.manageemployeelist();
                    } else {
                        alert("An error has occurred while deleting Detail");
                        $scope.manageemployeelist();
                    }
                });
            };
        }

        $scope.Active = function (OTId) {
            $scope.Id = OTId;
            var del = confirm("Do you like to activate the selected detail?");
            if (del == true) {
                var data = {
                    Id: $scope.Id
                }
                $http.post(baseUrl + '/activeEmployee', data).then(function success(response) {
                    if (response.data == 1) {
                        alert("Selected detail has been activated successfully");
                        $scope.manageemployeelist();
                    } else {
                        alert("An error has occurred while ReInserting detail");
                        $scope.manageemployeelist();
                    }
                });
            };
        }
        $scope.Employee_Delete = function (OTId) {
            $scope.EmployeeId = OTId;
            var del = confirm("Do you like to delete the selected detail?");
            if (del == true) {
                var data = {
                    EmployeeId: $scope.EmployeeId
                }
                $http.post(baseUrl + '/EmployeeDelete', data).then(function success(response) {
                    //console.log(response.data);
                    if (response.data[0].val == 2) {
                        alert("Employee Details has been deleted successfully");
                        $scope.manageemployeelist();
                    } else if (response.data[0].val == 1) {
                        alert("Employee Already used in Manage Logins");
                        $scope.manageemployeelist();
                    }

                });
            };
        }
        //Employee Relieve Process
        $scope.ValidationcontrolsExit = function () {

            //if (typeof ($scope.Employee_No) == '' || $scope.BranchSelected == undefined) {
            //    alert("Please select Employee");
            //    return false;
            //}
            if (typeof ($scope.Resignation_Date) == "undefined" || $scope.Resignation_Date == "") {
                alert("Please select Resignation Date");
                return false;
            } else if (typeof ($scope.ReasonLeaving_Type) == "undefined" || $scope.ReasonLeaving_Type == 0) {
                alert("Please select Reason Leaving Type");
                return false;
            } else if (typeof ($scope.Notice_Period) == "undefined" || $scope.Notice_Period == 0) {
                alert("Please enter Notice Period");
                return false;
            } else if (typeof ($scope.Leaving_Reason) == "undefined" || $scope.Leaving_Reason == "") {
                alert("Please enter Leaving Reason");
                return false;
            } else if (typeof ($scope.Last_Working_Day) == "undefined" || $scope.Last_Working_Day == "") {
                alert("Please select Last Working Day");
                return false;
            }
            //else if ((ParseDate($scope.Last_Working_Day)) < (ParseDate($scope.Resignation_Date))) {
            //    alert("Please select Last Working day greater than or equal to Resignation day");
            //    return false;
            //}
            else if ((ParseDate($scope.Payment_Date)) < (ParseDate($scope.Last_Working_Day))) {
                alert("Please select Payment day greater than or equal to Last working day");
                return false;
            } else if ((ParseDate($scope.Payment_Date)) < (ParseDate($scope.Resignation_Date))) {
                alert("Please select Payment day greater than or equal to Resignation day");
                return false;
            } else if (isDate($scope.Resignation_Date) == false) {
                alert("Resignation Date is invalid date format, please enter dd-mm-yy");
                return false;
            }
            //else if (isDate($scope.Last_Working_Day) == false) {
            //    alert("Last Working Day is invalid date format, please enter dd-mm-yy");
            //    return false;
            //}
            else if (isDate($scope.Payment_Date) == false) {
                alert("Payment Date is invalid date format, please enter dd-mm-yy");
                return false;
            }

            return true;

        };


        $scope.EmployeeNameList_By_Id = function () {

            var obj = {
                Id: $scope.Id
            }
            $http.post(baseUrl + '/getEmpNameList', obj).then(function success(response) {

                //console.log(response.data);

                //  $scope.Employee_Id = data.Id;
                $scope.Employee_No = response.data[0].employeenumber;
                $scope.Employee_Name = response.data[0].employeename;
                $scope.Department_Name = response.data[0].departmentname;
                $scope.Designation_Name = response.data[0].designation;
            });
        };

        $scope.ValidationcontrolsExit = function () {

            //if (typeof ($scope.Employee_No) == '' || $scope.BranchSelected == undefined) {
            //    alert("Please select Employee");
            //    return false;
            //}
            if (typeof ($scope.ResignationDate) == "undefined" || $scope.ResignationDate == "") {
                alert("Please select Resignation Date");
                return false;
            } else if (typeof ($scope.ReasonLeaving_Type) == "undefined" || $scope.ReasonLeaving_Type == 0) {
                alert("Please select Reason Leaving Type");
                return false;
            } else if (typeof ($scope.Notice_Period) == "undefined" || $scope.Notice_Period == 0) {
                alert("Please enter Notice Period");
                return false;
            } else if (typeof ($scope.Leaving_Reason) == "undefined" || $scope.Leaving_Reason == "") {
                alert("Please enter Leaving Reason");
                return false;
            } else if (typeof ($scope.LastWorkingDay) == "undefined" || $scope.LastWorkingDay == "") {
                alert("Please select Last Working Day");
                return false;
            }
            //else if ((ParseDate($scope.Last_Working_Day)) < (ParseDate($scope.Resignation_Date))) {
            //    alert("Please select Last Working day greater than or equal to Resignation day");
            //    return false;
            //}
            else if ((ParseDate($scope.Payment_Date)) < (ParseDate($scope.Last_Working_Day))) {
                alert("Please select Payment day greater than or equal to Last working day");
                return false;
            } else if ((ParseDate($scope.Payment_Date)) < (ParseDate($scope.ResignationDate))) {
                alert("Please select Payment day greater than or equal to Resignation day");
                return false;
            } else if (isDate($scope.ResignationDate) == false) {
                alert("Resignation Date is invalid date format, please enter dd-mm-yy");
                return false;
            } else if (isDate($scope.LastWorkingDay) == false) {
                alert("Last Working Day is invalid date format, please enter dd-mm-yy");
                return false;
            } else if (isDate($scope.Payment_Date) == false) {
                alert("Payment Date is invalid date format, please enter dd-mm-yy");
                return false;
            }

            return true;

        };

        $scope.ReasonLeaving_Type = "0";
        $scope.RelieveReasonList = [];
        // $http.get(baseUrl + '/getRelieveReasonTypeList').then(function success(response) {
        //     $scope.RelieveReasonList = response.data;
        // });


        /* Open the create pop up window */
        $scope.AddEmployeeReleivePopUP = function (LPH) {
            $scope.Id = LPH;
            $scope.EmployeeMaster_ExitView();
            angular.element('#EmployeeReleiveModal').modal('show');
        }
        $scope.EmployeeMaster_ExitView = function () {


            var data = {
                Id: $scope.Id
            }
            $http.post(baseUrl + '/getEmployeeMaster_View', data).then(function success(response) {

                //console.log(response.data);

                $scope.Id = response.data[0].id;
                $scope.EmployeeName = response.data[0].employeename;



                $scope.Designation = response.data[0].designationid.toString();
                $scope.ViewDesignation = response.data[0].designation;

                $scope.DepartmentName = response.data[0].departmentid.toString();
                $scope.ViewDepartment = response.data[0].departmentname;


            })

        };
        $scope.RelievePopup_Close = function () {

            angular.element('#EmployeeReleiveModal').modal('hide');
        };

        //Calling api method for Update Employee Record set inactive //
        $scope.EmployeeDetails_Relieve = function () {
            // $scope.calculateRelievingDate();
            //return
            if ($scope.ValidationcontrolsExit() == true) {


                var obj = {
                    Id: $scope.Id,
                    RelieveResonTypeId: $scope.ReasonLeaving_Type,
                    ResignationDate: $scope.ResignationDate,
                    NoitcePeriod: $scope.Notice_Period,
                    LeavingReason: $scope.LeavingReason,
                    LastWorkingDay: $scope.LastWorkingDay,
                    Remarks: $scope.Remarks == "" ? null : $scope.Remarks,
                    PaymentDate: $scope.Payment_Date == "" ? null : $scope.Payment_Date,
                };

                //console.log(obj);
                $http.post(baseUrl + '/getEmployeeRelieve', obj).then(function success(response) {
                    alert("Selected employee relieved successfully");
                    $scope.ClearRelieveEmp_Popup();
                    angular.element('#EmployeeReleiveModal').modal('hide');
                    $scope.manageemployeelist();

                });

            }
        };


        //This is for Last working day field auto fill calculation//
        $scope.calculateRelievingDate = function () {
            //if ($scope.Last_Working_Day == '')
            {
                //if(!(angular.isDate($filter('date')(new Date(new Date($scope.Resignation_Date).getTime() + $scope.Notice_Period * 24 * 60 * 60 * 1000), 'dd-MMM-yyyy')))) {
                //$scope.Last_Working_Day = $filter('date')(new Date(new Date($scope.Resignation_Date).getTime() + $scope.Notice_Period * 24 * 60 * 60 * 1000), 'dd-MMM-yyyy');
                $scope.LastWorkingDay = moment(ParseDate($scope.ResignationDate).add('d', $scope.Notice_Period)).format("DD-MMM-YYYY");
                //$scope.Last_Working_Day = $filter('date')(new Date(ParseDate($scope.Resignation_Date).add('days', $scope.Notice_Period)));
            }


        }


        //This is for clear function//
        $scope.ClearRelieveEmp_Popup = function () {
            // $scope.EmployeeNameList = [];
            // $scope.LastWorkingDay = "";
            //$scope.Employee_Id = "";

            $scope.Employee_Name = "";
            $scope.Department_Name = "";
            $scope.Designation_Name = "";
            $scope.ResignationDate = "";
            $scope.ReasonLeaving_Type = "0";
            $scope.Leaving_Reason = "";
            $scope.Notice_Period = "";
            $scope.Remarks = "";
            $scope.Payment_Date = "";
            $scope.LastWorkingDay = "";
            $scope.$broadcast('angucomplete-alt:clearInput', 'ex1');
        };


    }
]);

//Exams
OEMSController.controller("PaperPatternController", ['$scope', '$http', '$state','$window', '$filter', '$stateParams', '$window', 'CommonLabelNames', 'CommonHeadingNames', 'CommonButtonNames', 'filterFilter',
    function ($scope, $http, $state,$window, $filter, $stateParams, $window, $CommonLabelNames, $CommonHeadingNames, $CommonButtonNames, $ff) {
        // Values Initialization for Paper Pattern
        if(loginFrom==0)
        {
             window.location.href = baseUrl + "/";        
        }
        
        $scope.InstitutionId = $window.localStorage['Institution_Id'];
        var InstObj = {
            InstitutionId: $scope.InstitutionId
        }

        // $scope.AcademicYear = "0";
        $scope.AddQuestions = "-1";
        $scope.Id = 0;
        $scope.Course = "0";
        $scope.MediumName = "0";
        $scope.ExamName = "0";
        $scope.SubjectName = "0";
        $scope.QuestionPaperSection = "";
        $scope.NumberofQuestions = '';
        $scope.Answers = '';
        $scope.Marks = '';
        $scope.Remarks = '';
        // $scope.AddQuestions=[];
        $scope.PreviousRow = "-1";
        // Value Initialization for Question Bank
        // $scope.QBAcademicYear = "2";
        $scope.QBCourse = "";
        $scope.QBMedium = "";
        $scope.QBExamName = "";
        $scope.QBSubject = "";
        $scope.QBQuestionPaperSection = "0";
        $scope.PaperType = "";
        $scope.Questions = '';

        // Filter Function Initialisation
        // $scope.AcademicYearId = "0";
        $scope.CourseId = "0";
        $scope.SubjectId = "0";
        $scope.ExamNameId = "0";

        $scope.QBCourseId = "";
        $scope.QBExamNameId = "";
        $scope.PaperTypeId = "";

        $scope.flag = 0;
        $scope.flag1 = 0;
        $scope.IsActive = "1";

        $scope.AddModal = function (OTId) {
            $scope.Id = OTId;
            angular.element('#PaperPatternAddModal').modal('show');
        }

        $scope.ViewModal = function (OTId) {
            $scope.Id = OTId;
            $scope.PaperPattern_View();
            angular.element('#PaperPatternViewModal').modal('show');
        }

        $scope.EditModal = function (OTId) {
            $scope.Id = OTId;
            $scope.PaperPattern_View();
            angular.element('#PaperPatternAddModal').modal('show');
        }

        $scope.QuestionBankRedirect = function () {
            $state.go('QuestionBankList');
        }

        $scope.PaperPatternRedirect = function () {
            $state.go('PaperPattern');
        }
        /* This is function for Pagination */
        $scope.listdata = [];
        $scope.current_page = 1;
        $scope.page_size = 10;
        $scope.rembemberCurrentPage = function (p) {
            $scope.current_page = p
        }


        $scope.MediumList = [];
        $http.post(baseUrl + '/getmediumlist', InstObj).then(function success(response) {
            $scope.Mediumlist = response.data;
            $scope.Medium_list = $ff(response.data, {
                isactive: 1
            });
        });
        $scope.QuestionSectionList = [];
        $http.post(baseUrl + '/getQuestionSectionList', InstObj).then(function success(response) {
            //console.log(response.data);
            $scope.QuestionSectionList = $ff(response.data, {
                isactive: 1
            });
            //console.log($scope.QuestionSectionList);
        });

        $scope.QuestionSectionList = [];
        $http.post(baseUrl + '/getQuestionSectionList', InstObj).then(function success(response) {
            //console.log(response.data);
            $scope.QuestionSectionList = $ff(response.data, {
                isactive: 1
            });
            //console.log($scope.QuestionSectionList);
        });

        $scope.AcademicYearList = [];
        $http.post(baseUrl + '/getAcademicYearList', InstObj).then(function success(response) {
            $scope.AcademicYearList = response.data;
            $scope.AcyYear = $ff(response.data, {
                academicflag: 1
            });
            $scope.AcademicYearId = $scope.AcyYear[0].id.toString();
            $scope.AcademicYear = $scope.AcyYear[0].id.toString();
            $scope.AcademicYearBasedCourseFunction();
            $scope.AcademicYearBasedCourseForAddmodal();
        });


        $scope.PaperTypeList = [];
        $http.post(baseUrl + '/getPaperTypeList', InstObj).then(function success(response) {
            $scope.PaperTypeList = response.data;
        });

        $scope.Filter_Courselist = [];
        $scope.Filter_ExamNameList = [];
        $scope.Filter_SubjectList = [];
        $scope.AcademicYearBasedCourseFunction = function () {
            if ($scope.AcademicYearId == 0) {
                $http.post(baseUrl + '/getcourselist', InstObj).then(function success(response) {

                    $scope.Filter_Courselist = response.data;
                });
            } else {
                var obj = {
                    AcademicYearId: $scope.AcademicYearId,
                    InstitutionId: $scope.InstitutionId
                }
                $http.post(baseUrl + '/getAcademicYearBasedCourse', obj).then(function success(response) {

                    $scope.Filter_Courselist = response.data;

                });
            }
        }

        $scope.CourseClearFunction = function () {
            $scope.CourseId = '0';
        };

        $scope.CourseBasedExamNameFunction = function () {

            if ($scope.CourseId == 0) {
                $http.post(baseUrl + '/getExamNameList',InstObj).then(function success(response) {
                    $scope.Filter_ExamNameList = response.data;

                });
            } else {

                var obj = {
                    AcademicYearId: $scope.AcademicYearId,
                    CourseId: $scope.CourseId

                }
                $http.post(baseUrl + '/getCourseBasedExamList', obj).then(function success(response) {
                    $scope.Filter_ExamNameList = response.data;
                });
            }

        };
        $scope.ExamNameClearFunction = function () {
            $scope.ExamNameId = '0';
        };

        $scope.ExamBasedSubject = function () {
            if ($scope.ExamNameId == 0) {
                $http.get(baseUrl + '/getSubjectNamelist').then(function success(response) {
                    $scope.Filter_SubjectList = response.data;
                });
            } else {
                var obj = {
                    AcademicYearId: $scope.AcademicYearId,
                    CourseId: $scope.CourseId,
                    ExamNameId: $scope.ExamNameId
                }
                $http.post(baseUrl + '/getExamBasedSubjectList_Timetable', obj).then(function success(response) {
                    $scope.Filter_SubjectList = response.data;
                });
            }

        };

        $scope.AcademicYearBasedCourseForAddmodal = function () {
            // if ($scope.AcademicYear == 0) {
            //     $http.get(baseUrl + '/getcourselist').then(function success(response) {
            //         $scope.Courselist = response.data;
            //     });
            // } else {
            var obj = {
                AcademicYearId: $scope.AcademicYear,
                InstitutionId: $scope.InstitutionId
            }
            $http.post(baseUrl + '/getAcademicYearBasedCourse', obj).then(function success(response) {
                $scope.Courselist = response.data;
            });
            // }
        }
        $scope.CourseClearFun = function () {
            $scope.Course = '0';
        }
        $scope.CourseBasedExamNameForAddmodal = function () {

            if ($scope.Course == 0) {
                $http.post(baseUrl + '/getExamNameList', InstObj).then(function success(response) {
                    $scope.ExamNameList = response.data;
                });
            } else {

                var obj = {
                    AcademicYearId: $scope.AcademicYear,
                    CourseId: $scope.Course

                }

                $http.post(baseUrl + '/getCourseBasedExamList', obj).then(function success(response) {

                    $scope.ExamNameList = response.data;

                });
            }

        };
        $scope.ExamNameClearFun = function () {

            $scope.ExamName = '0';
        }
        $scope.ExamBasedSubjectforAddmodal = function () {

            if ($scope.ExamName == 0) {
                $http.get(baseUrl + '/getSubjectNamelist').then(function success(response) {
                    $scope.SubjectList = response.data;
                });

            } else {

                var obj = {
                    AcademicYearId: $scope.AcademicYear,
                    CourseId: $scope.Course,
                    ExamNameId: $scope.ExamName

                }

                $http.post(baseUrl + '/getExamBasedSubjectList_Timetable', obj).then(function success(response) {

                    $scope.SubjectList = $ff(response.data, {
                        haschild: 0
                    });
                });
            }

        };


        $scope.flag = 0;
        $scope.rowcollection = [];
        $scope.PaperPatternlist = function () {
            $("#chatLoaderPV").show();
            $scope.emptydata = [];
            $scope.rowcollection = [];
            var obj = {
                AcademicYearId: $scope.AcademicYearId,
                CourseId: $scope.CourseId,
                SubjectId: $scope.SubjectId,
                ExamNameId: $scope.ExamNameId,
                IsActive: $scope.IsActive
            };
            $scope.filteredPaperPatternSearch(obj);
            $("#chatLoaderPV").hide();
        }
        $scope.List_Validationcontrols = function () {

            if (typeof ($scope.AcademicYearId) == "undefined" || $scope.AcademicYearId == "0") {
                alert("Please select Academic Year");
                return false;
            }

            return true;
        };
        $scope.filteredPaperPatternSearch = function (obj) {
            if ($scope.List_Validationcontrols() == true) {
                $http.post(baseUrl + '/getPaperPatternList', obj).then(function success(response) {

                    $http.post(baseUrl + '/getPaperPatternchildlist', obj).then(function success(response1) {
                        $scope.emptydata = [];
                        $scope.rowcollection = [];
                        $scope.rowcollection = response.data;

                        $scope.PaperPatternchildlist = [];
                        $scope.PaperPatternchildlist = response1.data;

                        $state.go('PaperPattern');

                        if ($scope.rowcollection.length > 0) {
                            $scope.flag = 1;
                        } else {
                            $scope.flag = 0;
                        }


                        $scope.fileName = "Paper Pattern";
                        $scope.exportData = [];
                        $scope.childData = [];
                        // $scope.Export_AcademicYear = $filter('filter')($scope.CommontransactionList, {
                        //     Name: "AcademicYear"
                        // })[0].Value;

                        // $scope.SerialNumber = $filter('filter')($scope.CommontransactionList, {
                        //     Name: "SerialNumber"
                        // })[0].Value;
                        // $scope.Export_Course = $filter('filter')($scope.CommontransactionList, {
                        //     Name: "Course"
                        // })[0].Value;

                        // $scope.Export_Medium = $filter('filter')($scope.CommontransactionList, {
                        //     Name: "Medium"
                        // })[0].Value;

                        // $scope.Export_ExamName = $filter('filter')($scope.CommontransactionList, {
                        //     Name: "ExamName"
                        // })[0].Value;

                        // $scope.Export_SubjectName = $filter('filter')($scope.CommontransactionList, {
                        //     Name: "SubjectName"
                        // })[0].Value;

                        // $scope.Export_QuestionperSection = $filter('filter')($scope.CommontransactionList, {
                        //     Name: "QuestionPaperSection"
                        // })[0].Value;

                        // $scope.Export_NoOfQuestions = $filter('filter')($scope.CommontransactionList, {
                        //     Name: "NoofQuestions"
                        // })[0].Value;


                        // $scope.Export_Answers = $filter('filter')($scope.CommontransactionList, {
                        //     Name: "Answers"
                        // })[0].Value;


                        // $scope.Export_Marks = $filter('filter')($scope.CommontransactionList, {
                        //     Name: "Marks"
                        // })[0].Value;

                        // $scope.Export_Status = $filter('filter')($scope.CommontransactionList, {
                        //     Name: "Status"
                        // })[0].Value;




                        // $scope.headerData = [{
                        //         title: $scope.SerialNumber,
                        //         dataKey: "Id",
                        //         datamode: "Single"
                        //     },
                        //     {
                        //         title: $scope.Export_Course,
                        //         dataKey: "Course",
                        //         datamode: "Single"
                        //     },
                        //     {
                        //         title: $scope.Export_Medium,
                        //         dataKey: "MediumName",
                        //         datamode: "Single"
                        //     },

                        //     {
                        //         title: $scope.Export_ExamName,
                        //         dataKey: "ExamName",
                        //         datamode: "Single"
                        //     },
                        //     {
                        //         title: $scope.Export_SubjectName,
                        //         dataKey: "SubjectName",
                        //         datamode: "Single"
                        //     },

                        //     {
                        //         title: $scope.Export_QuestionperSection,
                        //         dataKey: "Id,PaperPatterenId",
                        //         datamode: "Multiple"
                        //     },
                        //     {
                        //         title: $scope.Export_QuestionperSection,
                        //         dataKey: "QuestionPaperSection",
                        //         datamode: "Multiple"
                        //     },
                        //     {
                        //         title: $scope.Export_NoOfQuestions,
                        //         dataKey: "NumberofQuestions",
                        //         datamode: "Multiple"
                        //     },


                        //     {
                        //         title: $scope.Export_Answers,
                        //         dataKey: "Answers",
                        //         datamode: "Multiple"
                        //     },


                        //     {
                        //         title: $scope.Export_Marks,
                        //         dataKey: "Marks",
                        //         datamode: "Multiple"
                        //     },
                        // ];


                        // $scope.filterdata = [

                        //     {
                        //         title: $scope.Export_AcademicYear,
                        //         dataKey: ($scope.getFilterHeaders($scope.AcademicYearList, $scope.AcademicYearId)).AcademicYear
                        //     },

                        //     {
                        //         title: $scope.Export_Course,
                        //         dataKey: ($scope.getFilterHeaders($scope.Filter_Courselist, $scope.CourseId)) == undefined ? "" : ($scope.getFilterHeaders($scope.Filter_Courselist, $scope.CourseId)).Course
                        //     },

                        //     {
                        //         title: $scope.Export_ExamName,
                        //         dataKey: ($scope.getFilterHeaders($scope.Filter_ExamNameList, $scope.ExamNameId)) == undefined ? "" : ($scope.getFilterHeaders($scope.Filter_ExamNameList, $scope.ExamNameId)).ExamName
                        //     },
                        //     {
                        //         title: $scope.Export_SubjectName,
                        //         dataKey: ($scope.getFilterHeaders($scope.Filter_SubjectList, $scope.SubjectId)) == undefined ? "" : ($scope.getFilterHeaders($scope.Filter_SubjectList, $scope.SubjectId)).SubjectName
                        //     },
                        //     {
                        //         title: $scope.Export_Status,
                        //         dataKey: $scope.IsActive == 1 ? "Active" : $scope.IsActive == 0 ? "InActive" : "All"

                        //     }

                        // ];


                        // $scope.UserId = 2;
                        // $scope.exportData = $scope.rowcollection;
                        // $scope.childData = $scope.PaperPatternchildlist;

                        // $scope.HeaderTitle = $scope.fileName;
                        // $scope.schoolname = $scope.SchoolNameList[0].SchoolName;
                        // $scope.address = $scope.SchoolNameList[0].Address;
                        $scope.loginuserId = $scope.UserId;


                    })
                })
            }
        }
        $scope.getFilterHeaders = function (filterList, filterValue) {
            return $filter('filter')(filterList, function (obj) {
                if (obj.Id == filterValue)
                    return obj;
            })[0];
        };

        $scope.Validationcontrols = function () {

            var TSDuplicate = 0;
            var DuplicateSkills = '';
            angular.forEach($scope.AddQuestions, function (value1, index1) {
                angular.forEach($scope.AddQuestions, function (value2, index2) {
                    if (index1 > index2 && value1.questionpapersectionid == value2.questionpapersectionid) {
                        TSDuplicate = 1;
                        DuplicateSkills = DuplicateSkills + $scope.GetQuesSecName(value2.questionpapersectionid) + ',';
                    };
                    if (index1 != null && value2.questionpapersectionid == null && $scope.AddQuestions.length > 1) {
                        alert("Please select Question Paper Section");
                        return false;
                    }

                });
            });

            angular.forEach($scope.AddQuestions, function (value1, index1) {

                angular.forEach($scope.AddQuestions, function (value2, index2) {

                    if (index1 != null && value2.numberofquestions == null && $scope.AddQuestions.length > 1) {

                        alert("Please enter No.Of Questions");
                        return false;

                    }

                });
            });

            angular.forEach($scope.AddQuestions, function (value1, index1) {
                angular.forEach($scope.AddQuestions, function (value2, index2) {
                    if (index1 != null && value2.answers == null && $scope.AddQuestions.length > 1) {
                        alert("Please enter Answers");
                        return false;
                    }
                });
            });
            angular.forEach($scope.AddQuestions, function (value1, index1) {
                angular.forEach($scope.AddQuestions, function (value2, index2) {
                    if (index1 != null && value2.marks == null && $scope.AddQuestions.length > 1) {
                        alert("Please enter Marks");
                        return false;
                    }
                });
            });
            var TSitem = 0;

            angular.forEach($scope.AddQuestions, function (value, index) {
                if (value.questionpapersectionid > 0) {
                    TSitem = 1;
                }
            });
            var NumberItem = 0;
            angular.forEach($scope.AddQuestions, function (value, index) {
                if (value.numberofquestions > 0) {
                    NumberItem = 1;
                }
            });
            var AnswerItem = 0;
            angular.forEach($scope.AddQuestions, function (value, index) {
                if (value.answers > 0) {
                    AnswerItem = 1;
                }
            });
            var MarkItem = 0;
            angular.forEach($scope.AddQuestions, function (value, index) {
                if (value.marks > 0) {
                    MarkItem = 1;
                }
            });
            var from = 0;
            angular.forEach($scope.AddQuestions, function (value, index) {
                if (parseInt(value.numberofquestions) < parseInt(value.answers)) {
                    from = 1;
                }
            });
            if (($scope.AddQuestions.length) != null) {
                if (from == 1) {
                    alert("Answers cannot be greater than No. of Questions");
                    return false;
                }
            }
            if (typeof ($scope.AcademicYear) == "undefined" || $scope.AcademicYear == "0") {
                alert("Please select Academic Year");
                return false;
            } else if (typeof ($scope.Course) == "undefined" || $scope.Course == "0") {
                alert("Please select Course");
                return false;
            }
            if (typeof ($scope.MediumName) == "undefined" || $scope.MediumName == "") {
                alert("Please select Medium");
                return false;
            } else if (typeof ($scope.ExamName) == "undefined" || $scope.ExamName == "0") {
                alert("Please select Exam Name");
                return false;
            } else if (typeof ($scope.SubjectName) == "undefined" || $scope.SubjectName == "0") {
                alert("Please select Subject Name");
                return false;
            } else if ($scope.AddQuestions.length < 1 || TSitem == 0) {
                alert("Please select Question paper Section");
                return false;
            } else if ($scope.AddQuestions.length < 1 || NumberItem == 0) {
                alert("Please enter No. of Questions");
                return false;
            } else if ($scope.AddQuestions.length < 1 || AnswerItem == 0) {
                alert("Please enter Answers");
                return false;
            } else if ($scope.AddQuestions.length < 1 || MarkItem == 0) {
                alert("Please enter Mark/Question");
                return false;
            } else if (TSDuplicate == 1) {
                alert('Question Paper Section' + ' ' + 'cannot be Duplicate');
                return false;
            }
            return true;
        };

        $scope.GetQuesSecName = function (skill) {
            var skillId = skill;
            var skill_Name = "";
            skill_Name = $.grep($scope.QuestionSectionList, function (skill) {
                return skill.id == skillId;
            })[0].technical_skill;

            return skill_Name;
        }
        $scope.DuplicateId = 0;

        $scope.Value = [];
        $scope.PaperPattern_AddEdit = function () {

            if ($scope.AcademicYear != "") {

                var obj = {
                    Id: $scope.Id == undefined ? 0 : $scope.Id,

                    AcademicYearId: $scope.AcademicYear,
                    CourseId: $scope.Course,
                    MediumId: $scope.MediumName,
                    ExamNameId: $scope.ExamName,
                    SubjectId: $scope.SubjectName
                }

                $http.post(baseUrl + '/getAcademicYearCouExamSubDuplicate', obj).then(function success(response) {
                    $scope.Value = response.data;

                    angular.forEach($scope.Value, function (v, index) {
                        $scope.val = v.val;
                    })

                    if ($scope.val == 1) {
                        alert("Academic Year,Course,medium,Exam Name and subject Name already exists,cannot duplicate");
                        return AcademicYear;
                    }
                    $scope.PaperPattern_InsertUpdate();
                })
            } else {
                $scope.PaperPattern_InsertUpdate();
            }
        };
        $scope.PaperPattern_InsertUpdate = function () {
            if ($scope.Validationcontrols() == true) {
                var obj = {
                    Id: $scope.Id,
                    AcademicYearId: $scope.AcademicYear,
                    CourseId: $scope.Course,
                    MediumId: $scope.MediumName,
                    ExamNameId: $scope.ExamName,
                    SubjectId: $scope.SubjectName
                };

                $http.post(baseUrl + '/addPaperPattern', obj).then(function success(response) {

                    $scope.PaperPatternId = response.data[0].p_id;
                    var PaperPatternId = response.data;
                    angular.forEach($scope.AddQuestions, function (value, index) {

                        var childobj = {
                            Id: value.childid,
                            PaperPatternId: $scope.PaperPatternId,
                            QuestionpaperSectionId: value.questionpapersectionid,
                            NumberofQuestions: value.numberofquestions,
                            Answers: value.answers,
                            Marks: value.marks,
                            Remarks: value.remarks

                        }

                        $http.post(baseUrl + '/addPaperPatternchild', childobj).then(function success(response) {});

                    });
                    if (response.data !== 0) {
                        alert("Added/Updated successfully");
                        var obj_filter = {
                            AcademicYearId: $scope.AcademicYear,
                            CourseId: $scope.Course,
                            SubjectNameId: "0",
                            ExamNameId: $scope.ExamName
                        };
                        $scope.CancelPopup();
                        $eid = response.data;


                        $scope.Paperpatternsave(obj_filter);
                    } else {
                        alert("Insert/Update Problem");
                    }
                });
            }
        };

        $scope.CourseBasedSubjectFunction = function () {
            if ($scope.Course == 0) {
                $http.get(baseUrl + '/getSubjectNamelist').then(function success(response) {
                    $scope.SubjectList = response.data;
                });
            } else {
                var obj = {
                    CourseId: $scope.Course
                }
                $http.post(baseUrl + '/CourseBasedSubject', obj).then(function success(response) {
                    $scope.SubjectList = response.data;
                });
            }

        }

        $scope.Paperpatternsave = function (obj_filter) {
            // var data = {
            //     Id: sid
            // }
            // //  //console.log(data);
            // $http.post(baseUrl + '/getPaperpatternSingleList', data).then(function success(response) {
            //     ////console.log(response.data);
            //     $scope.rowcollection = response.data;
            //     $scope.PaperPatternchildlist = response.data;
            //     $state.go('PaperPattern');

            // })

            $scope.emptydata = [];
            $scope.rowcollection = [];

            $scope.filteredPaperPatternSearch(obj_filter);
        }


        $scope.PaperPattern_View = function () {
            var data = {
                Id: $scope.Id
            }
            $http.post(baseUrl + '/getPaperPatternView', data).then(function success(response) {


                $scope.Id = response.data[0].id;
                $scope.AcademicYear = response.data[0].academicyearid.toString();
                $scope.ViewAcademicYear = response.data[0].academicyear;

                $scope.MediumName = response.data[0].mediumid.toString();
                $scope.ViewMediumName = response.data[0].mediumname;

                $scope.Course = response.data[0].courseid.toString();
                $scope.ViewCourse = response.data[0].course;

                $scope.ExamName = response.data[0].examnameid.toString();
                $scope.ViewExamName = response.data[0].examname;

                $scope.SubjectName = response.data[0].subjectid.toString();
                $scope.ViewSubject = response.data[0].subjectname;
                var obj = {
                    PaperPatternId: $scope.Id
                    // QuestionpaperSectionId:$scope.Id
                }

                $http.post(baseUrl + '/getPaperPatternQuestionsView', obj).then(function success(response) {
                    $scope.emptydatas = [];

                    $scope.AddQuestions = [];
                    $scope.AddQuestions = response.data;

                    //$scope.AcademicYearList = response.data;
                    $scope.AddQuestions = $ff(response.data, {
                        isactive: 1
                    });
                    if ($scope.AddQuestions.length > 0) {
                        $scope.flag1 = 1;
                    } else {
                        $scope.flag1 = 0;
                    }
                });
            });
        };

        $scope.ErrorFunction = function () {
            alert("Inactive record cannot be edited");
        }

        $scope.ClearPopup = function () {
            // // $scope.AddQuestions =[];
            // angular.forEach($scope.AddQuestions, function (value, index) {
            //     // $scope.QuestionSave='0';

            //     $scope.AcademicYear = $scope.AcyYear[0].id.toString();
            //     $scope.MediumName = "";
            //     $scope.PreviousRow = "-1";
            //     $scope.ChildId = 0;

            //     value.QuestionpaperSectionId = "";
            //     value.NumberofQuestions = "";
            //     value.Answers = "";
            //     value.Marks = "";
            //     value.Remarks = "";

            //     $scope.Course = "0";
            //     $scope.ExamName = "0";
            //     $scope.SubjectName = "0";
            //     $scope.QuestionPaperSection = "";
            //     $scope.NumberofQuestions = '';
            //     $scope.Marks = '';
            //     $scope.Answers = '';
            //     $scope.Remarks = '';

            //     $scope.QBAcademicYear = "";
            //     $scope.QBMedium = "";
            //     $scope.QBCourse = "";
            //     $scope.QBExamName = "";
            //     $scope.QBSubject = "";
            //     $scope.QBQuestionPaperSection = "";
            //     $scope.PaperType = "";
            //     $scope.Questions = '';
            //     $scope.AddQuestions = [];
            //     $scope.AddQuestions = [{
            //         'Id': $scope.ChildId,
            //         'QuestionPaperSection': $scope.QuestionPaperSection,
            //         'NumberofQuestions': $scope.NumberofQuestions,
            //         'Answers': $scope.Answers,
            //         'Marks': $scope.Marks,
            //         'Remarks': $scope.Remarks
            //     }];
            // });

        };

        $scope.CancelPopup = function () {
            angular.element('#PaperPatternAddModal').modal('hide');
            angular.element('#PaperPatternViewModal').modal('hide');
            angular.element('#QuesAddModal').modal('hide');
            angular.element('#QuestionBankViewModal').modal('hide');
            $scope.ClearPopup();
        }


        $scope.InActive = function (OTId) {
            $scope.Id = OTId;
            var del = confirm("Do you like to inactivate the selected detail?");
            if (del == true) {
                var data = {
                    Id: $scope.Id
                }
                $http.post(baseUrl + '/inactivePaperpattern', data).then(function success(response) {
                    alert("Selected Paper Pattern Details has been inactivated successfully");
                    $scope.PaperPatternlist();
                });
            };
        }

        $scope.Active = function (OTId) {
            $scope.Id = OTId;
            var del = confirm("Do you like to activate the selected detail?");
            if (del == true) {
                var data = {
                    Id: $scope.Id
                }

                $http.post(baseUrl + '/activePaperpattern', data).then(function success(response) {
                    alert("Selected Paper Pattern Details has been activated successfully");
                    $scope.PaperPatternlist();
                });
            };
        }

        $scope.AddQuestions = [];
        /*This is array function for display default row from Previous Experience*/
        $scope.AddQuestions = [{
            'Id': $scope.ChildId,
            'QuestionPaperSection': $scope.QuestionPaperSection,
            'NumberofQuestions': $scope.NumberofQuestions,
            'Answers': $scope.Answers,
            'Marks': $scope.Marks,
            'Remarks': $scope.Remarks
        }];


        $scope.QuestionsSave = function () {

            if ($scope.PreviousRow >= 0) {
                var obj = {
                    'Id': $scope.ChildId,
                    'QuestionPaperSection': $scope.QuestionPaperSection,
                    'NumberofQuestions': $scope.NumberofQuestions,
                    'Answers': $scope.Answers,
                    'Marks': $scope.Marks,
                    'Remarks': $scope.Remarks
                }
                $scope.AddQuestions[$scope.PreviousRow] = obj;

            } else {
                $scope.AddQuestions.push({
                    'Id': $scope.ChildId,
                    'QuestionPaperSection': $scope.QuestionPaperSection,
                    'NumberofQuestions': $scope.NumberofQuestions,
                    'Answers': $scope.Answers,
                    'Marks': $scope.Marks,
                    'Remarks': $scope.Remarks
                })
            }

        };

        /*on click Remove in Previous Experience Filed its calling the 
             Previous Experience delete funtion */
        $scope.RemovePrevious_Item = function (rowIndex) {
            var del = confirm("Do you like to delete this Question Paper Details?");
            if (del == true) {
                var Previous_Item = [];

                if ($scope.Id == undefined) {
                    angular.forEach($scope.AddQuestions, function (selectedPre, index) {
                        if (index != rowIndex)
                            Previous_Item.push(selectedPre);
                    });
                    $scope.AddQuestions = Previous_Item;
                } else if ($scope.Id > 0) {
                    angular.forEach($scope.AddQuestions, function (selectedPre, index) {
                        if (index == rowIndex) {
                            $scope.ChildId = selectedPre.childid;

                            $scope.PaperPatternPrevious_Delete();
                        } else {
                            Previous_Item.push(selectedPre);
                        }
                    });
                    $scope.AddQuestions = Previous_Item;
                }
            }
        };
        $scope.PaperPatternPrevious_Delete = function () {
            var data = {
                ChildId: $scope.ChildId
            }

            // $http.get(baseUrl + '/getPaperPatternDelete',data).success(function (Prevdata) {
            $http.post(baseUrl + '/getPaperPatternDelete', data).then(function success(Prevdata) {
                //alert("Requirement Details deleted Successfully");

            })
        };
    }
]);

OEMSController.controller("QuestionBankController", ['$scope', '$http', '$state', '$filter', '$stateParams', '$window', 'filterFilter',
    function ($scope, $http, $state, $filter, $stateParams, $window, $ff) {
        // Values Initialization for Paper Pattern
        if(loginFrom==0)
        {
             window.location.href = baseUrl + "/";        
        }
        $scope.InstitutionId = $window.localStorage['Institution_Id'];
        var InstObj = {
            InstitutionId: $scope.InstitutionId
        }
        $scope.AcademicYear = "2";
        $scope.Course = "0";
        $scope.MediumName = "";
        $scope.ExamName = "";
        $scope.SubjectName = "";
        $scope.QuestionPaperSection = "";
        $scope.NumberofQuestions = '';
        $scope.Answers = '';
        $scope.Marks = '';
        $scope.Remarks = '';

        // Value Initialization for Question Bank
        $scope.QBAcademicYear = "0";
        $scope.QBCourse = "0";
        $scope.QBMedium = "";
        $scope.QBExamName = "0";
        $scope.QBSubject = "0";
        $scope.QBQuestionPaperSection = "0";
        $scope.PaperType = "";
        $scope.Questions = '';

        // Filter Function Initialisation
        $scope.AcademicYearId = "";
        $scope.CourseId = "";
        $scope.SubjectId = "";
        $scope.ExamNameId = "";

        $scope.QBAcademicYearId = "0";
        $scope.QBCourseId = "0";
        $scope.QBExamNameId = "0";
        $scope.PaperTypeId = "";

        $scope.flag = 0;
        $scope.flag1 = 0;
        $scope.IsActive = "1";
        $scope.viewEmptyData=[];
        $scope.QBLanguage=1;
        $scope.QuestionBankLanguageSet=function(QBLan)
        {
            $scope.QBLanguage=QBLan;
        }
        $scope.QuestionBankRedirect = function () {
            $state.go('QuestionBankList');
        }

        $scope.PaperPatternRedirect = function () {
            $state.go('PaperPattern');
        }
        /* This is function for Pagination */
        $scope.listdata = [];
        $scope.current_page = 1;
        $scope.page_size = 10;
        $scope.rembemberCurrentPage = function (p) {
            $scope.current_page = p
        }


        $scope.MediumList = [];
        $http.post(baseUrl + '/getmediumlist', InstObj).then(function success(response) {
            $scope.Mediumlist = response.data;
        });

        $scope.AcademicYearList = [];
        $http.post(baseUrl + '/getAcademicYearList',InstObj).then(function success(response) {
            $scope.AcademicYearList = response.data;
            $scope.AcyYear = $ff(response.data, {
                academicflag: 1
            });
            // $scope.QBAcademicYear = $scope.AcyYear[0].id.toString();
            // $scope.QBAcademicYear = $scope.AcyYear[0].id.toString();
        });

        // $scope.ExamNameList = [];
        // $http.get(baseUrl + '/getExamNameList').then(function success(response) {
        //     $scope.ExamNameList = response.data;
        // });

        // $scope.SubjectList = [];
        // $http.get(baseUrl + '/getSubjectNamelist').then(function success(response) {
        //     $scope.SubjectList = response.data;
        // });

        $scope.QuestionSectionList = [];
        $http.get(baseUrl + '/getQuestionSectionList').then(function success(response) {
            $scope.QuestionSectionList = response.data;
        });


        $scope.PaperTypeList = [];
        $http.post(baseUrl + '/getPaperTypeList', InstObj).then(function success(response) {
            $scope.PaperTypeList = response.data;
        });

        // $scope.CourseBasedExamList = [];
        // $http.post(baseUrl + '/getCourseBasedExamLists').then(function success(response) {
        //     $scope.CourseBasedExamList = response.data;
        //     //console.log($scope.CourseBasedExamList);
        // });

        $scope.AddQuestionModal = function () {
            $scope.ClearPopup();
            $scope.Id = 0;
            angular.element('#QuesAddModal').modal('show');
        }

        $scope.ViewQuestionModal = function (OTId) {
            $scope.Id = OTId;
            $scope.QuestionBank_View();
            angular.element('#QuestionBankViewModal').modal('show');
        }

        $scope.EditQuestionModal = function (OTId) {
            $scope.ClearPopup();
            $scope.Id = OTId;
            $scope.QuestionBank_View();
            angular.element('#QuesAddModal').modal('show');
        }
        // $scope.SchoolNameList = [];
        // $http.get('/getSchool_NameList/').then(function success(response) {
        //     $scope.SchoolNameList = response.data;
        //     // //console.log($scope.SchoolNameList);
        // });
        $scope.ListValidationcontrols = function () {
            if (typeof ($scope.QBAcademicYearId) == "undefined" || $scope.QBAcademicYearId == 0) {
                alert("Please select Academic Year");
                return false;
            }
            return true;

        }
        $scope.row = [];
        $scope.QuestionBanklist = function () {
            
            if ($scope.ListValidationcontrols() == true) {
                $("#chatLoaderPV").show();
                var obj = {
                    QBAcademicYearId: $scope.QBAcademicYearId,
                    QBCourseId: $scope.QBCourseId,
                    PaperTypeId: $scope.PaperTypeId,
                    QBExamNameId: $scope.QBExamNameId,
                    QBSubjectId:$scope.QBSubjectId,
                    IsActive: $scope.IsActive
                };

                $http.post(baseUrl + '/getQuestionBankList', obj).then(function success(response) {
                    $scope.emptydata = [];
                    $scope.row = [];
                    $scope.row = response.data;
                    if ($scope.row.length > 0) {
                        $scope.flag1 = 1;
                    } else {
                        $scope.flag1 = 0;
                    }
                    $scope.UserId = 2;
                    $scope.loginuserId = $scope.UserId;
                    $("#chatLoaderPV").hide();
                });
            }
            
        }
        $scope.getFilterHeaders = function (filterList, filterValue) {
            return $filter('filter')(filterList, function (obj) {
                if (obj.Id == filterValue)
                    return obj;
            })[0];
        };
        $scope.QuestionBankValidationcontrols = function () {
            //$scope.Questions = (CKEDITOR.instances.editor1.getData());
            // $scope.Questions = $('.summernote').eq(0).summernote('code');
            if (typeof ($scope.QBAcademicYear) == "undefined" || $scope.QBAcademicYear == "0") {
                alert("Please select Academic Year");
                return false;
            } else if (typeof ($scope.QBCourse) == "undefined" || $scope.QBCourse == "0") {
                alert("Please select Course");
                return false;
            } else if (typeof ($scope.QBMedium) == "undefined" || $scope.QBMedium == "") {
                alert("Please select Medium");
                return false;
            } else if (typeof ($scope.QBExamName) == "undefined" || $scope.QBExamName == "0") {
                alert("Please select Exam Name");
                return false;
            } else if (typeof ($scope.QBSubject) == "undefined" || $scope.QBSubject == "0") {
                alert("Please select Subject Name");
                return false;
            } else if (typeof ($scope.PaperType) == "undefined" || $scope.PaperType == "") {
                alert("Please select Paper Type");
                return false;
            } 
            return true;
        };

        $scope.AcademicYearBasedCourseFunction = function () {
            if ($scope.QBAcademicYearId == 0) {
                $http.post(baseUrl + '/getcourselist', InstObj).then(function success(response) {
                    $scope.Courselist = response.data;
                });
            } else {
                var obj = {
                    AcademicYearId: $scope.QBAcademicYearId,
                    InstitutionId: $scope.InstitutionId
                }
                $http.post(baseUrl + '/getAcademicYearBasedCourse', obj).then(function success(response) {
                    $scope.Courselist = response.data;
                });
            }
        }

        $scope.CourseClearFunction = function () {
            $scope.QBCourseId = '0';
        };

        $scope.CourseBasedExamNameFunction = function () {
            // alert('hi');
            if ($scope.QBCourseId == 0) {
                $http.post(baseUrl + '/getExamNameList', InstObj).then(function success(response) {
                    $scope.ExamNameList = response.data;
                });
            } else {

                var obj = {
                    AcademicYearId: $scope.QBAcademicYearId,
                    CourseId: $scope.QBCourseId

                }
                $http.post(baseUrl + '/getCourseBasedExamList', obj).then(function success(response) {
                    $scope.ExamNameList = response.data;
                });
            }

        };
        $scope.AcademicYearBasedCourseForAddmodal = function () {
            if ($scope.QBAcademicYear == 0) {
                $http.get(baseUrl + '/getcourselist').then(function success(response) {
                    $scope.Courselist = response.data;
                });
            } else {
                var obj = {
                    AcademicYearId: $scope.QBAcademicYear,
                    InstitutionId: $scope.InstitutionId
                }
                $http.post(baseUrl + '/getAcademicYearBasedCourse', obj).then(function success(response) {
                    $scope.Courselist = response.data;
                });
            }
        }
        $scope.CourseClearFun = function () {
            $scope.QBCourse = '0';
        }
        $scope.CourseBasedExamNameForAddmodal = function () {
            if ($scope.QBCourse == 0) {
                $http.get(baseUrl + '/getExamNameList').then(function success(response) {
                    $scope.ExamNameList = response.data;
                });
            } else {

                var obj = {
                    AcademicYearId: $scope.QBAcademicYear,
                    CourseId: $scope.QBCourse

                }
                $http.post(baseUrl + '/getCourseBasedExamList', obj).then(function success(response) {
                    $scope.ExamNameList = response.data;
                });
            }

        };
        $scope.ExamNameClearFun = function () {
            // alert('hi');
            $scope.QBExamName = '0';
        }
        $scope.SubjectListObj=[];
        $scope.QBSubjectId="0";
        $scope.ExamBasedSubjectforList = function () {
            var obj = {
                AcademicYearId: $scope.QBAcademicYearId,
                CourseId: $scope.QBCourseId,
                ExamNameId: $scope.QBExamNameId
            }
            
            $http.post(baseUrl + '/getExamBasedSubjectList_Timetable', obj).then(function success(response) {
                $scope.SubjectListObj = response.data;
                // $scope.SubjectListObj = $ff(response.data, {
                //     SubjectParentId: 0
                // });;

            });
        };
        $scope.ExamBasedSubjectforAddmodal = function () {
            var obj = {
                AcademicYearId: $scope.QBAcademicYear,
                CourseId: $scope.QBCourse,
                ExamNameId: $scope.QBExamName
            }

            $http.post(baseUrl + '/getExamBasedSubjectList', obj).then(function success(response) {
                $scope.SubjectList = response.data;
                // $scope.SubjectList = $ff(response.data, {
                //     SubjectParentId: 0
                // });

            });
        };
        $scope.QuestionChildAddList=[];
        $scope.QuestionBank_AddEdit = function () {
            var qst='';
            if ($scope.QuestionBankValidationcontrols() == true) {
                $scope.QuestionChildAddList=[];
                angular.forEach($scope.PaperPatternchildlist, function (item) {
                    var filteredSection = $ff($scope.PaperPatternchildlist, {
                        id: parseInt(item.id)
                    }, true);
                    
                    if(filteredSection.length>0)
                    {
                        for (var i=1; i<=parseInt(filteredSection[0].numberofquestions); i++) {    
                            if (!(item.id in $scope.QuestionsList)) 
                                qst='';
                            else if (!(i in $scope.QuestionsList[item.id])) 
                            //if($scope.QuestionsList[item.Id][i]==undefined)
                                qst='';
                            else
                                qst=$scope.QuestionsList[item.id][i];
                            
                            var objChild={"QuestionpaperSectionId":item.id,
                                            "Questions":qst,
                                            "QuestionNo":i}
                            $scope.QuestionChildAddList.push(objChild);
                        }
                    }
                });
                
                var obj = {
                    Id: $scope.Id,
                    AcademicYearId: $scope.QBAcademicYear,
                    CourseId: $scope.QBCourse,
                    MediumId: $scope.QBMedium,
                    ExamNameId: $scope.QBExamName,
                    SubjectId: $scope.QBSubject,
                    QuestionpaperSectionId: $scope.QBQuestionPaperSection,
                    PaperTypeId: $scope.PaperType,
                    InstitutionId: $scope.InstitutionId,
                    QuestionsList: $scope.QuestionChildAddList
                };
                $http.post(baseUrl + '/addQuestionBank', obj).then(function success(response) {
                    if (response.data !== 0) {
                        alert("Added/Updated successfully");
                        $scope.CancelPopup();
                        $scope.QuestionBanklist();
                    } else {
                        alert("Insert/Update Problem");
                    }
                });
            }
        };

        $scope.QuestionBankHindi_AddEdit = function () {
            var qst='';
            if ($scope.QuestionBankValidationcontrols() == true) 
            {
                $scope.QuestionChildAddList=[];
                angular.forEach($scope.PaperPatternchildlist, function (item) {
                    var filteredSection = $ff($scope.PaperPatternchildlist, {
                        id: parseInt(item.id)
                    }, true);
                    
                    if(filteredSection.length>0)
                    {
                        for (var i=1; i<=parseInt(filteredSection[0].numberofquestions); i++) {    
                            if (!(item.id in $scope.QuestionsList)) 
                                qst='';
                            else if (!(i in $scope.QuestionsList[item.id])) 
                            //if($scope.QuestionsList[item.Id][i]==undefined)
                                qst='';
                            else
                                qst=$scope.QuestionsList[item.id][i];
                            
                            var objChild={"QuestionpaperSectionId":item.id,
                                            "Questions":qst,
                                            "QuestionNo":i}
                            $scope.QuestionChildAddList.push(objChild);
                        }
                    }
                });
                
                var obj = {
                    Id: $scope.Id,
                    AcademicYearId: $scope.QBAcademicYear,
                    CourseId: $scope.QBCourse,
                    MediumId: $scope.QBMedium,
                    ExamNameId: $scope.QBExamName,
                    SubjectId: $scope.QBSubject,
                    QuestionpaperSectionId: $scope.QBQuestionPaperSection,
                    PaperTypeId: $scope.PaperType,
                    InstitutionId: $scope.InstitutionId,
                    QuestionsList: $scope.QuestionChildAddList
                };
                $http.post(baseUrl + '/updateQuestionBankHindi', obj).then(function success(response) {
                    if (response.data !== 0) {
                        alert("Updated successfully");
                        $scope.CancelPopup();
                        
                        $scope.QuestionBanklist();
                    } else {
                        alert("Insert/Update Problem");
                    }
                });
            }
        };
        $scope.Questionbanksave = function (sid) {
            var data = {
                Id: sid
            }
            $http.post(baseUrl + '/getQuestionBankSingleList', data).then(function success(response) {
                $scope.row = response.data
                $state.go('QuestionBankList');
            })
        }
        $scope.ViewQuestionList=[];
        $scope.QuestionBank_View = function () {
            $scope.viewEmptyData=[];
            
            var data = {
                Id: $scope.Id
            }
            $http.post(baseUrl + '/getQuestionBankView', data).then(function success(response) {
                $scope.QBAcademicYear = response.data.question[0].academicyearid.toString();
                $scope.ViewAcademicYear = response.data.question[0].qbacademicyear;

                $scope.QBMedium = response.data.question[0].mediumid.toString();
                $scope.ViewMediumName = response.data.question[0].qbmedium;

                $scope.QBCourse = response.data.question[0].courseid.toString();
                $scope.ViewCourseName = response.data.question[0].qbcourse;

                $scope.QBExamName = response.data.question[0].examnameid.toString();
                $scope.ViewExamName = response.data.question[0].qbexamname;

                $scope.QBSubject = response.data.question[0].subjectid.toString();
                $scope.ViewSubject = response.data.question[0].qbsubject;

                // $scope.QBQuestionPaperSection = response.data.question[0]paperSectionId.toString();
                // $scope.ViewQuestionpaperSection = response.data[0].QBQuestionPaperSection;

                $scope.PaperType = response.data.question[0].papertypeid.toString();
                $scope.ViewPaperType = response.data.question[0].papertype;

                // $scope.ViewQuestions = response.data[0].Questions;

                $scope.ViewQuestionList = response.data.child;
                $scope.ListPaperPatterDetails();
            })
        };

        $scope.QuestionEnglish = function () {
          
              angular.forEach($scope.ViewQuestionList, function (value,index) {               
                if(($scope.QBQuestionNumber == value.questionno)   && (value.questionpapersectionid == $scope.QBQuestionPaperSection))
                {
                    $scope.Question_InEnglish = value.questions;                    
                }
          });
        }
        $scope.ErrorFunction = function () {
            alert("Inactive record cannot be edited");
        }

        $scope.ClearPopup = function () {
             // $scope.QBAcademicYear = $scope.AcyYear[0].id.toString();
             $scope.QBMedium = "";
             $scope.QBCourse = "0";
             $scope.QBExamName = "0";
             $scope.QBSubject = "0";
             $scope.QBQuestionPaperSection = "";
             $scope.PaperType = "";
             $scope.PaperPatternchildlist=[];
             $scope.QBQuestionNumber="0";
             $scope.QuestionsList = [];

            // // $('.summernote').eq(0).summernote('code', $scope.Template);
            // // $('.summernote').eq(1).summernote('code', $scope.Template);
            // $scope.Questions = CKEDITOR.instances.editor1.setData($scope.Questions);
            // // $scope.Questions = (CKEDITOR.instances.editor1.getData());
            // // $('.summernote').eq(1).summernote('code', $scope.Questions);
        };

        $scope.CancelPopup = function () {
            angular.element('#PaperPatternAddModal').modal('hide');
            angular.element('#PaperPatternViewModal').modal('hide');
            angular.element('#QuesAddModal').modal('hide');
            angular.element('#QuestionBankViewModal').modal('hide');
            $scope.ClearPopup();
        }

        $scope.InActiveQuestionBank = function (OTId) {
            $scope.Id = OTId;
            var del = confirm("Do you like to inactivate the selected detail?");
            if (del == true) {
                var data = {
                    Id: $scope.Id
                }
                $http.post(baseUrl + '/inactiveQuestionBank', data).then(function success(response) {
                    alert("Selected detail has been inactivated successfully");
                });
            };
        }

        $scope.ActiveQuestionBank = function (OTId) {
            $scope.Id = OTId;
            var del = confirm("Do you like to activate the selected detail?");
            if (del == true) {
                var data = {
                    Id: $scope.Id
                }
                $http.post(baseUrl + '/activeQuestionBank', data).then(function success(response) {

                    alert("Selected detail has been activated successfully");

                });
            };
        }
        $scope.PaperPatternchildlist = [];
        $scope.QuestionsList=[];
        $scope.ListPaperPatterDetails = function()
        {
            var obj = {
                AcademicYearId: $scope.QBAcademicYear,
                CourseId: $scope.QBCourse,
                SubjectId: $scope.QBSubject,
                ExamNameId: $scope.QBExamName,
                MediumId: $scope.QBMedium
            };
            $http.post(baseUrl + '/getPaperPatternchildlist', obj).then(function success(response1) {
                $scope.PaperPatternchildlist = [];
                $scope.PaperPatternchildlist = response1.data;
                if($scope.PaperPatternchildlist.length>0)
                {
                    $scope.QBQuestionPaperSection=$scope.PaperPatternchildlist[0].id.toString();

                    $scope.GetQuestionNumberList();
                    if($scope.Id>0)
                        $scope.fillQuestionList();
                }
            });            
        }
        $scope.fillQuestionList=function()
        {
            $scope.QuestionsList=[];
            angular.forEach($scope.PaperPatternchildlist, function (item) {  
                $scope.QuestionsList[item.id]={};
                for (var i=1; i<=parseInt(item.numberofquestions); i++) {
                        if($scope.QBLanguage==1)
                        {
                            $scope.QuestionsList[item.id][i]=$ff($scope.ViewQuestionList, {
                                questionpapersectionid: parseInt(item.id),
                                questionno:i
                            }, true)[0].questions;
                        }
                        else
                        {
                            $scope.QuestionsList[item.id][i]=$ff($scope.ViewQuestionList, {
                                questionpapersectionid: parseInt(item.id),
                                questionno:i
                            }, true)[0].questionhindi;
                        }

                }
            });
        }
        $scope.getQuestionList=function()
        {
            //angular.forEach($scope.PaperPatternchildlist, function (item) {
                var filteredSection = $ff($scope.PaperPatternchildlist, {
                    id: parseInt($scope.QBQuestionPaperSection)
                }, true);
                
                if(filteredSection.length>0)
                {
                    for (var i=1; i<=parseInt(filteredSection[0].numberofquestions); i++) {
                        
                        $scope.QuestionsList[filteredSection.id][i]="";
                        $scope.QuestionsListHindi[filteredSection.id][i]="";
                    }
                }
            //});
        }
        $scope.QuestionNumberList=[];
        $scope.QBQuestionNumber="0";
        $scope.MaxQuestions=0;
        $scope.GetQuestionNumberList = function()
        {
            var filteredSection = $ff($scope.PaperPatternchildlist, {
                id: parseInt($scope.QBQuestionPaperSection)
            }, true);
            
            $scope.QuestionNumberList=[];
            $scope.QBQuestionNumber="0";
            if(filteredSection.length>0)
            {
                $scope.MaxQuestions=parseInt(filteredSection[0].numberofquestions);
                for (var i=1; i<=parseInt(filteredSection[0].numberofquestions); i++) {
                    $scope.QuestionNumberList.push({"QuestionNumber":i});
                }
                $scope.QBQuestionNumber="1";
            }
        }
        $scope.options = {
            language: 'en',
            allowedContent: true,
            entities: false
          };   
        $scope.NextQuestionSelect = function()
        {           
            if($scope.MaxQuestions>parseInt($scope.QBQuestionNumber))
            {
                $scope.QBQuestionNumber=(parseInt($scope.QBQuestionNumber) + 1).toString();
                $scope.QuestionEnglish();
            }
            else
            {
                $scope.QBQuestionNumber="1";
                var selIndQS=0;
                var ret=false;
                angular.forEach($scope.PaperPatternchildlist, function (item, index) {
                    if($scope.QBQuestionPaperSection==item.id && index+1!= $scope.PaperPatternchildlist.length && ret==false)
                    {
                        $scope.QBQuestionPaperSection =  $scope.PaperPatternchildlist[index+1].id.toString();
                        $scope.GetQuestionNumberList();
                        $scope.QuestionEnglish();
                        ret=true;
                    }
                    else if($scope.QBQuestionPaperSection==item.id && index+1== $scope.PaperPatternchildlist.length && ret==false)
                    {
                        $scope.QBQuestionPaperSection =  $scope.PaperPatternchildlist[0].id.toString();
                        $scope.GetQuestionNumberList();
                        $scope.QuestionEnglish();
                        ret=true;
                    }
                    if(ret==true) 
                    {
                        
                        angular.element('#questioncontrol').focus()
                        return;
                    }
                });
            }
            angular.element('#questioncontrol').focus()
        }

    }
]);

OEMSController.controller("ExaminationMarksController", ['$scope', '$http', '$state', '$filter', '$stateParams', '$window', 'CommonLabelNames', 'CommonHeadingNames', 'CommonButtonNames', 'filterFilter',
    function ($scope, $http, $state, $filter, $stateParams, $window, $CommonLabelNames, $CommonHeadingNames, $CommonButtonNames, $ff) {
        if(loginFrom==0)
        {
             window.location.href = baseUrl + "/";        
        }
        $scope.InstitutionId =1;
        var InstObj = {
            InstitutionId: $scope.InstitutionId
        }
        $scope.Id = 0;
        
        $scope.Id = 0;
        $scope.MediumId = '';
        $scope.CourseId = "0";
        $scope.SectionId = "0";
        $scope.ExamNameId = "0";
        $scope.CenterId = "0";
        $scope.FilterInstitutionId = "0";
        $scope.SubjectNameId = "0";
        $scope.flag = 0;
        $scope.StudentMasterList = [];
        //list page initialisation
        // // $scope.AcademicYearId = '2';
        // $scope.MediumId = '';
        // $scope.CourseId = "0";
        // $scope.SectionId = "0";
        // $scope.ExamNameId = "0";
        // $scope.SubjectNameId = '0';
        // $scope.flag = 0;
        // $scope.StudentMasterList = [];

        /* This is function for Pagination */
        $scope.listdata = [];
        $scope.current_page = 1;
        $scope.page_size = 50;

        $scope.rembemberCurrentPage = function (p) {
            $scope.current_page = p
        }


        $scope.listPage = $stateParams.view;

        $scope.Mode = $stateParams.Mode;

        if ($scope.listPage == 2) {
            $scope.Status_List = "-1";
        } else {
            $scope.Status_List = "0";
        }
        // $scope.Clearfunction = function () {
        //     $scope.SectionId = "";

        // };

        $scope.PaperPatternId = 0;
        $scope.model = {
            selectedLabelList: []
        }

        $scope.isSelectAll = function () {
            $scope.model.selectedLabelList = [];
            if ($scope.master) {
                $scope.master = true;
                for (var i = 0; i < $scope.StudentList.length; i++) {
                    $scope.model.selectedLabelList.push($scope.StudentList[i].Id);
                }
            } else {
                $scope.master = false;
            }
            angular.forEach($scope.StudentList, function (item) {
                item.selectedstudent = $scope.master;
            });
        }
        $scope.isSelectAll1 = function () {
            $scope.model.selectedLabelList = [];
            if ($scope.master) {
                $scope.master = true;
                for (var i = 0; i < $scope.StudentMasterList.length; i++) {
                    $scope.model.selectedLabelList.push($scope.StudentMasterList[i].Id);
                }
            } else {
                $scope.master = false;
            }
            angular.forEach($scope.StudentMasterList, function (item) {
                item.selectedstudent = $scope.master;
            });
        }

        // $scope.SchoolNameList = [];
        // $http.get('/getSchool_NameList/').then(function success(response) {
        //     $scope.SchoolNameList = response.data;
        // });


        
        $scope.SubjectsbasedCheckboxfunction = function (SubjectParentId, Id) {

            var filteredSubject = $ff($scope.SubjectNameList, {
                id: Id
            }, true)

            if (filteredSubject[0].selectedstudent == false) {
                filteredSubject[0].total = "";
                filteredSubject[0].pass = "";
                $scope.FillPassfunction();
                $scope.FillTotalfunction();
            }

        };
        $scope.flag = 0;
        $scope.examlistsearch = function () {
            
           
            if ($scope.Validationcontrols() == true) {
                $("#chatLoaderPV").show();
                var obj = {
                    AcademicYearId: $scope.AcademicYearId,
                    MediumId: $scope.MediumId,
                    CourseId: $scope.CourseId,
                    SectionId: $scope.SectionId,
                    ExamNameId: $scope.ExamNameId,
                    SubjectNameId: $scope.SubjectNameId,
                    PaperPatternId: $scope.PaperPatternId,
                    ExamCenterId: $scope.CenterId,
                    InstitutionId: $scope.FilterInstitutionId
                };

                $http.post(baseUrl + '/getExaminationList', obj).then(function success(response) {
                  
                    $scope.emptydata = [];
                    $scope.StudentList = [];
                    $scope.StudentList = response.data;
                    //console.log($scope.StudentList);
                    angular.forEach($scope.StudentList, function (value, studentindex) {
                        if (value.attendance == 0) {
                            // alert('ashgd');
                            value.marksobtained = 'A'
                        }

                    });

                    if ($scope.SubjectNameId == 0) {
                        var objStud = {
                            AcademicYearId: $scope.AcademicYearId,
                            MediumId: $scope.MediumId,
                            CourseId: $scope.CourseId,
                            SectionId: $scope.SectionId,
                            ExamNameId: $scope.ExamNameId,
                            ExamCenterId: $scope.CenterId,
                            InstitutionId: $scope.FilterInstitutionId
                        };
                        $http.post(baseUrl + '/getExam_StudentList', objStud).then(function success(response1) {
                        
                            $scope.StudentMasterList = [];
                            $scope.StudentMasterList = response1.data;
                            //console.log($scope.StudentMasterList);

                        });
                    } else {

                        $scope.StudentMasterList = $ff($scope.StudentList, {
                            subjectparentid: 0
                        });
                        //| filter:{SubjectParentId:0}
                    }



                    if ($scope.StudentList.length > 0) {
                        $scope.flag = 1;
                    } else {
                        $scope.flag = 0;
                    }
                    $("#chatLoaderPV").hide();
                });

            }
            
        };

        $scope.getFilterHeaders = function (filterList, filterValue) {
            return $filter('filter')(filterList, function (obj) {
                if (obj.id == filterValue)
                    return obj;
            })[0];
        };



        $scope.AcademicYearList = [];
        $http.post(baseUrl + '/getAcademicYearList', InstObj).then(function success(response) {
            $scope.AcademicYearList = response.data;
            $scope.AcyYear = $ff(response.data, {
                academicflag: 1
            });
            $scope.AcademicYearId = $scope.AcyYear[0].id.toString();
            $scope.AcademicYearBasedCourseFunction();
        });
        $scope.AcademicYearBasedCourseFunction = function () {
            var obj = {
                AcademicYearId: $scope.AcademicYearId,
                InstitutionId: $scope.InstitutionId
            }
            $http.post(baseUrl + '/getAcademicYearBasedCourse', obj).then(function success(response) {
                $scope.Courselist = response.data;
            });
        }
        $scope.MediumList = [];
        $http.post(baseUrl + '/getmediumlist', InstObj).then(function success(response) {
            $scope.Mediumlist = response.data;
        });

        $scope.SectionList = [];
        $http.post(baseUrl + '/getSectionList', InstObj).then(function success(response) {
            $scope.SectionList = response.data;
        });

        $scope.CourseBasedSectionList = [];
        $scope.CourseBasedSectionFunction = function () {
            var obj = {
                AcademicYearId: $scope.AcademicYearId,
                CourseId: $scope.CourseId
            };
            $http.post(baseUrl + '/getCourseBasedSectionList', obj).then(function success(response) {
                $scope.CourseBasedSectionList = response.data;
            });
        }

        $scope.CourseClearFunction = function () {
            $scope.CourseId = '';
            $scope.HallTicketList = [];
        };
        $scope.CourseBasedExamNameFunction = function () {
            var obj = {
                AcademicYearId: $scope.AcademicYearId,
                CourseId: $scope.CourseId
            }
            $http.post(baseUrl + '/getCourseBasedExamList', obj).then(function success(response) {
                $scope.ExamNameList = response.data;
                if($scope.ExamNameList.length == 1){
                    $scope.ExamNameId = response.data[0].examnameid.toString();
                    $scope.ExamBasedSubject();
                }
            });
        };
        $scope.ExamNameClearFunction = function () {
            $scope.ExamNameId = "0";
            $scope.SectionId = "0";
            $scope.flag = 0;
            $scope.HallTicketList = [];
        };

        $scope.List_SubjectList = [];
        $scope.ExamBasedSubject = function () {
       
            if($scope.listPage == 1)
            {
                $scope.PaperPatternId = 2;
            }
            if ($scope.listPage == 3)
            {
                $scope.PaperPatternId = 5;
            }
            var obj = {
                AcademicYearId: $scope.AcademicYearId,
                CourseId: $scope.CourseId,
                ExamNameId: $scope.ExamNameId,
                PaperPatternId: $scope.PaperPatternId,
            }
            $http.post(baseUrl + '/Exam_SubjectList', obj).then(function success(response) {
              
                $scope.List_SubjectList = response.data;
                $scope.SubjectList = response.data;
            });
        };
     $scope.List_SubjectList = [];
        $scope.SubjectClearfunction = function () {
            $scope.SubjectNameId = "0";
            $scope.StudentList = [];
            $scope.flag = 0;
            $scope.StudentMasterList = [];
        };
        $scope.Validationcontrols = function () {

            if (typeof ($scope.AcademicYearId) == "undefined" || $scope.AcademicYearId == "0") {
                alert("Please select Academic Year");
                return false;
            } else if (typeof ($scope.CourseId) == "undefined" || $scope.CourseId == "0") {
                alert("Please select Course");
                return false;
            // } else if (typeof ($scope.MediumId) == "undefined" || $scope.MediumId == "0") {
            //     alert("Please select Medium");
            //     return false;
            // } else if (typeof ($scope.SectionId) == "undefined" || $scope.SectionId == "0") {
            //     alert("Please select Section");
            //     return false;
            // } else if (typeof ($scope.ExamNameId) == "undefined" || $scope.ExamNameId == "0") {
            //     alert("Please select Exam Name");
            //     return false;
             }
            else if(typeof ($scope.CenterId) == "undefined" || $scope.CenterId == "0" ) {
             if(
            typeof ($scope.FilterInstitutionId) == "undefined" || $scope.FilterInstitutionId == "0" )
            {
                alert("Please select Exam Center Or Institution");
                return false;
            }
            // if($scope.listPage !=2)
            // if (typeof ($scope.SubjectNameId) == "undefined" || $scope.SubjectNameId == "0" ) {
            //     alert("Please select Subject Name");
            //     return false;
            // } 
            
        }

            return true;
        };


        $scope.CourseBasedSectionList = [];
        $scope.CourseBasedSectionFunction = function () {
            var obj = {
                AcademicYearId: $scope.AcademicYearId,
                CourseId: $scope.CourseId

            };

            $http.post(baseUrl + '/getCourseBasedSectionList', obj).then(function success(response) {

                $scope.CourseBasedSectionList = response.data;
            });
        }
        var insobj = {
            InstitutionId: $scope.InstitutionId

        };
        $http.post(baseUrl + '/getExamCentre_List', insobj).then(function success(response) {

            $scope.ExamCentre_List = response.data;
        });
        $http.post(baseUrl + '/getInstitution_List', insobj).then(function success(response) {

            $scope.Institution_List = response.data;
        });
        
        $scope.checkAll = function () {
            if (!$scope.selectedall) {
                $scope.selectedall = true;
            } else {
                $scope.selectedall = false;
            }
           
            angular.forEach($scope.StudentList, function (row) {
                //StudSelectionList[index]
                row.StudSelectionList[$index] = $scope.selectedall;
            });
        };
        $scope.StudSelection = [];
        $scope.StudSelectionList = [];
        $scope.Present = 1;
        $scope.Absent = 0;
        // $scope.MarksObtained=[];


        
        $scope.ExamValidationcontrols = function () {
            var from = 0;
            angular.forEach($scope.StudentList, function (value, index) {

                if (($scope.total) < (value.marksobtained)) {
                    from = 1;
                }
            });
            if (($scope.StudentList.length) != undefined) {
                if (from == 1) {
                    alert("Please enter No. of Questions is greater than Answers");
                    return false;
                }

            }
        };

        $scope.ClearFunctionBasedRadio = function (row) {

            row.MarksObtained = "";
            var filteredObj = $ff($scope.StudentList, {
                studentid: row.studentid,
                subjectparentid: row.subjectid
            });
            angular.forEach(filteredObj, function (value, studentindex) {
                value.marksobtained = "";
            });
        };
        $scope.checkParentSubjectSelected = function (StudentId, SubjectId, flag, row) {
          
            row.MarksObtained = "";
            var filteredObj = $ff($scope.StudentList, {
                studentid: row.studentid,
                subjectparentid: row.subjectid
            });
           
            angular.forEach(filteredObj, function (value, studentindex) {
                value.selectedstudent = flag;
                value.marksobtained = "";
            });

        }
        $scope.checkMarkEntered = function (totMark, rowObj) {
            
            angular.forEach($scope.SubjectList, function (value, studentindex) {

           if(value.subjectid == rowObj.subjectid){ 
            if (parseFloat(rowObj.marksobtained) > parseFloat(value.total)) {
                rowObj.marksobtained = "";
                alert("Please enter Marks less than Total Mark " + value.total);
                return;
            } 
           //console.log((rowObj.marksobtained + "").split(".").length)
            if ((rowObj.marksobtained + "").split(".").length > 1) {
              
                if ((rowObj.marksobtained + "").split(".")[1] != 25 && (rowObj.marksobtained + "").split(".")[1] != 50) {
                    //  rowObj.MarksObtained = "";
                    alert("Please enter valid Marks");
                   
                    if ((rowObj.marksobtained + "").split(".")[1] == 25 || (rowObj.marksobtained + "").split(".")[1] == 50 || (rowObj.marksobtained + "").split(".")[1] == 75)
                    {
                    rowObj.marksobtained = rowObj.marksobtained ;
                    }
                    
                }
            }
        }
        });
        }

        $scope.TotalFunction = function (SubjectparentId, StudentId) {
            var totalMark = 0;
            var currMark = 0;
            //  var passMark=0;

            angular.forEach($scope.StudentList, function (value, index) {
                // console.log(value.MarksObtained);


                if (value.subjectparentid == SubjectparentId && value.studentid == StudentId) {
                    if (value.marksobtained == "A") {
                        currMark = 0;
                    } else {
                        currMark = value.marksobtained
                    }
                    if (value.marksobtained != "") {
                        totalMark = totalMark + parseFloat(currMark);
                    }

                }

            });
            angular.forEach($scope.StudentList, function (value, index) {
                // console.log($scope.StudentList);

                if (value.subjectid == SubjectparentId && value.studentid == StudentId) {
                    if (totalMark == 0) {
                        value.marksobtained = 0;
                    } else {
                        value.marksobtained = totalMark;

                    }
                }


            });
        };

        $scope.ExaminationMarks_AddEdit = function () {
            $("#chatLoaderPV").show();
                angular.forEach($scope.StudentList, function (value, studentindex) {
                    var obj = {
                        Id: $scope.Id,
                        StudentId: value.id,
                        CourseId: $scope.CourseId,
                        SubjectNameId: value.subjectid,
                        MarksObtained: value.marksobtained == "A" ? 0 : value.marksobtained,
                        Attendance: value.marksobtained == "A" ? 0 : 1,
                        AcademicYearId: $scope.AcademicYearId,
                        Subject: value.subject,
                        ExamNameId: $scope.ExamNameId,
                        InstitutionId: $scope.InstitutionId,
                        submittedby : $window.localStorage['UserId'],
                    };
                
                    $http.post(baseUrl + '/addExaminationMarks', obj).then(function success(response) {
                        if (response.data !== 0) {
                            $sid = response.data;
                        } else {
                            alert("Insert/Update Problem");
                        }
                        if($scope.StudentList.length==studentindex+1)
                        {
                            $("#chatLoaderPV").hide();
                            alert("Added/Updated successfully");
                        }
                    });
            });
            
        };
        // $scope.ExaminationMarks_AddEdit = function () {
        //     console.log($scope.StudentList);
        //     angular.forEach($scope.StudentList, function (value, studentindex) {
                
              
        //         var obj = {
        //             Id: $scope.Id,
        //             StudentId: value.Id,
        //             CourseId: $scope.CourseId,
        //             SubjectNameId: value.SubjectId,
        //             MarksObtained: value.MarksObtained == "A" ? 0 : value.MarksObtained,
        //             // MarksObtained: value.MarksObtained,
        //             Attendance: value.MarksObtained == "A" ? 0 : 1,
        //             AcademicYearId: $scope.AcademicYearId,
        //             Subject: value.Subject,
        //             ExamNameId: $scope.ExamNameId,
        //             InstitutionId: $scope.InstitutionId,
        //             submittedby : $window.localStorage['UserId'],
                    
        //         };
        //          console.log(obj);
               
        //         $http.post(baseUrl + '/addExaminationMarks', obj).then(function success(response) {
        //             if (response.data !== 0) {
        //                 $sid = response.data;
        //             } else {
        //                 alert("Insert/Update Problem");
        //             }
        //         });
           
        //         // }
        //         // }
        //     });
        //     alert("Added/Updated successfully");
        // };
    }
]);
//this is for Examwise Marks controller
OEMSController.controller("ExamWiseMarkEntryController", ['$scope', '$http', '$state', 'filterFilter', '$stateParams', '$filter',
    function ($scope, $http, $state, $ff, $stateParams, $filter) {
        if(loginFrom==0)
        {
             window.location.href = baseUrl + "/";        
        }
        //Initialize the values
        $scope.FirstLanguage = '';
        $scope.SecondLanguage = '';
        $scope.Subject1 = '';
        $scope.Subject2 = '';
        $scope.Subject3 = '';
        $scope.Remarks = '';
        // Checkbox Initialisation
        $scope.StudSelectionList = [];

        //list page initialisation
        // $scope.AcademicYearId = '2';
        $scope.MediumId = '';
        $scope.CourseId ="0";

        $scope.ExamNameId = '';
        $scope.flag = 0;

        /* This is function for Pagination */
        $scope.listdata = [];
        $scope.current_page = 1;
        $scope.page_size = 10;
        $scope.rembemberCurrentPage = function (p) {
            $scope.current_page = p
        }
        $scope.ExamClearfunction = function () {
            $scope.ExamNameId = "";
            $scope.SectionId = "";

        };

        $scope.model = {
            selectedLabelList: []
        }

        $scope.isSelectAll = function () {
            $scope.model.selectedLabelList = [];
            if ($scope.master) {
                $scope.master = true;
                for (var i = 0; i < $scope.StudentList.length; i++) {
                    $scope.model.selectedLabelList.push($scope.StudentList[i].Id);
                }
            } else {
                $scope.master = false;
            }
            angular.forEach($scope.StudentList, function (item) {
                item.selectedstudent = $scope.master;
            });
        }

        $scope.Validationcontrols = function () {
            if (typeof ($scope.AcademicYearId) == "undefined" || $scope.AcademicYearId == "0") {
                alert("Please select Academic Year");
                return false;

            } else if (typeof ($scope.CourseId) == "undefined" || $scope.CourseId == "0") {
                alert("Please select Course");
                return false;
            } else if (typeof ($scope.SectionId) == "undefined" || $scope.SectionId == "0") {
                alert("Please select Section");
                return false;
            } else if (typeof ($scope.ExamNameId) == "undefined" || $scope.ExamNameId == "0") {
                alert("Please select Exam Name");
                return false;
            }
            return true;
           
        }


        $scope.flag = 0;
        $scope.StudentList = [];
        $scope.examwiselistsearch = function () {
            
            if ($scope.Validationcontrols() == true) {
                $("#chatLoaderPV").show();
                angular.forEach($scope.ExamBasedSubjectList, function (student, studentindex) {
                    var obj = {
                        AcademicYearId: $scope.AcademicYearId,
                        MediumId: $scope.MediumId,
                        CourseId: $scope.CourseId,
                        SectionId: $scope.SectionId,
                        ExamNameId: $scope.ExamNameId
                    };
                    $http.post(baseUrl + '/getExamwiseMarkEntryList', obj).then(function success(response) {
                        $scope.emptydata = [];
                        $scope.StudentList = [];
                        $scope.StudentList = response.data;
                        var csobj = {
                            AcademicYearId: $scope.AcademicYearId,
                            CourseId: $scope.CourseId,
                            ExamNameId: $scope.ExamNameId
                        }
                        $http.post(baseUrl + '/getExaminationList', csobj).then(function success(response) {
                            $scope.ExamwiseSubjectList = [];
                            $scope.ExamwiseSubjectList = response.data;
                            // console.log($scope.StudentList);
                            if ($scope.ExamwiseSubjectList.length > 0) {
                                $scope.flag = 1;
                            } else {
                                $scope.flag = 0;
                            }
                        });


                    });
                    $("#chatLoaderPV").hide();
                });
            }
            
        }

        $scope.CourseBasedSectionList = [];
        $scope.CourseBasedSectionFunction = function () {
            var obj = {

                CourseId: $scope.CourseId

            };
            //console.log(obj);


            $http.post(baseUrl + '/getCourseBasedSectionList', obj).then(function success(response) {
                //console.log(response.data)
                $scope.CourseBasedSectionList = response.data;
            });

        }

        

        $scope.MediumList = [];
        $http.post(baseUrl + '/getmediumlist', InstObj).then(function success(response) {
            $scope.Mediumlist = response.data;
            // console.log(response.data);
        });

        $scope.CourseList = [];
        $http.get(baseUrl + '/getcourselist').then(function success(response) {
            $scope.Courselist = response.data;
        });

        $scope.AcademicYearList = [];
        $http.get(baseUrl + '/getAcademicYearList').then(function success(response) {
            $scope.AcademicYearList = response.data;
            $scope.AcyYear = $ff(response.data, {
                academicflag: 1
            });
            $scope.AcademicYearId = $scope.AcyYear[0].id.toString();
        });

        $scope.CourseExamList = [];
        $http.get(baseUrl + '/getCourseBasedExamList').then(function success(response) {
            $scope.CourseExamList = response.data;
        });

        $scope.ExamNameList = [];
        $http.get(baseUrl + '/getExamNameList').then(function success(response) {
            $scope.ExamNameList = response.data;
        });

        $scope.SectionList = [];
        $http.get(baseUrl + '/getSectionList').then(function success(response) {
            $scope.SectionList = response.data;
        });
        $scope.SubjectList = [];
        $http.get(baseUrl + '/getSubjectNamelist').then(function success(response) {
            $scope.SubjectList = response.data;
        });


        $scope.CourseBasedSectionList = [];
        $http.post(baseUrl + '/getCourseBasedSectionList').then(function success(response) {
            $scope.CourseBasedSectionList = response.data;
        });

        $scope.ExaminationList = [];
        $http.get(baseUrl + '/getExaminationList').then(function success(response) {
            $scope.ExaminationList = response.data;
            // console.log(response.data);
        });


        $scope.AddEdit = function () {

            var cnt = ($filter('filter')($scope.StudentList, 'true')).length;
            if (cnt == 0) {
                alert("Please select atleast one item");
            } else {
                $scope.ExamWiseMarkEntry_AddEdit();
            }
        };


        $scope.ExamWiseMarkEntry_AddEdit = function () {
            //console.log($scope.ExamwiseSubjectList);
            //console.log($scope.StudentList);

            angular.forEach($scope.ExamwiseSubjectList, function (subj, marindex) {

                angular.forEach($scope.StudentList, function (student, studentindex) {




                    if (subj.StudentId == student.StudentId && subj.MarksObtained != null) {


                        var obj = {
                            Id: $scope.Id,
                            Institution_Id:$scope.Institution_Id,
                            StudentId: student.Id,
                            CourseId: $scope.CourseId,
                            SubjectNameId: subj.SubjectId,
                            MarksObtained: subj.MarksObtained,
                            //MarksObtained:$scope.Marks,
                            Attendance: subj.Attendance,
                            AcademicYearId: $scope.AcademicYearId,
                            ExamNameId: $scope.ExamNameId

                        };

                        //console.log(obj);
                        $http.post(baseUrl + '/addExaminationMarks', obj).then(function success(response) {
                            if (response.data !== 0) {
                                //  console.log(response.data);

                                //$scope.CancelPopup();
                                $sid = response.data;
                                //console.log($sid);
                                // $scope.enquiryformlistsave($sid);
                            } else {
                                alert("Insert/Update Problem");
                            }
                        });

                    }
                });
            });
            alert("Added/Updated successfully");
        };
        $scope.ExamBasedSubjectList = [];
        $scope.ExamBasedSubject = function () {
            var obj = {

                CourseId: $scope.CourseId,

                ExamNameId: $scope.ExamNameId

            };
            //console.log(obj);

            $http.post(baseUrl + '/getExamBasedSubjectList', obj).then(function success(response) {
                //console.log(response.data);
                $scope.ExamBasedSubjectList = response.data;
            });
        }
        $scope.ExamwiseSubjectList = [];
        $scope.totalAmount = function () {
            var total = 0;
            for (count = 0; count < $scope.ExamwiseSubjectList.length; count++) {
                total += parseInt($scope.ExamwiseSubjectList[count].MarksObtained, 10);
            }
            return total;
        };


    }
]);
//this is for Examwise Marks controller
OEMSController.controller("ExamWiseMarkEntryController", ['$scope', '$http', '$state', 'filterFilter', '$stateParams', '$filter',
    function ($scope, $http, $state, $ff, $stateParams, $filter) {
        if(loginFrom==0)
        {
             window.location.href = baseUrl + "/";        
        }
        //Initialize the values
        $scope.FirstLanguage = '';
        $scope.SecondLanguage = '';
        $scope.Subject1 = '';
        $scope.Subject2 = '';
        $scope.Subject3 = '';
        $scope.Remarks = '';
        // Checkbox Initialisation
        $scope.StudSelectionList = [];

        //list page initialisation
        // $scope.AcademicYearId = '2';
        $scope.MediumId = '';
        $scope.CourseId = '';

        $scope.ExamNameId = '';
        $scope.flag = 0;


        $scope.CommonTransId = "0";
        $scope.CommonTransName = "";
        $scope.CommonTransaction_Title = "";
        /* This is function for Pagination */
        $scope.listdata = [];
        $scope.current_page = 1;
        $scope.page_size = 10;
        $scope.rembemberCurrentPage = function (p) {
            $scope.current_page = p
        }
        $scope.ExamClearfunction = function () {
            $scope.ExamNameId = "";
            $scope.SectionId = "";

        };

        $scope.model = {
            selectedLabelList: []
        }

        $scope.isSelectAll = function () {
            $scope.model.selectedLabelList = [];
            if ($scope.master) {
                $scope.master = true;
                for (var i = 0; i < $scope.StudentList.length; i++) {
                    $scope.model.selectedLabelList.push($scope.StudentList[i].Id);
                }
            } else {
                $scope.master = false;
            }
            angular.forEach($scope.StudentList, function (item) {
                item.selectedstudent = $scope.master;
            });
        }

        $scope.Validationcontrols = function () {
            if (typeof ($scope.AcademicYearId) == "undefined" || $scope.AcademicYearId == "") {
                alert("Please select Academic Year");
                return false;

            } else if (typeof ($scope.CourseId) == "undefined" || $scope.CourseId == "") {
                alert("Please select Course");
                return false;
            } else if (typeof ($scope.SectionId) == "undefined" || $scope.SectionId == 0) {
                alert("Please select Section");
                return false;
            } else if (typeof ($scope.ExamNameId) == "undefined" || $scope.ExamNameId == 0) {
                alert("Please select Exam Name");
                return false;
            }
            return true;
           
        }



        $scope.flag = 0;
        $scope.StudentList = [];
        $scope.examwiselistsearch = function () {
            if ($scope.Validationcontrols() == true) {
                angular.forEach($scope.ExamBasedSubjectList, function (student, studentindex) {
                    var obj = {
                        AcademicYearId: $scope.AcademicYearId,
                        MediumId: $scope.MediumId,
                        CourseId: $scope.CourseId,
                        SectionId: $scope.SectionId,
                        ExamNameId: $scope.ExamNameId
                    };
                    //console.log(obj);
                    $http.post(baseUrl + '/getExamwiseMarkEntryList', obj).then(function success(response) {
                        //console.log(response.data);
                        $scope.emptydata = [];
                        $scope.StudentList = [];
                        // $scope.Marklist=[];
                        // $scope.Marklist=response.data;
                        $scope.StudentList = response.data;
                        var csobj = {
                            AcademicYearId: $scope.AcademicYearId,
                            CourseId: $scope.CourseId,
                            ExamNameId: $scope.ExamNameId
                        }
                        $http.post(baseUrl + '/getExaminationList', csobj).then(function success(response) {
                            $scope.ExamwiseSubjectList = [];
                            $scope.ExamwiseSubjectList = response.data;

                            if ($scope.ExamwiseSubjectList.length > 0) {
                                $scope.flag = 1;
                            } else {
                                $scope.flag = 0;
                            }
                        });


                    });
                });
            }
        }

        $scope.CourseBasedSectionList = [];
        $scope.CourseBasedSectionFunction = function () {
            var obj = {
                CourseId: $scope.CourseId
            };

            $http.post(baseUrl + '/getCourseBasedSectionList', obj).then(function success(response) {
                //console.log(response.data)
                $scope.CourseBasedSectionList = response.data;
            });

        }        

        $scope.MediumList = [];
        $http.post(baseUrl + '/getmediumlist', InstObj).then(function success(response) {
            $scope.Mediumlist = response.data;
            // console.log(response.data);
        });

        $scope.CourseList = [];
        $http.get(baseUrl + '/getcourselist').then(function success(response) {
            $scope.Courselist = response.data;
        });

        $scope.AcademicYearList = [];
        $http.get(baseUrl + '/getAcademicYearList').then(function success(response) {
            $scope.AcademicYearList = response.data;
            $scope.AcyYear = $ff(response.data, {
                academicflag: 1
            });
            $scope.AcademicYearId = $scope.AcyYear[0].id.toString();
        });

        $scope.CourseExamList = [];
        $http.get(baseUrl + '/getCourseBasedExamList').then(function success(response) {
            $scope.CourseExamList = response.data;
        });

        $scope.ExamNameList = [];
        $http.get(baseUrl + '/getExamNameList').then(function success(response) {
            $scope.ExamNameList = response.data;
        });

        $scope.SectionList = [];
        $http.get(baseUrl + '/getSectionList').then(function success(response) {
            $scope.SectionList = response.data;
        });
        $scope.SubjectList = [];
        $http.get(baseUrl + '/getSubjectNamelist').then(function success(response) {
            $scope.SubjectList = response.data;
        });


        $scope.CourseBasedSectionList = [];
        $http.post(baseUrl + '/getCourseBasedSectionList').then(function success(response) {
            $scope.CourseBasedSectionList = response.data;
        });

        $scope.ExaminationList = [];
        $http.get(baseUrl + '/getExaminationList').then(function success(response) {
            $scope.ExaminationList = response.data;
        });


        $scope.AddEdit = function () {
            var cnt = ($filter('filter')($scope.StudentList, 'true')).length;
            if (cnt == 0) {
                alert("Please select atleast one item");
            } else {
                $scope.ExamWiseMarkEntry_AddEdit();
            }
        };


        $scope.ExamWiseMarkEntry_AddEdit = function () {
            //console.log($scope.ExamwiseSubjectList);
            //console.log($scope.StudentList);

            angular.forEach($scope.ExamwiseSubjectList, function (subj, marindex) {

                angular.forEach($scope.StudentList, function (student, studentindex) {
                    if (subj.StudentId == student.StudentId && subj.MarksObtained != null) {
                        var obj = {
                            Id: $scope.Id,
                            Institution_Id:$scope.Institution_Id,
                            StudentId: student.Id,
                            CourseId: $scope.CourseId,
                            SubjectNameId: subj.SubjectId,
                            MarksObtained: subj.MarksObtained,
                            //MarksObtained:$scope.Marks,
                            Attendance: subj.Attendance,
                            AcademicYearId: $scope.AcademicYearId,
                            ExamNameId: $scope.ExamNameId
                        };

                        $http.post(baseUrl + '/addExaminationMarks', obj).then(function success(response) {
                            if (response.data !== 0) {
                                $sid = response.data;
                            } else {
                                alert("Insert/Update Problem");
                            }
                        });

                    }
                });
            });
            alert("Added/Updated successfully");
        };
        $scope.ExamBasedSubjectList = [];
        $scope.ExamBasedSubject = function () {
            var obj = {

                CourseId: $scope.CourseId,

                ExamNameId: $scope.ExamNameId

            };
            //console.log(obj);

            $http.post(baseUrl + '/getExamBasedSubjectList', obj).then(function success(response) {
                //console.log(response.data);
                $scope.ExamBasedSubjectList = response.data;
            });
        }
        $scope.ExamwiseSubjectList = [];
        $scope.totalAmount = function () {
            var total = 0;
            for (count = 0; count < $scope.ExamwiseSubjectList.length; count++) {
                total += parseInt($scope.ExamwiseSubjectList[count].MarksObtained, 10);
            }
            return total;
        };


    }
]);

//this is for Examination Marks controller
OEMSController.controller("GenerateQuestionPaperController", ['$scope', '$http', '$state', '$filter', '$stateParams', '$window', 'filterFilter','$timeout','$interval',
function ($scope, $http, $state, $filter, $stateParams, $window, $ff,$timeout,$interval) {
    if(loginFrom==0)
    {
         window.location.href = baseUrl + "/";        
    }
    // Values Initialization for Paper Pattern
    $scope.Pagetype = $stateParams.view;
  
   
    $scope.InstitutionId =$window.localStorage['Institution_Id'];
    var InstObj = {
        InstitutionId: $scope.InstitutionId
    }
    $scope.AcademicYear = "2";
    $scope.Course = "0";
    $scope.MediumName = "";
    $scope.ExamName = "";
    $scope.SubjectName = "";
    $scope.QuestionPaperSection = "";
    $scope.NumberofQuestions = '';
    $scope.Answers = '';
    $scope.Marks = '';
    $scope.Remarks = '';
    $scope.GenerateCheck_tag = 0;
    $scope.PrintCheck_tag = 0;
    // Value Initialization for Question Bank
    $scope.QBAcademicYear = "0";
    $scope.QBCourse = "0";
    $scope.QBMedium = "";
    $scope.QBExamName = "0";
    $scope.QBSubject = "0";
    $scope.QBQuestionPaperSection = "0";
    $scope.PaperType = "";
    $scope.Questions = '';
    $scope.timeout = 0 ;
    $scope.Printpdf_tag = 0;
    // Filter Function Initialisation
    $scope.AcademicYearId = "";
    $scope.CourseId = "";
    $scope.SubjectId = "";
    $scope.ExamNameId = "";

    $scope.QBAcademicYearId = "0";
    $scope.QBCourseId = "0";
    $scope.QBExamNameId = "0";
    $scope.PaperTypeId = "0";

    /* This is function for Pagination */
    $scope.listdata = [];
    $scope.current_page = 1;
    $scope.page_size = 10;
    $scope.rembemberCurrentPage = function (p) {
        $scope.current_page = p
    }
    $scope.QuestionPaper_PDFOpen = function (p) {
        $scope.Print_File_URL = "/Uploads/Images/Question Paper/" +p.File_URL;    
        angular.element('#QuestionPaperPrint_PDFModal').modal('show');
    }
    $scope.AcademicYearList = [];
    $http.post(baseUrl + '/getAcademicYearList',InstObj).then(function success(response) {
        $scope.AcademicYearList = response.data;
        $scope.AcyYear = $ff(response.data, {
            academicflag: 1
        });
        // $scope.QBAcademicYear = $scope.AcyYear[0].id.toString();
    });
    
    $scope.QuestionBankValidationcontrols = function () {
        if (typeof ($scope.QBAcademicYear) == "undefined" || $scope.QBAcademicYear == "0") {
            alert("Please select Academic Year");
            return false;
        } else if (typeof ($scope.QBCourse) == "undefined" || $scope.QBCourse == "0") {
            alert("Please select Course");
            return false;
        } else if (typeof ($scope.QBExamName) == "undefined" || $scope.QBExamName == "0") {
            alert("Please select Exam Name");
            return false;
        } else if (typeof ($scope.QBSubject) == "undefined" || $scope.QBSubject == "0") {
            alert("Please select Subject Name");
            return false;
        } else if (typeof ($scope.PaperType) == "undefined" || $scope.PaperType == "") {
            alert("Please select Paper Type");
            return false;
        } 
        return true;
    };

    $scope.AcademicYearBasedCourseFunction = function () {
        if ($scope.QBAcademicYearId == 0) {
            $http.post(baseUrl + '/getcourselist', InstObj).then(function success(response) {
                $scope.Courselist = response.data;
            });
        } else {
            var obj = {
                AcademicYearId: $scope.QBAcademicYearId,
                InstitutionId: $scope.InstitutionId
            }
            $http.post(baseUrl + '/getAcademicYearBasedCourse', obj).then(function success(response) {
                $scope.Courselist = response.data;
            });
        }
    }

    $scope.CourseClearFunction = function () {
        $scope.QBCourseId = '0';
    };

    $scope.CourseBasedExamNameFunction = function () {
        // alert('hi');
        if ($scope.QBCourseId == 0) {
            $http.post(baseUrl + '/getExamNameList', InstObj).then(function success(response) {
                $scope.ExamNameList = response.data;
            });
        } else {

            var obj = {
                AcademicYearId: $scope.QBAcademicYearId,
                CourseId: $scope.QBCourseId

            }
            $http.post(baseUrl + '/getCourseBasedExamList', obj).then(function success(response) {
                $scope.ExamNameList = response.data;
            });
        }

    };

    $scope.AcademicYearBasedCourseForAddmodal = function () {
        if ($scope.QBAcademicYear == 0) {
            $http.get(baseUrl + '/getcourselist').then(function success(response) {
                $scope.Courselist = response.data;
            });
        } else {
            var obj = {
                AcademicYearId: $scope.QBAcademicYear,
                InstitutionId: $scope.InstitutionId
            }
            $http.post(baseUrl + '/getAcademicYearBasedCourse', obj).then(function success(response) {
                $scope.Courselist = response.data;
            });
        }
    }

    $scope.CourseClearFun = function () {
        $scope.QBCourse = '0';
    }

    $scope.CourseBasedExamNameForAddmodal = function () {
        // alert('hi');
        if ($scope.QBCourse == 0) {
            $http.get(baseUrl + '/getExamNameList').then(function success(response) {
                $scope.ExamNameList = response.data;
            });
        } else {

            var obj = {
                AcademicYearId: $scope.QBAcademicYear,
                CourseId: $scope.QBCourse

            }
            $http.post(baseUrl + '/getCourseBasedExamList', obj).then(function success(response) {
                $scope.ExamNameList = response.data;
            });
        }

    };

    $scope.ExamNameClearFun = function () {
        // alert('hi');
        $scope.QBExamName = '0';
    }
    $scope.SubjectListObj=[];
    $scope.QBSubjectId="0";
    $scope.ExamBasedSubjectforList = function () {
        var obj = {
            AcademicYearId: $scope.QBAcademicYearId,
            CourseId: $scope.QBCourseId,
            ExamNameId: $scope.QBExamNameId
        }

        $http.post(baseUrl + '/getExamBasedSubjectList', obj).then(function success(response) {
            $scope.SubjectListObj = response.data;
            // $scope.SubjectListObj = $ff(response.data, {
            //     SubjectParentId: 0
            // });;

        });
    };
    $scope.TodaySubjectListObj = [];   
    $scope.ExamBasedSubjectforList_Print = function () {
       
        var obj = {
            AcademicYearId: $scope.QBAcademicYearId,
            CourseId: $scope.QBCourseId,
            ExamNameId: $scope.QBExamNameId
        }

        $http.post(baseUrl + '/getExamBasedSubjectList_Print', obj).then(function success(response) {
           
            $scope.SubjectListObj = response.data;
            angular.forEach($scope.SubjectListObj, function (value, index) {
                
                if(($filter('date')(value.examdate, 'dd-MMM-yyyy')) == ($filter('date')(new Date(), 'dd-MMM-yyyy'))  )
                $scope.TodaySubjectListObj.push(value);  
            }); 
              
                $scope.QBSubjectId =  $scope.TodaySubjectListObj[0].id;
              
            // $scope.SubjectListObj = $ff(response.data, {
            //     SubjectParentId: 0
            // });;
           
        });
     
    };
    $scope.ExamBasedSubjectforAddmodal = function () {
        var obj = {
            AcademicYearId: $scope.QBAcademicYear,
            CourseId: $scope.QBCourse,
            ExamNameId: $scope.QBExamName
        }

        $http.post(baseUrl + '/getExamBasedSubjectList', obj).then(function success(response) {
            $scope.SubjectList = response.data;
            // $scope.SubjectList = $ff(response.data, {
            //     SubjectParentId: 0
            // });;

        });
    };

    $scope.QuestionChildAddList=[];
    
    $scope.ErrorFunction = function () {
        alert("Inactive record cannot be edited");
    }

    $scope.PaperTypeList = [];
    $http.post(baseUrl + '/getPaperTypeList', InstObj).then(function success(response) {
        $scope.PaperTypeList = response.data;
    });
    $scope.ListValidationcontrols = function () {
        if (typeof ($scope.QBAcademicYearId) == "undefined" || $scope.QBAcademicYearId == 0) {
            alert("Please select Academic Year");
            return false;
        }
        else if (typeof ($scope.QBCourseId) == "undefined" || $scope.QBCourseId == 0) {
            alert("Please select Course");
            return false;
        }
        else if (typeof ($scope.QBExamNameId) == "undefined" || $scope.QBExamNameId == 0) {
            alert("Please select Exam");
            return false;
        }
        else if (typeof ($scope.QBSubjectId) == "undefined" || $scope.QBSubjectId == 0) {
            alert("Please select Subject");
            return false;
        }
        else if (typeof ($scope.PaperTypeId) == "undefined" || $scope.PaperTypeId == 0) {
            alert("Please select Paper Type");
            return false;
        }
        return true;

    }
    // $scope.clock = "loading clock..."; // initialise the time variable
    // $scope.tickInterval = 1000 //ms

    // var tick = function () {
    //     $scope.clock = Date.now() // get the current time
    //     $timeout(tick, $scope.tickInterval); // reset the timer
    // }

    // // Start the timer
    // $timeout(tick, $scope.tickInterval);

    // var tick = function() {
    //     $scope.clock = Date.now();
    //   }
    //   tick();
    //   $interval(tick, 1000);
    
    //Initiate the Timer object.
    $scope.Timer = null;
 
    //Timer start function.
    $scope.StartTimer = function (StartTime,EndTime) {
        $scope.StartTime = StartTime;
        $scope.TargetTime = EndTime;
        //Set the Timer start message.
        if($scope.Pagetype == 1){
        $scope.Message = "Generate Question Paper.. ";
        }
        else 
        {
            $scope.Message = "Print Question Paper.. ";
        }
        //Initialize the Timer to run every 1000 milliseconds i.e. one second.
        $scope.Timer = $interval(function () {
            //Display the current time.
            var time = $filter('date')(new Date(), 'HH:mm:ss');
            $scope.Message = "Now the Time is.. " + time;
            if($scope.TargetTime == time){
                $scope.StopTimer();
                $scope.timeout = 1;
            }
            if(StartTime == time){
                $scope.QuestionBanklist();
              
            }
          
        }, 1000);
       
    };

    //Timer stop function.
    $scope.StopTimer = function () {

        //Set the Timer stop message.
        $scope.Message = "Sorry, Time Out.";

        //Cancel the Timer.
        if (angular.isDefined($scope.Timer)) {
            $interval.cancel($scope.Timer);
        }
    };
    $scope.row = [];
    $scope.QuestionSectionList = [];
    $scope.timerclear = function () {
    $scope.clock= "";
    $scope.Message = "";
    }
    $scope.Question_PrintPDF_List = function () {
        var obj = {
            QBAcademicYearId: $scope.QBAcademicYearId,
            QBCourseId: $scope.QBCourseId,
            PaperTypeId: $scope.PaperTypeId,
            QBExamNameId: $scope.QBExamNameId,
            QBSubjectId:$scope.QBSubjectId,
            IsActive: "1"
        };
    $http.post(baseUrl + '/getQuestionPaper_PrintCheck', obj).then(function success(response) {
        if(response.data.length > 0 ){
            $scope.Printpdf_tag = 1;
            $scope.Print_file_Url = response.data;
        }
        else 
        {
            $scope.Printpdf_tag = 0;
           
             $scope.Message = "There is no Exam schedule today" ;
        }
    });
    }
    $scope.Print_file_Url = [];
    $scope.QuestionBanklist = function () {
       
        $scope.timerclear() ;
        if ($scope.ListValidationcontrols() == true) {
            var obj = {
                QBAcademicYearId: $scope.QBAcademicYearId,
                QBCourseId: $scope.QBCourseId,
                PaperTypeId: $scope.PaperTypeId,
                QBExamNameId: $scope.QBExamNameId,
                QBSubjectId:$scope.QBSubjectId,
                IsActive: "1"
            };
          
        if($scope.Pagetype == 1){
                    $http.post(baseUrl + '/getQuestionBank_GenerateCheck', obj).then(function success(response) {
                       $scope.GenerateCheck = response.data[0].id;
                       $scope.Exam_StartTime = response.data[0].generate_starttime;                      
                       $scope.Exam_EndTime = response.data[0].generate_endtime;
                       $scope.Generate_StartTime = response.data[0].starttime;                      
                       $scope.Generate_EndTime = response.data[0].endtime;
                       $scope.Generate_Timediff = response.data[0].timediff;
                       $scope.timetoGenerate = response.data[0].timetogenerate;
                       $scope.Genereate_questionpaperid = response.data[0].questionpaperid;

                       if($scope.Generate_EndTime == $scope.Generate_Timediff)
                       {
                        $scope.clock = "Time Out!";
                        $scope.timeout = 1 ;
                        $scope.StopTimer();
                       }
                       else if ($scope.Generate_EndTime != $scope.Generate_Timediff)
                       {
                        $scope.StartTimer($scope.timetoGenerate,$scope.Generate_StartTime);
                       }
                    
                    if( $scope.GenerateCheck > 0 && $scope.Genereate_questionpaperid ==0 )
                    {
                        $scope.GenerateCheck_tag = 1;
                        $http.post(baseUrl + '/getQuestionBankList', obj).then(function success(response) {
                            $scope.row = [];
                            $scope.row = response.data;
                        });
            
                        $http.post(baseUrl + '/getQuestionPaperChildView', obj).then(function success(response) {
                            $scope.QuestionSectionList = [];
                            $scope.QuestionSectionList = response.data;
                        });
                    }
                    else if( $scope.GenerateCheck == 0 && $scope.Genereate_questionpaperid ==0  ) {
                        $scope.GenerateCheck_tag = 0;
                        $scope.clock = $scope.Generate_Timediff  + "      More to Generate Question Paper!";
                    }
                    else if ($scope.Genereate_questionpaperid > 0 )
                    {

                        $scope.clock = "Question Paper already Generated!";
                        $scope.GenerateCheck_tag = 0;
                        $http.post(baseUrl + '/getQuestionBankList', obj).then(function success(response) {
                            $scope.row = [];
                            $scope.row = response.data;
                        });
            
                        $http.post(baseUrl + '/getQuestionPaperChildView', obj).then(function success(response) {
                            $scope.QuestionSectionList = [];
                            $scope.QuestionSectionList = response.data;
                            $scope.PrintSubjectName = response.data[1].SubjectName;
                        });
                    }
                });
                }
            if($scope.Pagetype == 2){
               
               
                    $http.post(baseUrl + '/getQuestionBank_PrintCheck', obj).then(function success(response) {
                        if(response.data.length == 0 )
                       {
                        $scope.PrintCheck_tag = 2;
                          $scope.Message2 = "There is no Exam today" ;}
                        $scope.PrintCheck = response.data[0].id;
                       $scope.Exam_StartTime = response.data[0].generate_starttime;                      
                       $scope.Exam_EndTime = response.data[0].generate_endtime;
                       $scope.Print_StartTime = response.data[0].starttime;                      
                       $scope.Print_EndTime = response.data[0].endtime;
                       $scope.Print_Timediff = response.data[0].timediff;
                       $scope.timetoPrint = response.data[0].timetogenerate;
                       $scope.Print_questionpaperid = response.data[0].questionpaperid;
                     
                       if($scope.Print_EndTime == $scope.Print_Timediff)
                       {
                        $scope.clock = "Time Out!";
                        $scope.timeout = 1 ;
                        $scope.StopTimer();
                       }
                       else if ($scope.Print_EndTime != $scope.Print_Timediff)
                       {
                        $scope.StartTimer($scope.timetoPrint,$scope.Print_StartTime);
                       }
                   
            if( $scope.PrintCheck > 0 && $scope.Print_questionpaperid >0)
            {
                $scope.PrintCheck_tag = 1;
                $http.post(baseUrl + '/getQuestionBankList', obj).then(function success(response) {
                    $scope.row = [];
                    $scope.row = response.data;
                });
    
                $http.post(baseUrl + '/getQuestionPaperChildView', obj).then(function success(response) {
                    $scope.QuestionSectionList = [];
                    $scope.QuestionSectionList = response.data;
                    $scope.PrintSubjectName = response.data[1].SubjectName;
                });
            }
            else if( $scope.PrintCheck == 0 && $scope.Print_questionpaperid >0) {
                $scope.PrintCheck_tag = 0;
                $scope.clock = $scope.Print_Timediff  + "      More to Print Question Paper!";
            }
           
            if ($scope.Print_questionpaperid == 0 && $scope.Printid == 0)
            {

                $scope.clock = "Question Paper Not Generated!";
            }
            // else if ($scope.Print_questionpaperid == 0 && $scope.Printid > 0){
            //     $scope.Printpdf_tag = 1;
            //     $scope.clock = "Click Print Pdf to Print Question Paper !";
            // }
        });
    
        }
        }
    }


    $scope.GenerateQP=function()
    {
        var obj = {
            QBAcademicYearId: $scope.QBAcademicYearId,
            QBCourseId: $scope.QBCourseId,
            PaperTypeId: $scope.PaperTypeId,
            QBExamNameId: $scope.QBExamNameId,
            QBSubjectId:$scope.QBSubjectId,
            IsActive: "1"
        };
        $http.post(baseUrl + '/postQuestionPaperGeneration', obj).then(function success(response) {
            if (response.data !== 0) {
                alert("Question paper generated successfully");
                $scope.clearData();
                $scope.GenerateCheck_tag = 0;
            } else {
                alert("Insert/Update Problem");
            }
        });

    }
    $scope.PrintQP = function()
    {
        angular.element('#QuestionPaperPrintModal').modal('show');
    }
    $scope.PrintQPOutput = function()
    {
        angular.element('#QuestionPaperPrintModal').modal('show');
    }
    $scope.CancelPrintPopup = function()
    {
        angular.element('#QuestionPaperPrintModal').modal('hide');
    }
    $scope.CancelPrint_PdfPopup = function()
    {
        angular.element('#QuestionPaperPrint_PDFModal').modal('hide');
    }
    $scope.clearData=function()
    {
        $scope.QBAcademicYearId = "0";
        $scope.QBCourseId = "0";
        $scope.QBExamNameId = "0";
        $scope.QBSubjectId = "0";
        $scope.PaperTypeId = "0";
        $scope.row = [];
    }
}
]);
OEMSController.controller("ExamcenterAllocationController", ['$scope', '$http', '$state', '$filter', '$stateParams', '$window', 'CommonLabelNames', 'CommonHeadingNames', 'CommonButtonNames', 'filterFilter',
    function ($scope, $http, $state, $filter, $stateParams, $window, $CommonLabelNames, $CommonHeadingNames, $CommonButtonNames, $ff) {
        if(loginFrom==0)
        {
             window.location.href = baseUrl + "/";        
        }
        $scope.InstitutionId = $window.localStorage['Institution_Id'];
        var InstObj = {
            InstitutionId: $scope.InstitutionId
        }
        //Value Initialisation
        $scope.AcademicYearId = '0';
        $scope.MediumId = '';
        $scope.CourseId = '0';
        $scope.SectionId = '';
        $scope.flag = 0;
        $scope.ExamId="0";

        $scope.EditLanguageModal = function (OTId) {
            $scope.Id = OTId;
            angular.element('#AssignEnrollmentNumberAddModal').modal('show');
        }
        /* This is function for Pagination */
        $scope.listdata = [];
        $scope.current_page = 1;
        $scope.page_size = 10;
        $scope.rembemberCurrentPage = function (p) {
            $scope.current_page = p
        }
        $scope.AssignExamListValidations = function () {
            if (typeof ($scope.AcademicYearId) == "undefined" || $scope.AcademicYearId == "") {
                alert("Please select Academic Year");
                return false;
            }
            else if (typeof ($scope.CourseId) == "undefined" || $scope.CourseId == "0") {
                alert("Please select Course");
                return false;
            }
            else if (typeof ($scope.MediumId) == "undefined" || $scope.MediumId == "") {
                alert("Please select Medium");
                return false;
            }
            else if (typeof ($scope.SectionId) == "undefined" || $scope.SectionId == "") {
                alert("Please select Section");
                return false;
            }
            else if (typeof ($scope.ExamId) == "undefined" || $scope.ExamId == "0") {
                alert("Please select Exam");
                return false;
            }
            
            return true;
        };
      
        $scope.getFilterHeaders = function (filterList, filterValue) {
            return $filter('filter')(filterList, function (obj) {
                if (obj.Id == filterValue)
                    return obj;
            })[0];
        };
        $scope.ExamNameList=[];
        $scope.CourseBasedExamNameFunction = function () {
            if ($scope.CourseId == 0) {
                $http.post(baseUrl + '/getExamNameList', InstObj).then(function success(response) {
                    $scope.ExamNameList = response.data;
                });
            } else {
                var obj = {
                    AcademicYearId: $scope.AcademicYearId,
                    CourseId: $scope.CourseId
                }
                $http.post(baseUrl + '/getCourseBasedExamList', obj).then(function success(response) {
                    $scope.ExamNameList = response.data;
                });
            }

        };
        
        $scope.AcademicYearList = [];
        $http.post(baseUrl + '/getAcademicYearList',InstObj).then(function success(response) {
            $scope.AcademicYearList = $ff(response.data, {
                status: 0
            });
            $scope.AcyYear = $ff(response.data, {
                academicflag: 1
            });
            $scope.AcademicYearId = $scope.AcyYear[0].id.toString();
            $scope.AcademicYearBasedCourseFunction();
            $scope.CourseBasedSectionFunction();
        });
        
        $scope.AcademicYearBasedCourseFunction = function () {
            if ($scope.AcademicYearId == 0) {
                $http.post(baseUrl + '/getcourselist', InstObj).then(function success(response) {
                    $scope.Filter_Courselist = response.data;
                });
            } else {
                var obj = {
                    AcademicYearId: $scope.AcademicYearId,
                    InstitutionId : $scope.InstitutionId
                }
                $http.post(baseUrl + '/getAcademicYearBasedCourse', obj).then(function success(response) {
                    $scope.Filter_Courselist = response.data;
                });
            }
        }

        $scope.CourseBasedSectionList = [];
        $scope.CourseBasedSectionFunction = function () {
            if ($scope.CourseId == 0) {
                $http.post(baseUrl + '/getSectionList', InstObj).then(function success(response) {

                    $scope.CourseBasedSectionList = response.data;
                });
            } else {
                var obj = {
                    AcademicYearId: $scope.AcademicYearId,
                    CourseId: $scope.CourseId
                };

                $http.post(baseUrl + '/getCourseBasedSectionList', obj).then(function success(response) {
                    $scope.CourseBasedSectionList = response.data;
                });
            }
        }

        $scope.SectionList = [];
        $http.post(baseUrl + '/getSectionList', InstObj).then(function success(response) {
            $scope.SectionList = response.data;
        });

        $scope.MediumList = [];
        $http.post(baseUrl + '/getmediumlist',InstObj).then(function success(response) {
            $scope.Mediumlist = response.data;
        });

        $http.post(baseUrl + '/getCenterName', InstObj).then(function success(response) {
            $scope.CenterNameList = response.data;
          
        });
        $scope.StudSelectionList = [];


        $scope.RollLanguageassign = function () {
            var cnt = ($filter('filter')($scope.studentlist, 'true')).length;
            if (cnt == 0) {
                alert("Please select atleast one student to assign Language");
            } else {
                angular.element('#AssignEnrollmentNumberAddModal').modal('show');
            }
        };
        $scope.CourseClearFunction = function () {
            $scope.CourseId = "0";
        }

        $scope.SectionClearFunction = function () {
            $scope.SectionId = "";
        }
        
        $scope.Centername="";
        $scope.ExamcenterList = function () {   
            $("#chatLoaderPV").show();         
            var obj = {
                AcademicYearId: $scope.AcademicYearId,
                MediumId: $scope.MediumId,
                CourseId: $scope.CourseId,
                SectionId: $scope.SectionId,
                ExamNameId: $scope.ExamId,
                SubjectNameId: $scope.SubjectNameId
            };
            $http.post(baseUrl + '/AssignExamCenter', obj).then(function success(response) {
                
                $scope.emptydata = [];
                $scope.AssignExamCenterList = [];
                $scope.AssignExamCenterList = response.data;
                
                if ($scope.AssignExamCenterList.length > 0) {
                    $scope.flag = 1;
                } else {
                    $scope.flag = 0;
                }

                angular.forEach($scope.AssignExamCenterList, function (value, index) {
                    value.ExamCenter_Id = value.ExamCenter_Id.toString();    
                });
                $("#chatLoaderPV").hide();
            }); 
            
        }
        
        $scope.AssignEnrollmentNumber_AddEdit = function () {
            if ($scope.Validationcontrols() == true) {

                $scope.CancelPopup();
                alert("Language Assigned Successfully");
            }
        };
        $scope.Historyaddedit = function () {
            angular.forEach($scope.AssignExamCenterList, function (value, index) {
                var obj = {
                    StudentId: value.StudentId
               
                };

            });
            //});
        };

        $scope.AddEdit = function () {

            var cnt = ($filter('filter')($scope.AssignExamCenterList, 'true')).length;
            if (cnt == 0) {
                alert("Please select atleast one student");
            } else {
                $scope.StudentExamCenter_AddEdit();
            }
        };


        $scope.DuplicateId = 0;

        $scope.Value = [];
        $scope.StudentExamCenter_AddEdit = function () {
            var duplicate = false;
                if (duplicate == false) {
                    $scope.ExamCenterHistory_AddEdit();
                }            
        };


        $scope.ExamCenterHistory_AddEdit = function () {
            angular.forEach($scope.AssignExamCenterList, function (selectedstudent, studentindex) {

                if (selectedstudent.selectedstudent) {
                    cnt = true;
                    var obj = {
                        AcademicYearId: $scope.AcademicYearId,
                        StudentId: selectedstudent.Id,
                        examId:$scope.ExamId,
                        ExamCenter_Id:selectedstudent.ExamCenter_Id,
                        Institution_Id: $scope.InstitutionId,
                    };
                   //console.log(obj);
                    $http.post(baseUrl + '/addExamcenterAllocation', obj).then(function success(response1) {
                        if (response1.data !== 0) {                          
                            $scope.CancelPopup();
                            $sid = response1.data;
                        } else {
                            alert("Insert/Update Problem");
                        }
                    });

                } //   
            });
            alert("Added/Updated successfully");
        };

        $scope.model = {
            selectedLabelList: []
        }

        $scope.isSelectAll = function () {
            $scope.model.selectedLabelList = [];
            if ($scope.master) {
                $scope.master = true;
                for (var i = 0; i < $scope.AssignExamCenterList.length; i++) {
                    $scope.model.selectedLabelList.push($scope.AssignExamCenterList[i].Id);
                }
            } else {
                $scope.master = false;
            }
            angular.forEach($scope.AssignExamCenterList, function (item) {
                item.selectedstudent = $scope.master;
            });
        }

        $scope.ClearPopup = function () {
            $scope.Id = 0;

            $scope.FirstLanguage = '';
            $scope.SecondLanguage = '';
        };

        $scope.CancelPopup = function () {
            angular.element('#AssignEnrollmentNumberAddModal').modal('hide');
            $scope.ClearPopup();
        }

    }
]);
OEMSController.controller("InstitutionMasterController", ['$scope', '$http', '$state', 'filterFilter', '$stateParams', '$filter',
    function ($scope, $http, $state, $ff, $stateParams, $filter) {
        if(loginFrom==0)
        {
             window.location.href = baseUrl + "/";        
        }
        $scope.Id=0;
        $scope.AddModal = function () {
            angular.element('#InstitutionAddModal').modal('show');
        }
        $scope.CancelPopup = function () {
            angular.element('#InstitutionAddModal').modal('hide');
            angular.element('#InstitutionViewModal').modal('hide');
            $scope.intitutionMasterClearPopup();
        }
        $scope.ViewModal = function (id) {
            //$scope.Id = Id;
            $scope.InstitutionMaster_View(id);
            angular.element('#InstitutionViewModal').modal('show');

        }
        $scope.EditModal = function (Id) {
           // $scope.Id = Id;
            $scope.InstitutionMaster_View(Id);
            angular.element('#InstitutionAddModal').modal('show');
        }
        $scope.StateList = [];
        $http.get(baseUrl + '/getStateList').then(function success(response) {
            $scope.StateList = response.data;
        });

        $scope.CountryList = [];
        $http.get(baseUrl + '/getCountryList').then(function success(response) {
            $scope.CountryList = response.data;
        });

        $scope.LocationList = [];
        $http.get(baseUrl + '/getLocationList').then(function success(response) {
            $scope.LocationList = response.data;
        });
     

      
        $scope.ClearListfunction = function () {
            $scope.StateName = "";

            $scope.LocationName = "";

        };

        $scope.Clearstatefunction = function () {
            $scope.LocationName = "";

        };

     
        $scope.IntitutionMasterAddEdit = function () {

            $scope.uploadphoto = "";
             var fd = new FormData();
             var imgBlob;
             var itemIndexLogo = -1;
             var fd = new FormData();
             if ($('#SchoolLogo')[0].files[0] != undefined) {
                 $scope.uploadphoto = $('#SchoolLogo')[0].files[0]['name'];
                 imgBlob = $scope.dataURItoBlob($scope.SchoolLogoread);
                 itemIndexLogo = 0;
             }

             if (itemIndexLogo != -1) {
                 fd.append('file', imgBlob);
             }

            $scope.SchoolLogoread = '';
             $http.post(baseUrl + '/IntitutionLogo',
                 fd, {
                     transformRequest: angular.identity,
                     headers: {
                         'Content-Type': undefined
                     }
                 }
             ).then(function success(response) {
                 if (response.data == 0) {
                     //console.log("Problem occured on Image upload!!!");
                     responseEmployeePhoto = '';
                     responsePhotoFullPath = '';
                 } else {
                     responseEmployeePhoto = response.data.Filepath;
                     responsePhotoFullPath = response.data.DirectoryPath + response.data.Filename;
                 }
                 var obj = {


                     Id: $scope.Id,
                     InstitutionName:$scope.InstitutionName,
                     InstitutionPrintName:$scope.InstitutionPrintName,
                     Address1: $scope.Address1,
                     Address2: $scope.Address2,
                     CountryId: $scope.CountryName,
                     StateId: $scope.StateName,
                     CityId: $scope.LocationName,
                     Pincode: $scope.Pincode,
                     ContactNumber: $scope.ContactNumber,
                     MobileNumber: $scope.MobileNumber,
                     FaxNumber: $scope.FaxNumber,
                     Email: $scope.Email,
                     Website: $scope.Website,


                     SchoolLogo: responseEmployeePhoto,
                     PhotoName:$scope.SchoolLogoread,
                     PhotoFullPath: responsePhotoFullPath,
                     FromMonthId:$scope.FromMonthId,
                     ToMonthId:$scope.ToMonthId,
                 };
                 $http.post(baseUrl + 'InstitutionMastersAddEdit', obj).then(function success(response) 
                 {
                     if (response.data !== 0) {                         
                         alert("Added/Updated successfully");
                         $scope.CancelPopup();
                         $scope.Institution_list();
                     } else {
                         alert("Insert/Update Problem");
                     }
                 });

             });
         
     };
     $scope.Institution_list = function (obj) {


      
        $http.post(baseUrl + '/getInstitutionlist', obj).then(function success(response) {
                $scope.emptydata = [];
                $scope.Institutionlist = [];
                $scope.Institutionlist = response.data;
                //console.log($scope.Institutionlist );
               
                if ($scope.Institutionlist.length > 0) {
                    $scope.flag = 1;
                } else {
                    $scope.flag = 0;
                }


            
        })
        // }
    }
        $scope.Validationcontrols = function () {

            if (typeof ($scope.InstitutionName) == "undefined" || $scope.InstitutionName == "") {
                alert("Please enter Institution Name");
                return false;
            } else if (EmailFormate($scope.Email) == false) {
                alert("Email is in invalid format");
                return false;
            } else if (DominFormat($scope.Website) == false) {
                alert("Domain is in invalid format");
                return false;
            }
            return true;
        };

        $scope.intitutionMasterClearPopup = function () {

            $scope.InstitutionName = '';
            $scope.InstitutionPrintName = '';
            $scope.Address1 = '';
            $scope.Address2 = '';
            $scope.CountryName = '';
            $scope.StateName = '';
            $scope.LocationName = '';
            $scope.Pincode = '';
            $scope.ContactNumber = '';
            $scope.MobileNumber = '';
            $scope.FaxNumber = '';
            $scope.Email = '';
            $scope.Website = '';
            $scope.SchoolLogo = '';
            $scope.PhotoName = '';
            $scope.PhotoFullPath = '';

        };
        $scope.InstitutionMaster_View = function (Id) {
            
            var data = {
                Id:Id
            }
            //console.log(data);
            $http.post(baseUrl + '/getInstitutionMasterView', data).then(function success(response) {
                //console.log(response.data);
                $scope.Id = response.data[0].id;
                $scope.InstitutionName = response.data[0].institutionname;
                $scope.InstitutionPrintName = response.data[0].institutionprintname;
                $scope.Address1 = response.data[0].address1;
                $scope.Address2 = response.data[0].address2;
                $scope.CountryId = response.data[0].countryid;
                $scope.StateId = response.data[0].stateid;
                $scope.CityId = response.data[0].cityid;
                $scope.Pincode = response.data[0].pincode;
                $scope.ContactNumber = response.data[0].contactnumber;
                $scope.MobileNumber = response.data[0].mobilenumber;
                $scope.FaxNumber = response.data[0].faxnumber;
                $scope.Email = response.data[0].email;
                $scope.Website = response.data[0].website;
                $scope.FromMonthId=response.data[0].frommonthid;
                $scope.ToMonthId=response.data[0].tomonthid;

             
                $scope.CountryName =  response.data[0].countryid == null ? 0 :response.data[0].countryid.toString();
                
                $scope.ViewCountryName = response.data[0].countryname;
                $scope.StateName =  response.data[0].stateid == null ? 0 :response.data[0].stateid.toString();
                $scope.ViewStateName = response.data[0].statename;
                $scope.LocationName =  response.data[0].cityid == null ? 0 :response.data[0].cityid.toString();
                $scope.ViewLocationName = response.data[0].locationname;

                $scope.SchoolLogo = response.data[0].schoollogo;
                $scope.uploadphoto = "/storage/" + response.data[0].schoollogo;
                $scope.PhotoName = response.data[0].photoname;
                $scope.PhotoFullPath = response.data[0].photofullpath;
                //console.log(response.data);
            
            })
        
        };
        $scope.logoChange = function () {

            if ($('#EmployeePhoto')[0].files[0] != undefined) {
                $scope.FileName = $('#EmployeePhoto')[0].files[0]['name'];
            }
        }

        $scope.uploadImage = function (Photo) {
            var filename = "";
            //var fd = new FormData();
            if ($('#EmployeePhoto')[0].files[0] != undefined) {
                filename = $('#EmployeePhoto')[0].files[0]['name'];
                //var imgBlob = $scope.dataURItoBlob($scope.CompanyLogo);
                //fd.append('file', imgBlob);
            }
        }

        /* Clear the
        uploaded image */
        $scope.imageclear = function () {
            $scope.CompanyLogo = "";
            $scope.FileName = "";
            $scope.uploadme = "";
            $scope.uploadphoto = "";
            $('#companyphoto').val('');
        };

        //This is for Document file clear functions//
        $scope.fileclear = function () {
            $('#SchoolLogo').val = ('');
            $scope.DocFileName = "";
        };

        /*This is for getting a file url for uploading the url into the database*/
        $scope.dataURItoBlob = function (dataURI) {
            var binary = atob(dataURI.split(',')[1]);
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            var array = [];
            for (var i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
            }
            return new Blob([new Uint8Array(array)], {
                type: mimeString
            });
        }
        //This is for change photo function//
        $scope.photoChange = function () {

            if ($('#SchoolLogo')[0].files[0] != undefined) {
                $scope.FileName = $('#SchoolLogo')[0].files[0]['name'];
            }
        }


        //this is for image upload function//
        $scope.uploadImage = function (Photo) {
            var filename = "";
            if ($('#SchoolLogo')[0].files[0] != undefined) {
                filename = $('#SchoolLogo')[0].files[0]['name'];
            }
        }
        /*This is for getting a file url for uploading the url into the database*/
        $scope.dataURItoBlob = function (dataURI) {
            var binary = atob(dataURI.split(',')[1]);
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            var array = [];
            for (var i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
            }
            return new Blob([new Uint8Array(array)], {
                type: mimeString
            });
        }

        $scope.InActive = function (Id) {
            $scope.Id = Id;
            var del = confirm("Do you like to inactivate the selected detail?");
            if (del == true) {
                var data = {
                    Id: $scope.Id
                }
                $http.post(baseUrl + '/inactiveInstitution', data).then(function success(response) {
                    if (response.data == 1) {
                        alert("Selected detail has been inactivated successfully");
                        $scope.Institution_list();
                    } else {
                        alert("An error has occurred while deleting Detail");
                        $scope.Institution_list();
                    }
                });
            };
        }

        $scope.Active = function (Id) {
            $scope.Id = Id;
            var del = confirm("Do you like to activate the selected detail?");
            if (del == true) {
                var data = {
                    Id: $scope.Id
                }
                $http.post(baseUrl + '/activeInstition', data).then(function success(response) {
                    if (response.data == 1) {
                        alert("Selected detail has been activated successfully");
                        $scope.Institution_list();
                    } else {
                        alert("An error has occurred while ReInserting detail");
                        $scope.Institution_list();
                    }
                });
            };
        }

        $scope.listdata = [];
        $scope.current_page = 1;
        $scope.page_size = 10;
        $scope.rembemberCurrentPage = function (p) {
            $scope.current_page = p
        }
    }
]);
OEMSController.controller("MarksheetPrintController", ['$scope', '$http', '$state', '$filter', '$stateParams', '$window', 'CommonLabelNames', 'CommonHeadingNames', 'CommonButtonNames', 'filterFilter',
    function ($scope, $http, $state, $filter, $stateParams, $window, $CommonLabelNames, $CommonHeadingNames, $CommonButtonNames, $ff) {
        if(loginFrom==0)
        {
             window.location.href = baseUrl + "/";        
        }
        $scope.InstitutionId = $window.localStorage['Institution_Id'];
        var InstObj = {
            InstitutionId: $scope.InstitutionId
        }

        $scope.Id = 0;
        $scope.previewMarksheet=function(Id)
        {
            // $state.go('PreviewMarksheet/StudentName');
            $state.go('PreviewMarksheet', {
                StudentId: Id
            });

        };
        $scope.printtest = function () {
            if ($stateParams.StudentId != undefined && $stateParams.StudentId > 0) {
                var data = {
                    StudentId: $stateParams.StudentId,

                }
                //console.log(data);
                $http.post(baseUrl + '/Marksheetprintdetails', data).then(function success(response) {
                    // $scope.Id = response.data[0].Id;
                    // $scope.DuplicateId = response.data[0].Id;
                    // $scope.StudentId = response.data[0].StudentId;

                    // $scope.StudentPhoto = response.data[0].StudentPhoto;
                    // $scope.StudentPhoto1 = "/Uploads/" + response.data[0].StudentPhoto;

                    // $scope.DocumentFileName = response.data[0].DocumentName;
                    //console.log(response.data);
                    // $scope.emptydata = [];
                    $scope.marksheetList = [];
                    $scope.StudentId = response.data[0].studentid;
                    $scope.StudentName = response.data[0].studentname;
                    $scope.SubjectName = response.data[0].subjectname;
                    $scope.Total = response.data[0].total;
                    $scope.pass = response.data[0].pass;
                    $scope.FatherName = response.data[0].fathername;
                    $scope.EnrollmentNumber = response.data[0].enrollmentnumber;
                    $scope.RollNumber = response.data[0].rollnumber;
                    // $scope.StudentId = response.data[0].StudentId;
                    // $scope.StudentId = response.data[0].StudentId;
                    $scope.marksheetList = response.data;

                    if ($scope.marksheetList.length > 0) {
                        $scope.flag = 1;
                    } else {
                        $scope.flag = 0;
                    }
                    // });
                });

            }
        };

        //list page initialisation
        // $scope.AcademicYearId = '2';
        // $scope.MediumId = '';
        $scope.CourseId = '';
        $scope.SectionId = "0";
        $scope.ExamNameId = "0";
        $scope.SubjectNameId = '0';
        $scope.flag = 0;
        $scope.StudentMasterList = [];

        /* This is function for Pagination */
        $scope.listdata = [];
        $scope.current_page = 1;
        $scope.page_size = 10;

        $scope.rembemberCurrentPage = function (p) {
            $scope.current_page = p
        }



        $scope.model = {
            selectedLabelList: []
        }




        $scope.isSelectAll = function () {
            $scope.model.selectedLabelList = [];
            if ($scope.master) {
                $scope.master = true;
                for (var i = 0; i < $scope.HallTicketList.length; i++) {
                    $scope.model.selectedLabelList.push($scope.HallTicketList[i].Id);
                }
            } else {
                $scope.master = false;
            }
            angular.forEach($scope.HallTicketList, function (item) {
                item.selectedstudent = $scope.master;
            });
        }

        $scope.SchoolNameList = [];
        $http.get('/getSchool_NameList/').then(function success(response) {
            $scope.SchoolNameList = response.data;
        });



        $scope.HallTicketList = [];

        $scope.examlistsearch = function () {
            if ($scope.Validationcontrols() == true) {
                var obj = {
                    AcademicYearId: $scope.AcademicYearId,
                    MediumId: $scope.MediumId,
                    CourseId: $scope.CourseId,
                    SectionId: $scope.SectionId,
                    ExamNameId: $scope.ExamNameId,
                    SubjectNameId: $scope.SubjectNameId
                };
                $http.post(baseUrl + '/Marksheetdetails', obj).then(function success(response) {
                    //console.log(response.data);
                    $scope.emptydata = [];
                    $scope.marksheetList = [];
                    $scope.marksheetList = response.data;

                    if ($scope.marksheetList.length > 0) {
                        $scope.flag = 1;
                    } else {
                        $scope.flag = 0;
                    }
                    // });
                });

            }

        };
        $scope.AcademicYearList = [];
        $http.post(baseUrl + '/getAcademicYearList', InstObj).then(function success(response) {
            $scope.AcademicYearList = response.data;
            $scope.AcyYear = $ff(response.data, {
                academicflag: 1
            });
            $scope.AcademicYearId = $scope.AcyYear[0].id.toString();
            $scope.AcademicYearBasedCourseFunction();
        });
        $scope.AcademicYearBasedCourseFunction = function () {
            var obj = {
                AcademicYearId: $scope.AcademicYearId,
                InstitutionId: $scope.InstitutionId
            }
            //console.log(obj);
            $http.post(baseUrl + '/getAcademicYearBasedCourse', obj).then(function success(response) {
                $scope.Courselist = response.data;
            });
            // }
        }
        // $scope.AcademicYearBasedCourseFunction();
        $scope.MediumList = [];
        $http.post(baseUrl + '/getmediumlist', InstObj).then(function success(response) {
            $scope.Mediumlist = response.data;
            // console.log(response.data);
        });

        $scope.SectionList = [];
        $http.post(baseUrl + '/getSectionList', InstObj).then(function success(response) {
            $scope.SectionList = response.data;
        });

        $scope.CourseBasedSectionList = [];
        $scope.CourseBasedSectionFunction = function () {
            var obj = {
                AcademicYearId: $scope.AcademicYearId,
                CourseId: $scope.CourseId
            };
            $http.post(baseUrl + '/getCourseBasedSectionList', obj).then(function success(response) {
                $scope.CourseBasedSectionList = response.data;
            });
        }

        $scope.CourseClearFunction = function () {

            $scope.CourseId = '';
            $scope.marksheetList = [];
        };
        $scope.CourseBasedExamNameFunction = function () {
            var obj = {
                AcademicYearId: $scope.AcademicYearId,
                CourseId: $scope.CourseId
            }
            //console.log(obj);
            $http.post(baseUrl + '/getCourseBasedExamList', obj).then(function success(response) {
                $scope.ExamNameList = response.data;
            });
        };
        $scope.ExamNameClearFunction = function () {
            $scope.ExamNameId = "0";
            $scope.SectionId = "0";

            $scope.flag = 0;
            $scope.marksheetList = [];

        };
        $scope.List_SubjectList = [];

        $scope.SubjectClearfunction = function () {
            $scope.SubjectNameId = "0";
            $scope.marksheetList = [];
            $scope.flag = 0;
        };

        $scope.Validationcontrols = function () {
            if (typeof ($scope.AcademicYearId) == "undefined" || $scope.AcademicYearId == "0") {
                alert("Please select Academic Year");
                return false;
            } else if (typeof ($scope.CourseId) == "undefined" || $scope.CourseId == "") {
                alert("Please select Course");
                return false;
            } else if (typeof ($scope.ExamNameId) == "undefined" || $scope.ExamNameId == "0") {
                alert("Please select Exam Name");
                return false;
            }

            return true;
        };

        $scope.checkAll = function () {
            if (!$scope.selectedall) {
                $scope.selectedall = true;
            } else {
                $scope.selectedall = false;
            }
            // row in StudentList
            //ng-model="StudSelectionList[$index]"
            /// StudSelectionList[$index]
            // $scope.StudSelectionList[studentindex]
            //$scope.StudSelectionList[studentindex]=='true'
            angular.forEach($scope.StudentList, function (row) {
                //StudSelectionList[index]
                row.StudSelectionList[$index] = $scope.selectedall;
            });
        };
}]);

// ANSWER BOOK QR CODE GENERATION
OEMSController.controller("AnswerBookQrCodeController", ['$scope', '$http', '$state', '$filter', '$stateParams', '$window', 'CommonLabelNames', 'CommonHeadingNames', 'CommonButtonNames', 'filterFilter',
    function ($scope, $http, $state, $filter, $stateParams, $window, $CommonLabelNames, $CommonHeadingNames, $CommonButtonNames, $ff) {
        if(loginFrom==0)
        {
             window.location.href = baseUrl + "/";        
        }
        $scope.InstitutionId = $window.localStorage['Institution_Id'];
        var InstObj = {
            InstitutionId: $scope.InstitutionId
        }
        //list page initialisation
        $scope.CourseId = '';
        $scope.SectionId = "0";
        $scope.ExamNameId = "0";
        $scope.SubjectNameId = '0';
        $scope.flag = 0;
        $scope.StudentMasterList = [];

        /* This is function for Pagination */
        $scope.listdata = [];
        $scope.current_page = 1;
        $scope.page_size = 10;

        $scope.rembemberCurrentPage = function (p) {
            $scope.current_page = p
        }

        $scope.model = {
            selectedLabelList: []
        }

        $scope.ABQrCodeList = [];

        $scope.ABQrcodeList = function () {
            if ($scope.Validationcontrols() == true) {                
                var obj = {                    
                    AcademicYearId: $scope.AcademicYearId,                    
                    ExamNameId: $scope.ExamNameId,
                };
                
                $http.post(baseUrl + '/ABQrCode', obj).then(function success(response) {
                    //console.log(response.data);
                    $scope.ABQrCodeList = [];
                    $scope.NumberofAb = response.data[0].NumberofAb;
                    $scope.totalqrcoderequired =$scope.NumberofAb + Math.round(10/100*$scope.NumberofAb);

                        var AbQrcode = Math.floor(1000000000 + Math.random() * 900000);
                        var letter = "AB";
                        var obj1 = {

                            InstitutionId: $scope.InstitutionId,
                            AcademicYearId: $scope.AcademicYearId,
                            ExamId: $scope.ExamNameId,
                            count: $scope.totalqrcoderequired,
                        };
                        $http.post(baseUrl + '/addAbQrcode', obj1).then(function success(response) {
                            $scope.Value = response.data;
                            angular.forEach($scope.Value, function (v, index) {
                            $scope.val = v.val;
                            if ($scope.val == 1) {
                                alert("Academic Year already exists,cannot duplicate");
                            }
                        });
                        if (response.data !== 0) {
                            alert("Answer Book QrCode Generated successfully");    
                            $http.post(baseUrl + '/PrintListAbQrcode', obj1).then(function success(response) {
                                $scope.emptydata = [];
                                $scope.QRCodeList = [];
                                $scope.QRCodeList = response.data;
                                if (response.data !== 0) {
                                    document.getElementById("printbtn").style.display = "block";
                                }        
                            }); 

                        } else {
                            alert("Answer Book QrCode Generation Failed");
                        }
                        });

                });

            }

        };
        $scope.AcademicYearList = [];
        $http.post(baseUrl + '/getAcademicYearList', InstObj).then(function success(response) {
            $scope.AcademicYearList = response.data;
            $scope.AcyYear = $ff(response.data, {
                academicflag: 1
            });
            $scope.AcademicYearId = $scope.AcyYear[0].id.toString();
            //$scope.AcademicYearBasedCourseFunction();
        });
        $scope.ExamNameList = [];
        $http.post(baseUrl + '/getExamNameList', InstObj).then(function success(response) {
            $scope.ExamNameList = response.data;
        });

        $scope.ExamNameClearFunction = function () {
            $scope.Id = "0";
            $scope.flag = 0;
            $scope.ExamNameList = [];
        };

        $scope.Validationcontrols = function () {
            if (typeof ($scope.AcademicYearId) == "undefined" || $scope.AcademicYearId == "0") {
                alert("Please select Academic Year");
                return false;
            } else if (typeof ($scope.ExamNameId) == "undefined" || $scope.ExamNameId == "0") {
                alert("Please select Exam Name");
                return false;
            }

            return true;
        };

}]);

//This is Scan and Upload Controller
OEMSController.controller("ScanandUploadController", ['$scope', '$http', '$state', '$stateParams', '$filter', '$window', '$location', 'filterFilter', '$rootScope', '$timeout',
    function ($scope, $http, $state, $stateParams, $filter, $window, $location, $ff, $rootScope, $timeout) {
        if(loginFrom==0)
        {
             window.location.href = baseUrl + "/";        
        }
        $scope.InstitutionId = $window.localStorage['Institution_Id'];
        $scope.AcademicYearId = 2;
        $scope.QRCodeList = [];
        $scope.Uploaddata = 0;
        $scope.pictureList = [];
        $scope.QRCode = "";

        $scope.ClearImage = function () {
            $('#UploadPhoto').val('');
            $scope.pictureList = [];
            $scope.QRCode = "";
            $scope.Uploaddata = 0;
        }
        
        $scope.ClearPhotoList = function () {
            $('#UploadPhoto').val('');
            $scope.pictureList = [];
            $scope.Uploaddata = 0;
        }
        

        $scope.QRCodelistfunctionFun = function () {
            var obj = {
                InstitutionId: $scope.InstitutionId,
                AcademicYearId: $scope.AcademicYearId,
                QRCode: $scope.QRCode
            }
            $http.post(baseUrl + '/QRCodeList', obj).then(function success(response) {
                $scope.QRCodeList = [];
                $scope.QRCodeList = response.data;
                if ($scope.QRCodeList.length > 0) {
                    $scope.Uploaddata = 1;
                }
                else {
                    $scope.Uploaddata = 0;
                }
            });
        };

        $scope.dataURItoBlob = function (dataURI) {
            var binary = atob(dataURI.split(',')[1]);
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            var array = [];
            for (var i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
            }
            return new Blob([new Uint8Array(array)], {
                type: mimeString
            });
        }

        $scope.uploadImage = function (Photo) {
            var filename = "";
            if ($('#UploadPhoto1')[0].files[0] != undefined) {
                File_Name = $('#UploadPhoto1')[0].files[0]['name'];
            }
        }

        $scope.PhotoSize_Flag = false;
        
        $scope.photoChange = function (input) {
            $scope.pictureList = [];
            $scope.PhotoSize_Flag = false;
            counter = input.files.length;  
            for (x = 0; x < counter; x++) {
                if (input.files && input.files[x]) {
                    var filename = input.files[x]['name'];
                    var lastModifieddt = input.files[x]['lastModifiedDate'];
                    var reader = new FileReader();
                    reader.filename=filename;
                    reader.lastModifieddt=new Date(lastModifieddt).getTime();
                    reader.onload = function (e) {
                        var filesize = parseInt(e.total) / parseInt(1024);
                        // if (parseFloat(filesize) > 1000) {
                        //     alert("Allowed only 1000 kb size of photo");
                        //     $scope.PhotoSize_Flag = true;
                        // }
                        // else 
                        {
                            $scope.pictureList.push(
                                {
                                    "no": $scope.pictureList.length,
                                    "picture": e.target.result,
                                    "filename": e.target.filename,
                                    "filedate": parseInt(e.target.lastModifieddt)
                                }
                            
                                )
                            
                        }
                    };
                    reader.readAsDataURL(input.files[x]);
                }
            }            
        }
        $scope.UploadPhotoAdd = function (InsertId) {
            var imgBlob;

            var obj = {
                InstitutionId: $scope.InstitutionId,
                QRCode: $scope.QRCode
            }
            // clear the photo
            $http.post(baseUrl + '/ABQR_ClearPhotos', obj).then(function success(response) {
                // copy the fresh set of AB scanned copies
                angular.forEach($scope.pictureList, function (value, index) {
                    var fd = new FormData();
                    imgBlob = $scope.dataURItoBlob(value.picture);
                    fd.append("fileToUpload", imgBlob);
                    fd.append("InstitutionId", $scope.InstitutionId);
                    fd.append("QRCode", $scope.QRCode);
                    fd.append("QRSequence", index);
                    
                    $http.post(baseUrl + '/ABQR_ScanUpload',
                    fd, {
                    transformRequest: angular.identity,
                    headers:    {
                                'Content-Type': undefined
                                }
                    }
                    ).then(function success(response) {
                        if (response.data.success == true) {
                            //alert("Answer Book scan copy uploaded successfully");
                            //$scope.ClearImage();
                        }
                    });
    
            });                
                
            alert("Answer Book scan copy uploaded successfully");
            $scope.ClearImage();

            });

            
            
            
        }
    }
]);

OEMSController.controller("PaperEvaluationController", ['$scope', '$http', '$state', '$window', 'filterFilter', '$stateParams', '$filter','$interval',
    function ($scope, $http, $state, $window, $ff, $stateParams, $filter,$interval) {
        $scope.Pagenoforcomplete = 0;
        var rotation = 0; 
        $scope.rotateImage=function(){          
            rotation = (rotation + 90) % 360; // the mod 360 probably isn't needed
            $("#map").css("transform","rotate("+rotation+"deg)");
        }
        if(loginFrom==0)
        {
             window.location.href = baseUrl + "/";        
        }
        $scope.imgsrc="";
        $scope.getABImage=function(imageLocation)
        {
         
            $scope.imageLocationdata = imageLocation.toString();
           
            var obj = {
                FileName: $scope.imageLocationdata
            }         
            $http.post(baseUrl + '/getABFileData', obj).then(function success(response) {
               
                if (response.length == 0)
                {
                    alert("NO AB Images is Available for this Ref code.");
                    $state.go('PaperEvaluation_List');
                }
                else{
                    $scope.imgsrc =  response.data;
                }
            });

        }
        $scope.InstitutionId =  $window.localStorage['Institution_Id'];         
        if($stateParams.Id != undefined)
        {
            angular.element('#tableid').css('display', 'none') 
            $scope.Evaluation_Master_Id_edit = $stateParams.Id;
            $scope.Pagevalue = 1;
        }
        else{
            $scope.Evaluation_Master_Id_edit = 0;
            
        }
        $scope.Id=0;
        $scope.EvaluationMasterId = 0;
        $scope.EvaluationChildId = 0;
        $scope.Add_MarkDetails = [];
        $scope.TotalMarks = 0;
        $scope.attempted = 0;
        $scope.notattempted = 0;
        $scope.Pagevalue = 0;
        $scope.PagevalueNext = 1;
        $scope.messagetype = 0;
        // Filter Function Initialisation

        $scope.CancelPopup = function () {
            angular.element('#EvaluationViewModal').modal('hide');
            $scope.ClearPopup();
        }
        $scope.DivCollapse_Next= function () {  
            $scope.StopTimer(); 
        angular.element('#tableid').css('display', 'none')    
        angular.element('#tableid1').css('display', 'block')  
          
        }
        $scope.DivCollapse_Last= function () {   
        angular.element('#tableid').css('display', 'block')    
        angular.element('#tableid1').css('display', 'none')  
        angular.element('#tableid2').css('display', 'block')             
        }
        // $scope.DivCollapse_Back = function () {   
        //     $scope.Evaluation_Allocation_check();
        //     $scope.Evaluation_RequestList();
        //     $scope.Evaluation_Count();
        //     $scope.StopTimer();
        // angular.element('#tableid1').css('display', 'none') 
        // angular.element('#tableid').css('display', 'block') 
       
        // $scope.Pagevalue = 0;
        // $scope.messagetype = 0;
        // $scope.AcademicYearId = "1";
        // $scope.CourseId = "0";
        // $scope.ExamId = "0";
        // $scope.SubjectId = "0";
        // }
        $scope.DivCollapse_Back = function () {   
            $state.go('PaperEvaluation_List');
        }
        $scope.Evaluation_ViewModal = function () {

            var obj = {
                InstitutionId: $scope.InstitutionId,
                AcademicYearId: $scope.AcademicYearId,
                EvaluatedId: $scope.EvaluatedId,
                
            }
         
            $http.post(baseUrl + '/getEvaluationAllocationcheck', obj).then(function success(response) {
                if( response.data.length == 0) 
                {
                    $scope.AnswerBook_EvaluationList();
                }
                else
                {
                $scope.Allocationdraftcount = response.data[0].draftcount;  
                $scope.Allocationcompletedcount= response.data[0].completedcount;
                $scope.Allocationsubmitcount = response.data[0].submitcount;   
                $scope.Message = "Click Confirm to Release the answer book in draft and Submit the completed answer book."
                angular.element('#EvaluationViewModal').modal('show');
                }
         
          
            // if($scope.Allocationdraftcount > 0 || $scope.Allocationcompletedcount > 0 )
            // {
            // angular.element('#EvaluationViewModal').modal('show');
            // }
         

        });
        }
        $scope.Evaluation_Release_Allocate = function () {
            var del = confirm("Do you like to Release and Allocate?");
            if (del == true) {
                $("#chatLoaderPV").show();
            var obj = {
                InstitutionId: $scope.InstitutionId,
                AcademicYearId: $scope.AcademicYearId,
                EvaluatedId: $scope.EvaluatedId,
                
            }
         
            $http.post(baseUrl + '/getEvaluation_Release_Allocate', obj).then(function success(response) {
                if( response.data.length == 0) 
                {
                    $("#chatLoaderPV").hide();
                    $scope.AnswerBook_EvaluationList();
                }
                 });
                }
      
        }
        $scope.Evaluation_ViewCancelPopup = function () {       
            angular.element('#EvaluationViewModal').modal('hide');

            }
    


        $scope.EvaluationCancelPopup = function () {       
            $state.go('PaperEvaluation_List');
        }

        $scope.EvaluationCancelPopup_List = function () {
            angular.element('#tableid').css('display', 'block') 
            angular.element('#tableid1').css('display', 'none') 
            $scope.Pagevalue = 0;          
        }
        

        
        $scope.Timer = null;
        var startTime = new Date;
        $scope.elapsed_seconds = 0;
        //Timer start function.
        $scope.StartTimer = function () {
           
            //Initialize the Timer to run every 1000 milliseconds i.e. one second.
            $scope.Timer = $interval(function () {
                //Display the current time.
                // $scope.Starttime =  $filter('date')(new Date(), '00:00:ss  ');
                // var time = $filter('date')(new Date(), '00:00:ss ');      
                $scope.elapsed_seconds = $scope.elapsed_seconds+1;    
                var total_seconds = $scope.elapsed_seconds;//(new Date - startTime);
                var hours = Math.floor(total_seconds / 3600);
                total_seconds = total_seconds % 3600;
              
                var minutes = Math.floor(total_seconds / 60);
                total_seconds = total_seconds % 60;
              
                var seconds = Math.floor(total_seconds);
              
                // Pad the minutes and seconds with leading zeros, if required
                hours = ( hours < 10 ? "0" : "" ) + hours;
                minutes = ( minutes < 10 ? "0" : "" ) + minutes;
                seconds =  ( seconds < 10 ? "0" : "" ) + seconds;
              
                // Compose the string for display
                var currentTimeString = hours + ":" + minutes + ":" + seconds;
              
                // console.log( $scope.Starttime);
                $scope.timeMessage = "Time Taken: " + currentTimeString;
                              
            }, 1000);
           
        };
    
        //Timer stop function.
        $scope.StopTimer = function () {
    
            //Set the Timer stop message.
            $scope.timeMessage = "Evaluation Stopped..";
            var stoptime = $filter('date')(new Date(), 'HH:mm:ss a');
            $scope.stoptime =  stoptime;
            //console.log( $scope.stoptime);
            //Cancel the Timer.
            if (angular.isDefined($scope.Timer)) {
                $interval.cancel($scope.Timer);
            }
        };

        $scope.AcademicYearId = "1";
        $scope.CourseId = "0";
        $scope.ExamId = "0";
        $scope.SubjectId = "0";
        
        $scope.sectionId = "0",
        $scope.QuestionId  = "0",
        $scope.PreviousRow = -1;                          
        $scope.slideno = 1;
     
        var InstObj = {
            InstitutionId: $scope.InstitutionId
                }

        /* This is function for Pagination */
        $scope.listdata = [];
        $scope.current_page = 1;
        $scope.page_size = 10;
        $scope.rembemberCurrentPage = function (p) {
            $scope.current_page = p
        }

        $scope.PaperEvaluationAdd = function () { console.log("aaa");          
            $state.go('PaperEvaluationView');
        }
        $scope.ViewSummaryPage = function () {
                  $scope.getEvaluation_Summary();
                  angular.element('#ViewModal').modal('show');
        }  

        $scope.AcademicYearList = [];
        $http.post(baseUrl + '/getAcademicYearList',InstObj).then(function success(response) {
            $scope.AcademicYearList = response.data;
            $scope.AcyYear = $ff(response.data, {
                AcademicFlag: 1
            });
             $scope.QBAcademicYear = $scope.AcyYear[0].id.toString();
             $scope.QBAcademicYear = $scope.AcyYear[0].id.toString();
        });

        
        $scope.Courselist = [];
        $scope.AcademicYearBasedCourseFunction = function () {
                    if ($scope.AcademicYearId == 0) {
                        $http.post(baseUrl + '/getcourselist', InstObj).then(function success(response) {
                            $scope.Courselist = response.data;
                        });
                    } else {
                        var obj = {
                            AcademicYearId: $scope.AcademicYearId,
                            InstitutionId: $scope.InstitutionId
                        }
                        $http.post(baseUrl + '/getAcademicYearBasedCourse', obj).then(function success(response) {
                            $scope.Courselist = response.data;
                        });
                    }
                }

        $scope.CourseClearFunction = function () {
            $scope.Course = '0';
        };
        $scope.ExamNameList = [];
        $scope.CourseBasedExamNameFunction = function () {
            // alert('hi');
            if ($scope.CourseId == 0) {
                $http.post(baseUrl + '/getExamNameList', InstObj).then(function success(response) {
                    $scope.ExamNameList = response.data;
                });
            } else {

                var obj = {
                    AcademicYearId: $scope.AcademicYearId,
                    CourseId: $scope.CourseId

                }
                $http.post(baseUrl + '/getCourseBasedExamList', obj).then(function success(response) {
                    $scope.ExamNameList = response.data;
                });
            }

        };
       
        $scope.CourseClearFun = function () {
            $scope.Course = '0';
        }
      
        $scope.ExamNameClearFun = function () {          
            $scope.ExamName = '0';
        }
        $scope.SubjectListObj=[];
        $scope.SubjectId="0";
        $scope.ExamBasedSubjectforList = function () {
            var obj = {
                AcademicYearId: $scope.AcademicYearId,
                CourseId: $scope.CourseId,
                ExamNameId: $scope.ExamId
            }

            $http.post(baseUrl + '/getExamBasedSubjectList_Timetable', obj).then(function success(response) {
                $scope.SubjectListObj = response.data;
              
            });
        };

        $scope.Validationcontrols = function () {
            if (typeof ($scope.AcademicYearId) == "undefined" || $scope.AcademicYearId == "") {
                alert("Please select Academic Year");
                return false;
            } else if (typeof ($scope.CourseId) == "undefined" || $scope.CourseId == "0") {
                alert("Please select Course");
                return false;
            }
            else if (typeof ($scope.ExamId) == "undefined" || $scope.ExamId == "0") {
                alert("Please select Exam ");
                return false;
            }
            else if (typeof ($scope.SubjectId) == "undefined" || $scope.SubjectId == "0") {
                alert("Please select Subject ");
                return false;
            }
            return true;
        };
        $scope.Net_TotalMarks = function () {
            var nettotal = 0;
            for (count = 0; count < $scope.Question_Total_List.length; count++) {
                nettotal += parseFloat($scope.Question_Total_List[count].marks == "" ? 0 : $scope.Question_Total_List[count].marks);
                $scope.NetTotalAmount = nettotal;
            }
            return nettotal;
        };
 
        $scope.Net_attempted = function () {
            var attempted = 0;
            for (count = 0; count < $scope.Question_Total_List.length; count++) {
                attempted += parseInt($scope.Question_Total_List[count].questionstatusid == 1 ? 1 : 0);
                $scope.attempted = attempted;
            }
           
            return attempted;
        };
        $scope.Net_notattempted = function () {
            var notattempted = 0;
           
            for (count = 0; count < $scope.Question_Total_List.length; count++) {
                notattempted += parseInt($scope.Question_Total_List[count].questionstatusid == 2 ? 1 : 0);
                $scope.notattempted = notattempted;
            }         
            return notattempted;
        };
        $scope.mark_validation = function (row) {
         
            var Marks = 0;
            if (parseFloat (row.max_marks) <  parseFloat(row.marks)) {
                alert("Marks is greater than Maximum Marks.");
                row.marks = 0;
               
            }
         
        };
       $scope.QuestionPaper_sectionList = [];
        $scope.Question_Total_List = [];
        
        $scope.QuestionPaperDetails = function (EvaluationMasterId) {            
            var obj = 
            { 
                EvaluationMasterId : EvaluationMasterId,
            }
			
                $http.post(baseUrl + '/QuestionPaper_list',obj).then(function success(response) {
					if(response.data.length>0)
					{
                    $scope.questionpaperid = response.data[0].id;                   
                    $scope.attempted = 0;
                    $scope.notattempted = 0;
                    $scope.TotalMarks = 0;

                    $http.post(baseUrl + '/QuestionPaper_Totallist', obj).then(function success(response) {
                        $scope.Question_Total_List = response.data;
                        $scope.Pagenoforcomplete = response.data[0].pageno;
                        angular.forEach( $scope.Question_Total_List, function (Qvalue, Qindex) {
                            $scope.TotalMarks =  $scope.TotalMarks + Qvalue.marks;
                            if (Qvalue.Question_status_Id == 1 ) 
                            {
                                $scope.attempted = $scope.attempted + 1 ;
                                
                            }
                            else if(Qvalue.Question_status_Id == 2)
                            {
                                $scope.notattempted = $scope.notattempted + 1 ;
                                
                            }                      
                            
                    });
                    $scope.Selected_Question(response.data[0]);
                    });
                    }
                });                               
                $scope.QPDone = 1;
        };
    
            $scope.Selected_Question = function(row)
            {
                var obj = {
                    questionpaperid: row.questionpaperid,
                    questionpaper_sectionid : row.questionpapersectionid
                }
                $http.post(baseUrl + '/QuestionPaperChild_list', obj).then(function success(response) {
                    $scope.Question_List = response.data;
                               
                angular.forEach( $scope.Question_List, function (Qvalue, Qindex) {
                    if(Qvalue.questionno  ==  row.questionno)
                    {
                        $scope.QuestionImage = Qvalue.questions;
                        $scope.QuestionHindiImage = Qvalue.questionhindi;
                    }
                });
           
            });
            }

            if($stateParams.Id != undefined)
            {
                
                var obj = {
                    Id : $stateParams.Id
                }
              $http.post(baseUrl + '/EvaluationMaster_View', obj).then(function success(response) {
                  $scope.EvaluationMaster_Id = response.data[0].id;  
                  $scope.InstitutionId = response.data[0].institution_id;  
                  $scope.AcademicYearId= response.data[0].academicyear_id; 
                //  $scope.AcademicYearBasedCourseFunction();                            
                  $scope.EvaluatedId = response.data[0].invigilator_id;   
                  $scope.CourseId = response.data[0].course_id;  
               //   $scope.CourseBasedExamNameFunction ();                         
                  $scope.SubjectId =  response.data[0].subject_id; 
               //   $scope.ExamBasedSubjectforList();               
                  $scope.ExamId =  response.data[0].exam_id;
                  //console.log($scope.EvaluationMaster_Id);
                if($scope.EvaluationMaster_Id >0){
                  var obj = {
                    InstitutionId: $scope.InstitutionId,
                    AcademicYearId: $scope.AcademicYearId,
                    EvaluatedId: $scope.EvaluatedId,
                    CourseId: $scope.CourseId,
                    SubjectId: $scope.SubjectId,
                    ExamId: $scope.ExamId,
                    EvaluationMaster_Id : $scope.EvaluationMaster_Id
                }
                $scope.Pagevalue = 1;
                $scope.PagevalueNext = 1;
             
                $http.post(baseUrl + '/getAnswerBook_list', obj).then(function success(response) {
                    $scope.AnswerBookList = [];                    
                    $scope.AnswerBookimage = [];
                 
                    $scope.AnswerBookList = response.data; 

                    // if($scope.AnswerBookList.length == 0)
                    // { 
                    //     $scope.PagevalueNext = 0;
                    //     $scope.messagetype = 1;
                    //     angular.element('#tableid').css('display', 'block')    
                    //     angular.element('#tableid1').css('display', 'none')  
                    //     angular.element('#tableid2').css('display', 'block') 
                    //     alert("No Answer Book In Alloted List.");
                        
                    // }
                    if($scope.AnswerBookList.length > 0)
                    {
                    $scope.Pagevalue = 1;
                    $scope.PagevalueNext = 1;
                    $scope.DivCollapse_Next();

                    $scope.StartTimer();
                    $scope.EvaluationMasterId = response.data[0].evaluationheader_id; 
                    var AB_QRcode = response.data[0].ab_qrcode;

                    $scope.AnswerBookImages(AB_QRcode);
                
                    var InstObj = {
                    EvaluationMasterId :   $scope.EvaluationMasterId
                    }
                    $http.post(baseUrl + '/Evaluation_Summary', InstObj).then(function success(response) {
                    $scope.EvaluationSummary = [];
                    $scope.EvaluationSummary = response.data;

                    });
                    $scope.QuestionPaperDetails($scope.EvaluationMasterId);
                    }
                    });
                }
                else 
                {
                    alert("Answer Book already Allocated");
                }    
                    });

                    }
            $scope.AnswerBook_list = function () {                  
               
                if ($scope.Validationcontrols() == true) {
                   
                    // $scope.Pagevalue = 1;
                    // $scope.PagevalueNext = 1;
                var obj = {
                    InstitutionId: $scope.InstitutionId,
                    AcademicYearId: $scope.AcademicYearId,
                    EvaluatedId: $scope.EvaluatedId,
                    CourseId: $scope.CourseId,
                    SubjectId: $scope.SubjectId,
                    ExamId: $scope.ExamId,
                    EvaluationMaster_Id : 0
                }
          
                $http.post(baseUrl + '/getAnswerBook_list', obj).then(function success(response) {
                    $scope.AnswerBookList = [];                    
                    $scope.AnswerBookimage = [];
                 
                    $scope.AnswerBookList = response.data; 

                     
                    if($scope.AnswerBookList.length == 0)
                    { 
                        $scope.PagevalueNext = 0;
                        $scope.messagetype = 1;
                        angular.element('#tableid').css('display', 'block')    
                        angular.element('#tableid1').css('display', 'none')  
                        angular.element('#tableid2').css('display', 'block') 
                        alert("No Answer Book In Alloted List.");
                        
                    }

                    if($scope.AnswerBookList.length > 0){
					$scope.slideno = 1;
                    $scope.Pagevalue = 1;
                    $scope.PagevalueNext = 1;
                        $scope.DivCollapse_Next();
                        $scope.StartTimer();
                    $scope.EvaluationMasterId = response.data[0].evaluationheader_id; 
                                var AB_QRcode = response.data[0].ab_qrcode;
                                    
                                    $scope.AnswerBookImages(AB_QRcode);
                
                    var InstObj = {
                        EvaluationMasterId :   $scope.EvaluationMasterId
                    }
                $http.post(baseUrl + '/Evaluation_Summary', InstObj).then(function success(response) {
                    $scope.EvaluationSummary = [];
                    $scope.EvaluationSummary = response.data;
                    
                });
                $scope.QuestionPaperDetails($scope.EvaluationMasterId);
            }
            });
        }
            };
	    $scope.doubleclick=0;
            $scope.AnswerBook_EvaluationList = function () {                  
                $scope.doubleclick = $scope.doubleclick+1;
                if ($scope.Validationcontrols() == true) {
                    $("#chatLoaderPV").show();
                   
                var obj = {
                    InstitutionId: $scope.InstitutionId,
                    AcademicYearId: $scope.AcademicYearId,
                    EvaluatedId: $scope.EvaluatedId,
                    CourseId: $scope.CourseId,
                    SubjectId: $scope.SubjectId,
                    ExamId: $scope.ExamId,
                    
                }
          
                $http.post(baseUrl + '/getAnswerBook_EvaluationList', obj).then(function success(response) {
                    $scope.AnswerBookList = [];                    
                    $scope.AnswerBookimage = [];
                 
                    $scope.AnswerBookList = response.data; 
                    if(response.data[0].evaluationheader_id == 0 && response.data[0].ab_qrcode == "sametimerequest" )
                    {
                        alert("Request again.. ");
                       
                        $scope.Evaluation_RequestList();
                        $scope.Evaluation_Count();
                    }
                    if(response.data[0].evaluationheader_id == 0 && response.data[0].ab_qrcode == null )
                    {
                        alert("No Answer Book For Allocation");
                       
                        $scope.Evaluation_RequestList();
                        $scope.Evaluation_Count();
                    }
                    if(response.data[0].evaluationheader_id == 0 && response.data[0].ab_qrcode == 1)
                    {
                        alert("Answer Book already Allocated.");
                        $scope.Evaluation_RequestList();
                        $scope.Evaluation_Count();
                    }
                    if($scope.AnswerBookList.length > 0 && response.data[0].evaluationheader_id > 0){
                    alert("Answer Book Allocated.");
                    $scope.Evaluation_RequestList();
                    $scope.Evaluation_Count();
                    }
                    $("#chatLoaderPV").hide();
            //         if(response.data[0].evaluationheader_id == 0)
            //         { 
            //             $scope.Pagevalue = 1;
            //             $scope.PagevalueNext = 0;
            //             $scope.messagetype = 1;                        
            //             alert("Answer Book already Allocated.");
            //             angular.element('#tableid').css('display', 'block')    
            //             angular.element('#tableid1').css('display', 'none')  
            //             angular.element('#tableid2').css('display', 'block')  
                        
            //         }
            //         if($scope.AnswerBookList.length == 0)
            //         { 
            //             $scope.Pagevalue = 1;
            //             $scope.PagevalueNext = 0;
            //             $scope.messagetype = 1;                        
            //             alert("Answer Book already Allocated.");
            //             angular.element('#tableid').css('display', 'block')    
            //             angular.element('#tableid1').css('display', 'none')  
            //             angular.element('#tableid2').css('display', 'block')  
                        
            //         }

            //         if($scope.AnswerBookList.length > 0 && response.data[0].evaluationheader_id > 0){
            //             alert("Answer Book  Allocated.");
            //             $scope.Pagevalue = 1;
            //             $scope.PagevalueNext = 1;
            //             $scope.DivCollapse_Next();
            //             $scope.StartTimer();
            //         $scope.EvaluationMasterId = response.data[0].evaluationheader_id; 
            //                     var AB_QRcode = response.data[0].AB_QRCode;
                                    
            //                         $scope.AnswerBookImages(AB_QRcode);
                
            //         var InstObj = {
            //             EvaluationMasterId :   $scope.EvaluationMasterId
            //         }
            //     $http.post(baseUrl + '/Evaluation_Summary', InstObj).then(function success(response) {
            //         $scope.EvaluationSummary = [];
            //         $scope.EvaluationSummary = response.data;
                    
            //     });
            //     $scope.QuestionPaperDetails($scope.EvaluationMasterId);
            // }
            });

       
        }
	else
	{
		$scope.doubleclick=0;
	}
            };

            $scope.AnswerBookImages = function (AB_QRcode) {            
               var obj = {
                    QRCode: AB_QRcode
                }
                $http.post(baseUrl + '/getAnswerBookImages_list', obj).then(function success(response) {
                        $scope.AnswerBookImages_list = [];
                        $scope.AnswerBookimage = [];
                        $scope.AnswerBookImages_list = response.data;
                        angular.forEach( $scope.AnswerBookImages_list, function (value, index) {
                            //console.log(value.imageurl)
                            if(index==0)
                            {
                                $scope.getABImage(value.imageurl);

                            }
                            $scope.AnswerBookimage.push({

                                'AnswerBook' :  value.imageurl
                            })
                        });
                });
            }

            $scope.slidenext = 1;
            $scope.slideprevious = 0;
            
            $scope.PreviousNext_Slide = function(IdX){
                $scope.slidenext = 0;
                $scope.slideprevious = 0;
                $scope.slideno = $scope.slideno + IdX;
                if( $scope.slideno !=1 && $scope.AnswerBookImages_list.length>1){
                    $scope.slideprevious = 1;
                }
                
                if( $scope.slideno!=$scope.AnswerBookImages_list.length && $scope.AnswerBookImages_list.length>1){
                    $scope.slidenext = 1;
                }
                if($scope.slideno > $scope.Pagenoforcomplete &&  $scope.slideno <= 40)  
                {
                    $scope.Pagenoforcomplete = $scope.Pagenoforcomplete + 1 ;
                }    
                
                
                $scope.imageurlnext = $scope.AnswerBookimage[$scope.slideno-1].AnswerBook;               
                
                $scope.getABImage($scope.imageurlnext.toString());
                
            }
            $scope.Evaluation_view = function (row) {              
                
                var obj = {
                    Id: row.evaluationchildid,
                    EvaluationMasterId: row.evaluationid,
                    SectionId: row.questionpapersectionid,
                    QuestionNo: row.questionno,
                    
                }
            
                $http.post(baseUrl + '/Evaluation_view', obj).then(function success(response) {
                //  console.log(response.data.length);
                if(response.data.length == 0)
                
                {
                $scope.sectionId = "0",
                $scope.QuestionId  = "0",
                $scope.QuestionStatusId = "0",
                $scope.CheckAttended = false;
                $scope.CheckNotAttended = false;            
                $scope.Marks = "";
                $scope.Remarks = "";
                $scope.QuestionImage = "";
                $scope.QuestionHindiImage = "";
                }
                
                else{
                    $scope.EvaluationChildId = response.data[0].id;  
                    $scope.Evaluation_Master_Id= response.data[0].evaluation_master_id;
                    $scope.QuestionStatusId = response.data[0].question_status_id;   
                    $scope.sectionId =  response.data[0].sectionid;                
                    $scope.QuestionId =  response.data[0].questionno;
                    $scope.Marks= response.data[0].marks;
                    $scope.Remarks = response.data[0].remarks;
            
                    //  if ($scope.QuestionStatusId  == 2 ) {
                    //     $scope.CheckNotAttended = true;
                    
                    //                     }
                    // else if($scope.QuestionStatusId == 1){
                    //     $scope.CheckAttended = true;
                // }  
                    $scope.Selected_Question();
                }
                
                });
            };
      
            $scope.setionClearFunction = function () {
                $scope.sectionId = "0",
                $scope.QuestionId  = "0",
                $scope.QuestionStatusId = "0",
                $scope.CheckAttended = false;
                $scope.CheckNotAttended = false;            
                $scope.Marks = "";
                $scope.Remarks = "";
            };
            $scope.Evaluation_InsertUpdate_validation = function () {
                  
                var returnst = 0;                
                var attemptedquest = 0;
                $scope.checkedsection = [];
                
                angular.forEach( $scope.Question_Total_List, function (value, index) {
                    attemptedquest = 0; 
                  
                if ($ff($scope.checkedsection, {id: value.questionpapersectionid},true).length == 0){                
                   
                    angular.forEach( $scope.Question_Total_List, function (value1, index1) {    

                        if((value.questionpapersectionid == value1.questionpapersectionid) )
                        {
                            if(value1.questionstatusid == 1)
                                         {
                            attemptedquest  = attemptedquest + 1 ;
                            }
                            $scope.checkedsection.push({
                                id : value.questionpapersectionid
                            })                                          
                          
                        }
                    });   
                
                  
                   if(attemptedquest > value.answers){
                    alert("Attempted more than the total no. of questions in section " + value.questionpapersection );
                     returnst = returnst + 1;
                   }                  
                }
                });

                if(returnst == 0){
                return true;
                }
                }
            $scope.Evaluation_InsertUpdate = function (status) {
           
                if ($scope.Evaluation_InsertUpdate_validation() == true) {
                var obj = {
                    EvaluationList: $scope.Question_Total_List,
                    pageno : $scope.slideno
                }

                $http.post(baseUrl + '/addEvaluationMaster', obj).then(function success(response) {    
                   
                    if (response.data.length > 0 ) {
                      //  $scope.QuestionPaperDetails (response.data[0].p_evaluationmasterid); 
                     
                        if(status == 2 && $scope.QPDone == 1)
                        {
                         alert("Evaluation saved successfully");  
                    
                    }
                    } else {
                        alert("Insert/Update Problem");
                    }
                });
          
                }
            };
            
            $scope.EvaluationSummary = [];
            $scope.getEvaluation_Summary = function (status) {
                var InstObj = {
                    EvaluationMasterId :   $scope.EvaluationMasterId
                }
               
                $http.post(baseUrl + '/Evaluation_Summary', InstObj).then(function success(response) {
                    $scope.EvaluationSummary = response.data;                    
                });
            }
       // $scope.EvaluatedId = 1;
        $scope.Evaluation_Count = function () {              
            
            var obj = {
                InstitutionId: $scope.InstitutionId,
                AcademicYearId: $scope.AcademicYearId,
                EvaluatedId: $scope.EvaluatedId,
                
            }
      
            $http.post(baseUrl + '/EvaluationMaster_Count', obj).then(function success(response) {
                $scope.allocatedcount = response.data[0].allocatedcount;  
                $scope.draftcount = response.data[0].draftcount;  
                $scope.completedcount= response.data[0].completedcount;
                $scope.submitcount = response.data[0].submitcount;   
              
            });
        };
      
         
        $scope.Evaluation_Allocation_check = function () {              
            
            var obj = {
                InstitutionId: $scope.InstitutionId,
                AcademicYearId: $scope.AcademicYearId,
                EvaluatedId: $scope.EvaluatedId,
                
            }
         
            $http.post(baseUrl + '/getEvaluationAllocationcheck', obj).then(function success(response) {
             
                $scope.draftcount = response.data[0].draftcount;  
                $scope.completedcount= response.data[0].completedcount;
                $scope.submitcount = response.data[0].submitcount;   
              
            });
        };
        $scope.EvaluationRequestList = [] ;
        $scope.Evaluation_RequestList = function () {              
            
            var obj = {
                InstitutionId: $scope.InstitutionId,
                AcademicYearId: $scope.AcademicYearId,
                EvaluatedId: $scope.EvaluatedId,                
            }
         
            $http.post(baseUrl + '/getEvaluation_RequestList', obj).then(function success(response) {
             
                $scope.EvaluationRequestList = [] ;
                $scope.EvaluationRequestList = response.data ;
                if ($scope.EvaluationRequestList.length > 0) {
                    $scope.flag = 1;
                }
                else {
                    $scope.flag = 0;
                }
            });
        };

        $scope.EvaluationMaster_statusUpdate = function () {
         
            $scope.Net_notattempted();
            $scope.Net_attempted();
            //console.log($scope.AnswerBookimage.length);
         
            if ($scope.Question_Total_List.length == ( $scope.notattempted + $scope.attempted)){
                if($scope.Pagenoforcomplete == $scope.AnswerBookimage.length) {
                var del = confirm(    
                "No.of questions Attempted :  "  + $scope.attempted + "\n" +
                "No.of questions Not Attempted :  "  + $scope.notattempted +  "\n" +
                "Total Marks : "  + $scope.NetTotalAmount +  "\n" +
                "Are you sure to Complete it ?",);
                if (del == true ){
                $scope.Evaluation_Status_Id = 2;              
                $scope.Message ="Evaluation completed successfully."                   
                $scope.Evaluation_InsertUpdate(1);
                var data = {
                    Id: $stateParams.Id,
                    Evaluation_Status_Id : $scope.Evaluation_Status_Id ,
                }
                $http.post(baseUrl + '/Update_Evaluation_Status', data).then(function success(response) {
                    if (response.data == 1) {
                        alert($scope.Message);
                        $scope.EvaluationCancelPopup();
                    } else {
                    
                        alert( "Evaluation not submitted" );
                    }
                })
            }
        }
        else {
            alert("Evaluate all the pages to complete."); 
        }
        }
        else 
        {
            alert("Evaluate all the questions to complete."); 
        }
        }

        $scope.getABImageS3=function(imgURL)
        {
            var data = {
                FileName: imgURL
            }
            $http.post(baseUrl + '/getABFileData', data).then(function success(response) {
                return response;
            })
        }
    }
]);


OEMSController.controller("EvaluationController", ['$scope', '$http', '$state','$window', 'filterFilter', '$stateParams', '$filter',
    function ($scope, $http, $state,$window, $ff, $stateParams, $filter) {
        if(loginFrom==0)
        {
             window.location.href = baseUrl + "/";        
        }
        $scope.Id=0;
        $scope.InstitutionId = $window.localStorage['Institution_Id'];
       // $scope.EvaluatedId = 1;
        $scope.ABCourseId=0;
        $scope.AcademicYearId = "1";
        $scope.CourseId = "0";
        $scope.SubjectId = "0";
        $scope.ExamId = "0";
        $scope.PreviousRow = 0;
      //  $scope.Tabvalue = 0;

       
        var InstObj = {
            InstitutionId: $scope.InstitutionId
                }

                      
        /* This is function for Pagination */
        $scope.listdata = [];
        $scope.current_page = 1;
        $scope.page_size = 50;
        $scope.rembemberCurrentPage = function (p) {
            $scope.current_page = p
        }

            $scope.PaperEvaluationAdd = function (Id) {   console.log("bbbb");  
                //console.log(Id)        
                $state.go('PaperEvaluationedit', {
                    Id: Id
                });
            }
          
          
        $scope.AcademicYearList = [];
        $http.post(baseUrl + '/getAcademicYearList',InstObj).then(function success(response) {
            $scope.AcademicYearList = response.data;
            $scope.AcyYear = $ff(response.data, {
                AcademicFlag: 1
            });
            // $scope.QBAcademicYear = $scope.AcyYear[0].id.toString();
            // $scope.QBAcademicYear = $scope.AcyYear[0].id.toString();
        });

        

    $scope.AcademicYearBasedCourseFunction = function () {
            if ($scope.AcademicYearId == 0) {
                $http.post(baseUrl + '/getcourselist', InstObj).then(function success(response) {
                    $scope.Courselist = response.data;
                });
            } else {
                var obj = {
                    AcademicYearId: $scope.AcademicYearId,
                    InstitutionId: $scope.InstitutionId
                }
                $http.post(baseUrl + '/getAcademicYearBasedCourse', obj).then(function success(response) {
                    $scope.Courselist = response.data;
                });
            }
        }

        $scope.CourseClearFunction = function () {
            $scope.Course = '0';
        };

        $scope.CourseBasedExamNameFunction = function () {
            // alert('hi');
            if ($scope.CourseId == 0) {
                $http.post(baseUrl + '/getExamNameList', InstObj).then(function success(response) {
                    $scope.ExamNameList = response.data;
                });
            } else {

                var obj = {
                    AcademicYearId: $scope.AcademicYearId,
                    CourseId: $scope.CourseId

                }
                $http.post(baseUrl + '/getCourseBasedExamList', obj).then(function success(response) {
                    $scope.ExamNameList = response.data;
                });
            }

        };
       
        $scope.CourseClearFun = function () {
            $scope.Course = '0';
        }
      
        $scope.ExamNameClearFun = function () {
            // alert('hi');
            $scope.ExamName = '0';
        }
        $scope.SubjectListObj=[];
        $scope.SubjectId="0";
        $scope.ExamBasedSubjectforList = function () {
            var obj = {
                AcademicYearId: $scope.AcademicYearId,
                CourseId: $scope.CourseId,
                ExamNameId: $scope.ExamId
            }

            $http.post(baseUrl + '/getExamBasedSubjectList_Timetable', obj).then(function success(response) {
                $scope.SubjectListObj = response.data;
              
            });
        };
      

        $scope.Evaluation_list = function (status_type) {  	
            $scope.Tabvalue = status_type;    	
    
            var obj = {	
                InstitutionId: $scope.InstitutionId,	
                AcademicYearId: $scope.AcademicYearId,	
                EvaluatedId: $scope.EvaluatedId,	
                CourseId: $scope.CourseId,	
                SubjectId: $scope.SubjectId,	
                ExamId: $scope.ExamId,	
                Evaluation_Status_Id :  $scope.Tabvalue,	
            }	

            $http.post(baseUrl + '/getEvaluation_list', obj).then(function success(response) {	
                $scope.emptydata = [];	
                $scope.EvaluationList = [];	
                $scope.EvaluationList = response.data;	
                  
                    if ($scope.EvaluationList.length > 0) {
                        $scope.flag = 1;
                      
                    } else {
                        $scope.flag = 0;
                    }
               
                                    
            });	
            $scope.Evaluation_Count();	
        };
           
            $scope.setionClearFunction = function () {
            $scope.sectionId = "0",
            $scope.QuestionId  = "0",
            $scope.QuestionStatusId = "0",
            $scope.Marks = "";
            $scope.Remarks = "";
            };
    
      
            $scope.EvaluationMaster_statusUpdate = function (row,tab,submitall) {
              
             
                if(submitall == 1 ){
                    var del = confirm("Do you like to Submit All ?");
                    if (del == true ){
                    
                    $scope.Evaluation_Status_Id = 3; 
                    $scope.Tabvalue = 2;
                  
                                      
                angular.forEach($scope.EvaluationList, function (value,index) {
                   
                    if(value.evaluation_status_id == 2)
                    {
                    var data = {
                        Id: value.id,
                        Evaluation_Status_Id : $scope.Evaluation_Status_Id ,
                    }
                
                    $http.post(baseUrl + '/Update_Evaluation_Status', data).then(function success(response) {
                     
                        if (response.data == 1) {
                            $scope.Message ="Evaluation Submitted successfully"
                         //  alert($scope.Message);
                            $scope.Evaluation_Count();
                            $scope.Evaluation_list($scope.Tabvalue );
                            
                        }
                        else 
                        {
                            alert("Evaluation not submitted" );
                        }
                    })
                }
               
             
                }); 
                
                alert("Evaluation Submitted successfully");             
                $scope.Evaluation_list($scope.Tabvalue );
                $scope.Evaluation_Count();
                    }
               }
               else{
                if(tab == 2)
                {
                    var del = confirm(    
                        "No.of questions Attempted :  "  + row.totalquestion_attempted +  "\n" +
                        "No.of questions Not Attempted :  "  + row.totalquestion_notattempted +  "\n" +
                        "Total Marks : "  + row.totalmarks +  "\n" +
                        "Are you sure,Do you like to Complete it ?",);
                        if (del == true ){
                    $scope.Evaluation_Status_Id = 2;
                    $scope.Tabvalue = 1;
                       // alert("Selected detail has been inactivated successfully");
                        $scope.Message ="Evaluation Completed successfully" 
                        
                        var data = {
                            Id: row.id,
                            Evaluation_Status_Id : $scope.Evaluation_Status_Id ,
                        }
                        $http.post(baseUrl + '/Update_Evaluation_Status', data).then(function success(response) {
                            if (response.data == 1) {
                                alert($scope.Message);
                                $scope.Evaluation_list($scope.Tabvalue );
                                $scope.Evaluation_Count();
                            } else {
                                alert("Error in Evaluation Status Update." );
                                $scope.Evaluation_list($scope.Tabvalue );
                            }
                            })  
                        }
                }
                else if (tab == 3)
                {
                    var del = confirm("Do you like to Submit ?");       
                    if (del == true ){           
                    $scope.Evaluation_Status_Id = 3; 
                    $scope.Tabvalue = 2;
                    $scope.Message ="Evaluation Submitted successfully"                   
                
                var data = {
                    Id: row.id,
                    Evaluation_Status_Id : $scope.Evaluation_Status_Id ,
                }
                $http.post(baseUrl + '/Update_Evaluation_Status', data).then(function success(response) {
                    if (response.data == 1) {
                        alert($scope.Message);
                        $scope.Evaluation_list($scope.Tabvalue );
                        $scope.Evaluation_Count();
                    } else {
                        alert("Error in Evaluation Status Update." );
                        $scope.Evaluation_list($scope.Tabvalue );
                    }
                    })
               }
            }
            }
            }
            $scope.Evaluation_subject_Count = function () {              
            
                var obj = {
                    SubjectName: $scope.SubjectName
                }
              
                $http.post(baseUrl + '/getEvaluation_count_by_subject', obj).then(function success(response) {
                 
                    $scope.draftcount = response.data[0].draftcount;  
                    $scope.completedcount= response.data[0].completedcount;
                    $scope.submitcount = response.data[0].submitcount;   
                  
                });
            };

/*             $scope.Evaluation_list = function (status_type) {      
            $scope.Tabvalue = status_type;      
    
            var obj = { 
                InstitutionId: $scope.InstitutionId,    
                AcademicYearId: $scope.AcademicYearId,  
                EvaluatedId: $scope.EvaluatedId,    
                CourseId: $scope.CourseId,  
                SubjectId: $scope.SubjectId,    
                ExamId: $scope.ExamId,  
                Evaluation_Status_Id :  $scope.Tabvalue,    
            }   

            $http.post(baseUrl + '/getEvaluation_list', obj).then(function success(response) {  
                $scope.emptydata = [];  
                $scope.EvaluationList = []; 
                $scope.EvaluationList = response.data;  
                  
                    if ($scope.EvaluationList.length > 0) {
                        $scope.flag = 1;
                      
                    } else {
                        $scope.flag = 0;
                    }
               
                                    
            }); 
            $scope.Evaluation_Count();  
        };*/
        $scope.evalStudenData = [];
         $scope.subject_evaluator_repots = function () {
            $http.post(baseUrl + '/subject_evaluator_rep').then(function success(response) {
                $scope.emptydata=[];
                $scope.evaluationStudenData = response.data;
               
            });
        }
    }
]);

//this is for Examination Result controller
OEMSController.controller("ExaminationResultController", ['$scope', '$http', '$state','$window' ,'filterFilter', '$stateParams', '$filter',
    function ($scope, $http, $state,$window, $ff, $stateParams, $filter) {
        if(loginFrom==0)
        {
             window.location.href = baseUrl + "/";        
        }
        $scope.InstitutionId = $window.localStorage['Institution_Id'];
        var InstObj = {
            InstitutionId: $scope.InstitutionId
        }
        // Checkbox Initialisation
        $scope.StudSelectionList = [];

        //list page Initialisation

        $scope.MediumId = "0";
        $scope.CourseId = "0";
        $scope.SectionId = "0";
        $scope.ExamNameId = "0";
        $scope.flag = 0;

        /* This is function for Pagination */
        $scope.listdata = [];
        $scope.current_page = 1;
        $scope.page_size = 10;
        $scope.rembemberCurrentPage = function (p) {
            $scope.current_page = p
        }
        $scope.ExamClearfunction = function () {
            $scope.ExamNameId = "";
            $scope.SectionId = "";

        };
        $scope.CourseBasedSectionList = [];
        $scope.CourseBasedSectionFunction = function () {
            var obj = {
                AcademicYearId: $scope.AcademicYearId,
                CourseId: $scope.CourseId
            };

            $http.post(baseUrl + '/getCourseBasedSectionList', obj).then(function success(response) {
                $scope.CourseBasedSectionList = response.data;
            });
        }

        $scope.AcademicYearBasedCourseFunction = function () {
            var obj = {
                AcademicYearId: $scope.AcademicYearId,
                InstitutionId: $scope.InstitutionId
            }
            $http.post(baseUrl + '/getAcademicYearBasedCourse', obj).then(function success(response) {
                $scope.Courselist = response.data;
            });
        }

        $scope.CourseClearFunction = function () {

            $scope.CourseId = '';
            $scope.StudentList = [];
        };
        $scope.CourseBasedExamNameFunction = function () {
            var obj = {
                AcademicYearId: $scope.AcademicYearId,
                CourseId: $scope.CourseId
            }

            $http.post(baseUrl + '/getCourseBasedExamList', obj).then(function success(response) {
                $scope.ExamNameList = response.data;
            });
        };
        $scope.ExamNameClearFunction = function () {
            $scope.ExamNameId = "0";
            $scope.SectionId = "0";
            $scope.StudentList = [];
            $scope.flag = 0;
            $scope.StudentMasterList = [];
        };
        $scope.List_SubjectList = [];
        $scope.ExamBasedSubject = function () {
            var obj = {
                AcademicYearId: $scope.AcademicYearId,
                CourseId: $scope.CourseId,
                ExamNameId: $scope.ExamNameId
            }
            $http.post(baseUrl + '/getExamBasedSubjectList', obj).then(function success(response) {

                $scope.Sub_List = response.data;
                $scope.SubjectList = $ff($scope.Sub_List, {
                    SubParentId: 0
                }, true);
            });
        };

        $scope.StudentList = [];
        $scope.ExaminationResultList = function () {
            
            if ($scope.Validationcontrols() == true) {
                $("#chatLoaderPV").show();
                
                var obj = {
                    AcademicYearId: $scope.AcademicYearId,
                    MediumId: $scope.MediumId,
                    CourseId: $scope.CourseId,
                    SectionId: $scope.SectionId,
                    ExamNameId: $scope.ExamNameId
                };
                $http.post(baseUrl + '/getExaminationResultList', obj).then(function success(response) {

                    $scope.emptydata = [];
                    $scope.StudentList = [];
                    $scope.StudentList = response.data;
                    angular.forEach($scope.StudentList, function (value1, studentindex) {
                        if (value1.Attendance == 0) {
                            value1.MarksObtained = "A"
                        }
                    });
                    var objStud = {
                        AcademicYearId: $scope.AcademicYearId,
                        MediumId: $scope.MediumId,
                        CourseId: $scope.CourseId,
                        SectionId: $scope.SectionId,
                        ExamNameId: $scope.ExamNameId
                    };
                    $http.post(baseUrl + '/getExaminationList', objStud).then(function success(response1) {

                        $scope.emptydata = [];
                        $scope.StudentMasterList = [];
                        $scope.StudentMasterList = response1.data;

                        angular.forEach($scope.StudentMasterList, function (value1, studentindex) {
                            if (value1.Attendance == 0) {
                                value1.MarksObtained = "A";
                            } else {
                                value1.MarksObtained;
                            }
                        });
                        $scope.StudentMasterList = $ff($scope.StudentMasterList, {
                            SubParentId: 0
                        }, true);
                    });
                    if ($scope.StudentList.length > 0) {
                        $scope.flag = 1;
                    } else {
                        $scope.flag = 0;
                    }


                    $("#chatLoaderPV").hide();
                });
            }
        }

        $scope.Validationcontrols = function () {

            if (typeof ($scope.AcademicYearId) == "undefined" || $scope.AcademicYearId == "") {
                alert("Please select Academic Year");
                return false;
            } else if (typeof ($scope.CourseId) == "undefined" || $scope.CourseId == "") {
                alert("Please select Course");
                return false;
            }
            else if (typeof ($scope.ExamNameId) == "undefined" || $scope.ExamNameId == 0) {
                alert("Please select Exam Name");
                return false;
            }

            return true;
        };

        $scope.MarksList = [];
        $scope.SubjectListdfgdf = function () {

            var obj = {
                CourseId: $scope.CourseId,
                ExamNameId: $scope.ExamNameId
            };

            $http.post(baseUrl + '/getExaminationResult', obj).then(function success(response) {
                $scope.MarksList = response.data;
            });
        }


        $scope.MediumList = [];
        $http.post(baseUrl + '/getmediumlist', InstObj).then(function success(response) {
            $scope.Mediumlist = response.data;
        });

        $scope.CourseList = [];
        $http.post(baseUrl + '/getcourselist', InstObj).then(function success(response) {
            $scope.Courselist = response.data;
        });

        $scope.AcademicYearList = [];
        $http.post(baseUrl + '/getAcademicYearList', InstObj).then(function success(response) {
            $scope.AcademicYearList = response.data;
            $scope.AcyYear = $ff(response.data, {
                academicflag: 1
            });
            $scope.AcademicYearId = $scope.AcyYear[0].id.toString();
            $scope.AcademicYearBasedCourseFunction();
        });

        $scope.ExamNameList = [];
        $http.post(baseUrl + '/getExamName1List', InstObj).then(function success(response) {
            $scope.ExamNameList = response.data;
        });

        $scope.SectionList = [];
        $http.post(baseUrl + '/getSectionList', InstObj).then(function success(response) {
            $scope.SectionList = response.data;
        });

    }
]);

OEMSController.controller("MarksheetController", ['$scope', '$http', '$state', '$filter', '$stateParams', '$window', 'CommonLabelNames', 'CommonHeadingNames', 'CommonButtonNames', 'filterFilter',
function ($scope, $http, $state, $filter, $stateParams, $window, $CommonLabelNames, $CommonHeadingNames, $CommonButtonNames, $ff) {
    if(loginFrom==0)
    {
         window.location.href = baseUrl + "/";        
    }
    $scope.InstitutionId = $window.localStorage['Institution_Id'];
    var InstObj = {
        InstitutionId: $scope.InstitutionId
    }

    $scope.Id = 0;
    $scope.previewMarksheet=function(Id)
    {
        // $state.go('PreviewMarksheet/StudentName');
        $state.go('PreviewMarksheet', {
            StudentId: Id
        });

    };
    $scope.marksheetList = [];
    $scope.printtest = function () {
        if ($stateParams.StudentId != undefined && $stateParams.StudentId > 0) {
            var data = {
                StudentId: $stateParams.StudentId,

            }
            //console.log(data);
            $http.post(baseUrl + '/Marksheetprintdetails', data).then(function success(response) {
                // $scope.Id = response.data[0].Id;
                // $scope.DuplicateId = response.data[0].Id;
                // $scope.StudentId = response.data[0].StudentId;

                // $scope.StudentPhoto = response.data[0].StudentPhoto;
                // $scope.StudentPhoto1 = "/Uploads/" + response.data[0].StudentPhoto;

                // $scope.DocumentFileName = response.data[0].DocumentName;
                //console.log(response.data);
                // $scope.emptydata = [];
                
                $scope.StudentId = response.data[0].studentid;
                $scope.StudentName = response.data[0].studentname;
                $scope.SubjectName = response.data[0].subjectname;
                $scope.StudentPhoto = response.data[0].studentphoto;
                $scope.Total = response.data[0].total;
                $scope.pass = response.data[0].pass;
                $scope.FatherName = response.data[0].fathername;
                $scope.EnrollmentNumber = response.data[0].enrollmentnumber;
                $scope.RollNumber = response.data[0].rollnumber;
                // $scope.StudentId = response.data[0].StudentId;
                // $scope.StudentId = response.data[0].StudentId;
                $scope.marksheetList = response.data;

                // });
            });

        }
    };

    //list page initialisation
    // $scope.AcademicYearId = '2';
    // $scope.MediumId = '';
    $scope.CourseId = '';
    $scope.SectionId = "0";
    $scope.ExamNameId = "0";
    $scope.SubjectNameId = '0';
    $scope.flag = 0;
    $scope.StudentMasterList = [];

    /* This is function for Pagination */
    $scope.listdata = [];
    $scope.current_page = 1;
    $scope.page_size = 10;

    $scope.rembemberCurrentPage = function (p) {
        $scope.current_page = p
    }



    $scope.model = {
        selectedLabelList: []
    }




    $scope.isSelectAll = function () {
        $scope.model.selectedLabelList = [];
        if ($scope.master) {
            $scope.master = true;
            for (var i = 0; i < $scope.marksheetList.length; i++) {
                $scope.model.selectedLabelList.push($scope.marksheetList[i].Id);
            }
        } else {
            $scope.master = false;
        }
        angular.forEach($scope.marksheetList, function (item) {
            item.selectedstudent = $scope.master;
        });
    }

    $scope.SchoolNameList = [];
    $http.get('/getSchool_NameList/').then(function success(response) {
        $scope.SchoolNameList = response.data;
    });



    $scope.HallTicketList = [];

    $scope.examlistsearch = function () {
        if ($scope.Validationcontrols() == true) {
            var obj = {
                AcademicYearId: $scope.AcademicYearId,
                MediumId: $scope.MediumId,
                CourseId: $scope.CourseId,
                SectionId: $scope.SectionId,
                ExamNameId: $scope.ExamNameId,
                SubjectNameId: $scope.SubjectNameId
            };
            $http.post(baseUrl + '/Marksheetdetails', obj).then(function success(response) {

                $scope.emptydata = [];
                $scope.marksheetList = [];
                $scope.marksheetList = response.data;
                // console.log($scope.StudentName);
                if ($scope.marksheetList.length > 0) {
                    $scope.flag = 1;
                } else {
                    $scope.flag = 0;
                }
                // });
                $scope.PrintMarksheet();
            });
           

        }
       


        $scope.checkAll = function () {
            if (!$scope.selectedall) {
                $scope.selectedall = true;
            } else {
                $scope.selectedall = false;
            }
            // row in StudentList
            angular.forEach($scope.StudentList, function (row) {
                row.StudSelectionList[$index] = $scope.selectedall;
            });
        };
        $scope.StudSelection = [];
        $scope.StudSelectionList = [];
        $scope.Present = 1;
        $scope.Absent = 0;
        $scope.MarksheetStudentList = [];
        $scope.MarksheetStudentSubjectList = [];
        $scope.PrintMarksheet = function () {
            if ($scope.Validationcontrols() == true) {
                angular.forEach($scope.marksheetList, function (value, studentindex) {
                    if (value.selectedstudent == true) {

                        var obj123 = {
                            StudentId: value.Id,
                        };                        
                    }
                    $http.post(baseUrl + '/MarksheetStudentPrint', obj123).then(function success(response) {
                        $scope.MarksheetStudentList = response.data;
                    })
                    $http.post(baseUrl + '/MarksheetStudentSubjectPrint', obj123).then(function success(response) {
                        $scope.MarksheetStudentSubjectList = response.data;
                    })
                });
                
            }
        };


        // $scope.GenerateHallTicket = function () {
        //     angular.forEach($scope.HallTicketList, function (value, studentindex) {
        //         if (value.selectedstudent == true) {
        //             var obj = {
        //                 Id: $scope.Id,
        //                 StudentId: value.Id,
        //                 CourseId: $scope.CourseId,
        //                 AcademicYearId: $scope.AcademicYearId,
        //                 ExamNameId: $scope.ExamNameId
        //             };

        //             $http.post(baseUrl + '/GenerateHallTicket_AddEdit', obj).then(function success(response) {
        //                 if (response.data !== 0) {
        //                     $sid = response.data;
        //                 } else {
        //                     alert("Insert/Update Problem");
        //                 }
        //             });

        //         }
        //         alert("Hall Ticket Generated Successfully");
        //     });
        // }








    };
    $scope.AcademicYearList = [];
    $http.post(baseUrl + '/getAcademicYearList', InstObj).then(function success(response) {
        $scope.AcademicYearList = response.data;
        $scope.AcyYear = $ff(response.data, {
            academicflag: 1
        });
        $scope.AcademicYearId = $scope.AcyYear[0].id.toString();
        $scope.AcademicYearBasedCourseFunction();
    });
    $scope.AcademicYearBasedCourseFunction = function () {
        var obj = {
            AcademicYearId: $scope.AcademicYearId,
            InstitutionId: $scope.InstitutionId
        }
        //console.log(obj);
        $http.post(baseUrl + '/getAcademicYearBasedCourse', obj).then(function success(response) {
            $scope.Courselist = response.data;
        });
        // }
    }
    // $scope.AcademicYearBasedCourseFunction();
    $scope.MediumList = [];
    $http.get(baseUrl + '/getmediumlist').then(function success(response) {
        $scope.Mediumlist = response.data;
        // console.log(response.data);
    });

    $scope.SectionList = [];
    $http.post(baseUrl + '/getSectionList', InstObj).then(function success(response) {
        $scope.SectionList = response.data;
    });

    $scope.CourseBasedSectionList = [];
    $scope.CourseBasedSectionFunction = function () {
        var obj = {
            AcademicYearId: $scope.AcademicYearId,
            CourseId: $scope.CourseId
        };
        $http.post(baseUrl + '/getCourseBasedSectionList', obj).then(function success(response) {
            $scope.CourseBasedSectionList = response.data;
        });
    }

    $scope.CourseClearFunction = function () {

        $scope.CourseId = '';
        $scope.marksheetList = [];
    };
    $scope.CourseBasedExamNameFunction = function () {
        var obj = {
            AcademicYearId: $scope.AcademicYearId,
            CourseId: $scope.CourseId
        }
        //console.log(obj);
        $http.post(baseUrl + '/getCourseBasedExamList', obj).then(function success(response) {
            $scope.ExamNameList = response.data;
        });
    };
    $scope.ExamNameClearFunction = function () {
        $scope.ExamNameId = "0";
        $scope.SectionId = "0";

        $scope.flag = 0;
        $scope.marksheetList = [];

    };
    $scope.List_SubjectList = [];

    $scope.SubjectClearfunction = function () {
        $scope.SubjectNameId = "0";
        $scope.marksheetList = [];
        $scope.flag = 0;
    };

    $scope.Validationcontrols = function () {
        if (typeof ($scope.AcademicYearId) == "undefined" || $scope.AcademicYearId == "0") {
            alert("Please select Academic Year");
            return false;
        } else if (typeof ($scope.CourseId) == "undefined" || $scope.CourseId == "") {
            alert("Please select Course");
            return false;
        } else if (typeof ($scope.ExamNameId) == "undefined" || $scope.ExamNameId == "0") {
            alert("Please select Exam Name");
            return false;
        }

        return true;
    };

    $scope.checkAll = function () {
        if (!$scope.selectedall) {
            $scope.selectedall = true;
        } else {
            $scope.selectedall = false;
        }
        // row in StudentList
        //ng-model="StudSelectionList[$index]"
        /// StudSelectionList[$index]
        // $scope.StudSelectionList[studentindex]
        //$scope.StudSelectionList[studentindex]=='true'
        angular.forEach($scope.StudentList, function (row) {
            //StudSelectionList[index]
            row.StudSelectionList[$index] = $scope.selectedall;
        });
    };
}]);
OEMSController.controller("StudentReportsController", ['$scope', '$http', '$state','$window', 'filterFilter', '$stateParams', '$filter',
    function ($scope, $http, $state,$window, $ff, $stateParams, $filter) {
        if(loginFrom==0)
        {
             window.location.href = baseUrl + "/";        
        }
        $scope.InstitutionId = $window.localStorage['Institution_Id'];
        var InstObj = {
            InstitutionId: $scope.InstitutionId
        }
        $scope.Id = 0;
        
        // Filter Function
        $scope.Id = 0;
        $scope.MediumId = "0";
        $scope.CourseId = "0";
        $scope.SectionId = "0";
        $scope.flag = 0;
        $scope.StudentMasterList = [];
       
       
        /* This is function for Pagination */
        $scope.listdata = [];
        $scope.current_page = 1;
        $scope.page_size = 10;

        $scope.rembemberCurrentPage = function (p) {
            $scope.current_page = p
        }

        $scope.AcademicYearList = [];
        $http.post(baseUrl + '/getAcademicYearList', InstObj).then(function success(response) {
            $scope.AcademicYearList = response.data;
            $scope.AcyYear = $ff(response.data, {
                academicflag: 1
            });
            $scope.AcademicYearId = $scope.AcyYear[0].id.toString();
            $scope.AcademicYearBasedCourseFunction();
        });
        $scope.AcademicYearBasedCourseFunction = function () {
            var obj = {
                AcademicYearId: $scope.AcademicYearId,
                InstitutionId: $scope.InstitutionId
            }
            $http.post(baseUrl + '/getAcademicYearBasedCourse', obj).then(function success(response) {
                $scope.Courselist = response.data;
            });
        }
        $scope.MediumList = [];
        $http.post(baseUrl + '/getmediumlist', InstObj).then(function success(response) {
            $scope.Mediumlist = response.data;
        });

        $scope.SectionList = [];
        $http.post(baseUrl + '/getSectionList', InstObj).then(function success(response) {
            $scope.SectionList = response.data;
        });

        $scope.CourseBasedSectionList = [];
        $scope.CourseBasedSectionFunction = function () {
            var obj = {
                AcademicYearId: $scope.AcademicYearId,
                CourseId: $scope.CourseId
            };
            $http.post(baseUrl + '/getCourseBasedSectionList', obj).then(function success(response) {
                $scope.CourseBasedSectionList = response.data;
            });
        }

        $scope.CourseClearFunction = function () {
            $scope.CourseId = '';
            $scope.HallTicketList = [];
        };

        $scope.flag = 0;
        $scope.studentlist = [];
        $scope.studentmasterlist = function () {
          
            var obj = {
                AcademicYearId: $scope.AcademicYearId,
                CourseId: $scope.CourseId,
                SectionId: $scope.SectionId               
            };
               
            $http.post(baseUrl + '/StudentReportList', obj).then(function success(response) {
                $scope.emptydata = [];
                $scope.studentlist = [];
                $scope.studentlist = response.data;
                
                if ($scope.studentlist.length > 0) {
                    $scope.flag = 1;
                } else {
                    $scope.flag = 0;
                }

            })
        }
       
    }
]);
OEMSController.controller("ExamAttendanceReportController", ['$scope', '$http', '$state','$window', 'filterFilter', '$stateParams', '$filter',
    function ($scope, $http, $state,$window, $ff, $stateParams, $filter) {
        if(loginFrom==0)
        {
             window.location.href = baseUrl + "/";        
        }
        $scope.Id=0;
        $scope.InstitutionId = $window.localStorage['Institution_Id'];
        $scope.EvaluatedId = 1;
        $scope.ABCourseId=0;
        $scope.AcademicYearId = "2";
        $scope.ExamCenterId = "0";        
        $scope.CourseId = "0";
        $scope.SubjectId = "0";
        $scope.ExamId = "0";
        $scope.PreviousRow = 0;
      
        $scope.Tabvalue = 0;
        var InstObj = {
            InstitutionId: $scope.InstitutionId
                }

                      
        /* This is function for Pagination */
        $scope.listdata = [];
        $scope.current_page = 1;
        $scope.page_size = 10;
        $scope.rembemberCurrentPage = function (p) {
            $scope.current_page = p
        }

            $scope.PaperEvaluationAdd = function (Id) {   
                //console.log(Id)        
                $state.go('PaperEvaluationedit', {
                    Id: Id
                });
            }
          
          
        $scope.AcademicYearList = [];
        $http.post(baseUrl + '/getAcademicYearList',InstObj).then(function success(response) {
            $scope.AcademicYearList = response.data;
            $scope.AcyYear = $ff(response.data, {
                academicflag: 1
            });
            // $scope.QBAcademicYear = $scope.AcyYear[0].id.toString();
            // $scope.QBAcademicYear = $scope.AcyYear[0].id.toString();
        });
        $scope.ExamCenter_List = [];
        $http.post(baseUrl + '/ExamCenterList',InstObj).then(function success(response) {
            $scope.ExamCenter_List = response.data;
            $scope.AcyYear = $ff(response.data, {
                academicflag: 1
            });
            // $scope.QBAcademicYear = $scope.AcyYear[0].id.toString();
            // $scope.QBAcademicYear = $scope.AcyYear[0].id.toString();
        });
        

        $scope.AcademicYearBasedCourseFunction = function () {
            if ($scope.AcademicYearId == 0) {
                $http.post(baseUrl + '/getcourselist', InstObj).then(function success(response) {
                    $scope.Courselist = response.data;
                });
            } else {
                var obj = {
                    AcademicYearId: $scope.AcademicYearId,
                    InstitutionId: $scope.InstitutionId
                }
                $http.post(baseUrl + '/getAcademicYearBasedCourse', obj).then(function success(response) {
                    $scope.Courselist = response.data;
                });
            }
            //console.log( $scope.Courselist);
        }

        $scope.CourseClearFunction = function () {
            $scope.Course = '0';
        };

        $scope.CourseBasedExamNameFunction = function () {
            // alert('hi');
            if ($scope.CourseId == 0) {
                $http.post(baseUrl + '/getExamNameList', InstObj).then(function success(response) {
                    $scope.ExamNameList = response.data;
                });
            } else {

                var obj = {
                    AcademicYearId: $scope.AcademicYearId,
                    CourseId: $scope.CourseId

                }
                $http.post(baseUrl + '/getCourseBasedExamList', obj).then(function success(response) {
                    $scope.ExamNameList = response.data;
                });
            }

        };
       
        $scope.CourseClearFun = function () {
            $scope.Course = '0';
        }
      
        $scope.ExamNameClearFun = function () {
            // alert('hi');
            $scope.ExamName = '0';
        }
        $scope.SubjectListObj=[];
        $scope.SubjectId="0";
        $scope.ExamBasedSubjectforList = function () {
            var obj = {
                AcademicYearId: $scope.AcademicYearId,
                CourseId: $scope.CourseId,
                ExamNameId: $scope.ExamId
            }

            $http.post(baseUrl + '/getExamBasedSubjectList', obj).then(function success(response) {
                $scope.SubjectListObj = response.data;
              
            });
        };
      

            $scope.getExamAttendance_List = function () {  
                
    
                var obj = {
                    InstitutionId: $scope.InstitutionId,
                    AcademicYearId: $scope.AcademicYearId,                   
                    CourseId: $scope.CourseId,
                    SubjectId: $scope.SubjectId,
                    ExamId: $scope.ExamId,
                    ExamCenterId : $scope.ExamCenterId
                }
             
                $http.post(baseUrl + '/ExamAttendance_List', obj).then(function success(response) {
                    $scope.emptydata = [];
                    $scope.ExamAttendance = [];
                    $scope.ExamAttendance = response.data;
                    if ($scope.ExamAttendance.length > 0) {
                        $scope.flag = 1;
                    } else {
                        $scope.flag = 0;
                    }
               
                                    
                });
                $scope.ExamAttendance_View_Count();
            };
         
         
            $scope.ExamAttendance_View_Count = function () {              
            
                var obj = {
                    InstitutionId: $scope.InstitutionId,
                    AcademicYearId: $scope.AcademicYearId,                   
                    CourseId: $scope.CourseId,
                    SubjectId: $scope.SubjectId,
                    ExamId: $scope.ExamId,
                    ExamCenterId : $scope.ExamCenterId
                    
                }
              
                $http.post(baseUrl + '/ExamAttendance_View', obj).then(function success(response) {
                 
                    $scope.TotalCount = response.data[0].totalcount;  
                    $scope.PresentCount= response.data[0].presentcount;
                    $scope.absentcount = response.data[0].absentcount;   
                  
                });
            };
    }
]);
OEMSController.controller("DashboardController", ['$scope', '$http', '$state', '$filter', '$stateParams', '$window', 'CommonLabelNames', 'CommonHeadingNames', 'CommonButtonNames', 'filterFilter',
function ($scope, $http, $state, $filter, $stateParams, $window, $CommonLabelNames, $CommonHeadingNames, $CommonButtonNames, $ff) {
 
    loginFrom=1;
    $scope.Graphs = function () {
        $state.go('Dashboard');
    }
    $scope.Attendance = function () {
        $state.go('DashboardAttendanceReport');
    }
    $scope.CenterWise = function () {
        $state.go('Examwiseattendance');
    }
    $scope.Evaluation = function () {
        $state.go('Evaluation');
    }
   
    $scope.InstitutionId = $window.localStorage['Institution_Id'];
    $scope.SubjectIdgraph1 = "0";
    $scope.EvaluatorIdgraph1  = "0";     
    $scope.CenterIdgraph1  = "0";
    $scope.FilterInstitutionIdgraph2 = "0";
    $scope.CenterIdgraph2 = "0";
    $scope.FilterInstitutionIdgraph3 = "0";
    $scope.CenterIdgraph3 = "0";
    $scope.FilterInstitutionIdgraph4 = "0";
    $scope.CenterIdgraph4 = "0";
    $scope.FilterInstitutionIdgraph5 = "0";
    $scope.CenterIdgraph5 = "0";
    var insobj = {
        InstitutionId: $scope.InstitutionId
    };

    $scope.InstitutionCenterBased = function (graph) {
    if(graph == 2){
    var centerobj = {
        InstitutionId: $scope.FilterInstitutionIdgraph2,
        CenterId: $scope.CenterIdgraph2,
    
    };
    $http.post(baseUrl + '/getInstitution_Listcenter', centerobj).then(function success(response) {
      
        $scope.Institution_List2 = response.data;
    });
    }
    else if(graph == 3){
        var centerobj = {
            InstitutionId: $scope.FilterInstitutionIdgraph3,
            CenterId: $scope.CenterIdgraph3,
        
        };
        $http.post(baseUrl + '/getInstitution_Listcenter', centerobj).then(function success(response) {
          
            $scope.Institution_List3 = response.data;
        });
        }
    else  if(graph == 4){
        var centerobj = {
            InstitutionId: $scope.FilterInstitutionIdgraph4,
            CenterId: $scope.CenterIdgraph4,
        
        };
        $http.post(baseUrl + '/getInstitution_Listcenter', centerobj).then(function success(response) {
          
            $scope.Institution_List4 = response.data;
        });
        }  
    else if(graph == 5){
        var centerobj = {
            InstitutionId: $scope.FilterInstitutionIdgraph5,
            CenterId: $scope.CenterIdgraph5,
        
        };
        $http.post(baseUrl + '/getInstitution_Listcenter', centerobj).then(function success(response) {
          
            $scope.Institution_List5 = response.data;
        });
        }      
    }
    $scope.InstitutionClearfunction = function (graph) {
        if(graph == 2){
        $scope.FilterInstitutionIdgraph2 = "0";      
        $scope.Institution_List2 = [];
        }
        else if (graph == 3){
            $scope.FilterInstitutionIdgraph3 = "0";      
            $scope.Institution_List3 = [];
        }
        else if (graph == 4){
            $scope.FilterInstitutionIdgraph4 = "0";      
            $scope.Institution_List4 = [];
        }
        else if(graph == 5) {
            $scope.FilterInstitutionIdgraph5 = "0";      
            $scope.Institution_List5 = [];
        }
    };  
  
        var centerobj = {
            InstitutionId: $scope.FilterInstitutionId,
            CenterId: $scope.CenterId,
        
        };
        $http.post(baseUrl + '/getInstitution_Listcenter', centerobj).then(function success(response) {
          
            $scope.Institution_List = response.data;
            $scope.Institution_List2 = response.data;
            $scope.Institution_List3 = response.data;
            $scope.Institution_List4 = response.data;
            $scope.Institution_List5 = response.data;
        });
   
        $scope.SubjectListObj=[];
        $scope.SubjectId="0";
        $scope.ExamBasedSubjectforList = function () {
            var obj = {
                AcademicYearId:1,
                CourseId: 1,
                ExamNameId: 1
            }
            $http.post(baseUrl + '/getExamBasedSubjectList_Timetable', obj).then(function success(response) {
                $scope.SubjectListObj = response.data;
              
            });
        };
      
        
    $http.post(baseUrl + '/getSubjectNamelist', insobj).then(function success(response) {
        $scope.Filter_SubjectList = response.data;
    });
    $scope.AttendanceList=[];
    
    $scope.evaluationdetails_graphs_list = function() {
        $("#chatLoaderPV").show();
    var obj = {
        SubjectId: $scope.SubjectIdgraph1,
        EvaluatorId: $scope.EvaluatorIdgraph1 ,      
        ExamCenterId : $scope.CenterIdgraph1
        
    }
    $http.post(baseUrl + '/getDashboard_graph',obj).then(function success(response) {
       
        $scope.abchecker=[];
        
        $scope.abchecker = response.data;
        
        var dataJSONArray = $scope.abchecker; 

        var arr = [];      

        angular.forEach($scope.abchecker, function (value, index) {
            var arritem=[];                
            arritem.push(value.name);    
            arritem.push(parseInt(value.totalab));      
           // arritem.push(value.answerbook_count);            
            arr.push(arritem);
          
        })
        //console.log(arr);
        // Highcharts.chart('container_abchecker', {
        //     chart: {
        //         type: 'column'
        //     },
        //     title: {
        //         text: 'Evaluation Graph'
        //     },
            
        //     xAxis: {
        //         type: 'category',             
        //         labels: {
        //             rotation: -45,
        //             style: {
        //                 fontSize: '13px',
        //                 fontFamily: 'Verdana, sans-serif'
        //             }
        //         }
        //     },
        //     yAxis: {
        //         min: 0,
        //         title: {
        //             text: 'No.of Count'
        //         }
        //     },
        //     legend: {
        //         enabled: false
        //     },
            
        //     tooltip: {
        //         pointFormat: 'AB Count : <b>{point.y:.1f} </b>'
        //     },
          
        //     series: [{
        //         name: 'Value ',
        //         data: arr,
        //         dataLabels: {
        //             enabled: true,
        //             rotation: -90,
        //             color: '#FFFFFF',
        //             align: 'right',
        //             format: '{point.y:.1f}', // one decimal
        //             y: 10, // 10 pixels down from the top
        //             style: {
        //                 fontSize: '13px',
        //                 fontFamily: 'Verdana, sans-serif'
        //             }
        //         }
        //         }             
        //     ]
        // });
        Highcharts.chart('container_abchecker', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: null
            },
           
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                name: 'Value',
                data:arr,
            }]
        });
    })
    $("#chatLoaderPV").hide();
    }
    $scope.evaluation_subject_graphs_list = function() {
        $("#chatLoaderPV").show();
        var obj = {
            
            InstitutionId: $scope.FilterInstitutionIdgraph2 ,      
            ExamCenterId : $scope.CenterIdgraph2
            
        }
        $http.post(baseUrl + '/getevaluation_subjectgraph',obj).then(function success(response) {
    
            $scope.abchecker_subjectwise=[];
            
            $scope.abchecker_subjectwise = response.data;
            
            var dataJSONArray = $scope.abchecker_subjectwise; 
    
            var subject  = [];
            var pass = [];
            var fail = [];
            angular.forEach($scope.abchecker_subjectwise, function (value, index) {
                var arritemsub=[];
                var arritempass=[];
                var arritemfail=[];
                arritemsub.push(value.name);
                arritempass.push(parseInt(value.pass));          
                arritemfail.push(parseInt(value.fail)); 
                
                subject.push(arritemsub);
                pass.push(arritempass);
                fail.push(arritemfail);
              
            })
         //   console.log(arr);
            Highcharts.chart('container_subject', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: null
                },                
                credits:{enabled:false},
                legend:{
                },
                plotOptions: {
                    series: {
                        shadow:false,
                        borderWidth:0,
                    }
                },
                xAxis:{
                    type: 'category',     
                    categories: subject    ,               
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis:{
                    lineColor:'#999',
                    lineWidth:1,
                    tickColor:'#666',
                    tickWidth:1,
                    tickLength:3,
                    gridLineColor:'#ddd',
                    title:{
                        text:'No.of Students',
                        rotation:0,
                        margin:50,
                    }
                },    
                tooltip: {
                    pointFormat: 'No.of Students : <b>{point.y:.0f} </b>'
                },
                // series: [{
                //     data:arr.pass
                // },{
                //     data:arr.fail
                // }]
                
                series: [
                    {
                    name: 'Pass ',
                    data: pass,
                    dataLabels: {
                        enabled: true,
                        rotation: -90,
                        color: '#FFFFFF',
                        align: 'right',
                        format: '{point.y:.0f}', // one decimal
                        y: 10, // 10 pixels down from the top
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                }
               ,
                    {
                    name: 'Fail ',
                    data: fail,
                    dataLabels: {
                        enabled: true,
                        rotation: -90,
                        color: '#FFFFFF',
                        align: 'right',
                        format: '{point.y:.0f}', // one decimal
                        y: 10, // 10 pixels down from the top
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                }
                ]
            });
            
        })
        $("#chatLoaderPV").hide();
    }
    $scope.marks_detailed_graph = function() {
        $("#chatLoaderPV").show();
        var obj = {
            
            InstitutionId: $scope.FilterInstitutionIdgraph3 ,      
            ExamCenterId : $scope.CenterIdgraph3
            
        }
        $http.post(baseUrl + '/getmarks_detailedgraph',obj).then(function success(response) {
    
            $scope.abchecker_subjectwise=[];
            
            $scope.abchecker_subjectwise = response.data;
            
            var dataJSONArray = $scope.abchecker_subjectwise; 
    
            var arr = [];
           
    
            angular.forEach($scope.abchecker_subjectwise, function (value, index) {
                var arritem=[];
               
                arritem.push(value.name);
                arritem.push(parseInt(value.passcount));          
               
                
                arr.push(arritem);
               
            })
            //console.log(arr);
            Highcharts.chart('container_marks', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: null
                },
                
                xAxis: {
                    type: 'category',                   
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'No.of Students'
                    }
                },
                legend: {
                    enabled: false
                },
                
                tooltip: {
                    pointFormat: 'No.of Students : <b>{point.y:.0f}</b>'
                },
              
                series: [
                    {
                    name: 'Value',
                    data: arr,
                    dataLabels: {
                        enabled: true,
                        rotation: -90,
                        color: '#FFFFFF',
                        align: 'right',
                        format: '{point.y:.0f}', // one decimal
                        y: 10, // 10 pixels down from the top
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                }
                ]
            });
            
        })
        $("#chatLoaderPV").hide();
    }
    $scope.attendance_detailed_graph = function() {
        $("#chatLoaderPV").show();
        var obj = {
            
            InstitutionId: $scope.FilterInstitutionIdgraph4 ,      
            ExamCenterId : $scope.CenterIdgraph4
            
        }
        $http.post(baseUrl + '/getattendance_detailedgraph',obj).then(function success(response) {
    
            $scope.abchecker_subjectwise=[];
            
            $scope.abchecker_subjectwise = response.data;
            
            var dataJSONArray = $scope.abchecker_subjectwise; 
    
            var arr = [];

            angular.forEach($scope.abchecker_subjectwise, function (value, index) {
                var arritem=[];
              
                arritem.push(value.name);
                arritem.push(parseInt(value.totalpresent));          
               
                
                
                arr.push(arritem);
                
            })
            //console.log(arr);
            Highcharts.chart('container_attendance', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: null
                },
                
                xAxis: {
                    type: 'category',                  
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'No.of Students'
                    }
                },
                legend: {
                    enabled: false
                },
                
                tooltip: {
                    pointFormat: 'No.of Students : <b>{point.y:.0f} </b>'
                },
               
                series: [
                    {
                    name: 'Value',
                    data: arr,
                    dataLabels: {
                        enabled: true,
                        rotation: -90,
                        color: '#FFFFFF',
                        align: 'right',
                        format: '{point.y:.0f}', // one decimal
                        y: 10, // 10 pixels down from the top
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                }
                ]
            });
            
        })
        $("#chatLoaderPV").hide();
    }
  
    $scope.attendance_subject_graph = function() {
           $("#chatLoaderPV").show();
        var obj = {
            
            InstitutionId: $scope.FilterInstitutionIdgraph5 ,      
            ExamCenterId : $scope.CenterIdgraph5
            
        }
        $http.post(baseUrl + '/getattendance_subjectgraph',obj).then(function success(response) {
    
            $scope.abchecker_subjectwise=[];
            
            $scope.abchecker_subjectwise = response.data;
            
            var dataJSONArray = $scope.abchecker_subjectwise; 
    
            var subject  = [];
            var present = [];
            var absence = [];         
    
            angular.forEach($scope.abchecker_subjectwise, function (value, index) {
                var arritemsub=[];
                var arritempre=[];
                var arritemabs=[];
                arritemsub.push(value.name);
                arritempre.push(parseInt(value.totalpresent));          
                arritemabs.push(parseInt(value.totalabsence)); 
                
                subject.push(arritemsub);
                present.push(arritempre);
                absence.push(arritemabs);       
              
               
            })
            $("#chatLoaderPV").hide();
            Highcharts.chart('container_attendancesubject', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: null
                },
                credits:{enabled:false},
                legend:{
                },
                plotOptions: {
                    series: {
                        shadow:false,
                        borderWidth:0,
                    }
                },
                xAxis: {
                    type: 'category',    
                    categories: subject    ,        
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'No.of Students'
                    }
                },
             
                
                tooltip: {
                    pointFormat: 'No.of Students : <b>{point.y:.0f}</b>'
                },
              
                series: [
                    {
                    name: 'Present ',
                    data: present,
                    dataLabels: {
                        enabled: true,
                        rotation: -90,
                        color: '#FFFFFF',
                        align: 'right',
                        format: '{point.y:.0f}', // one decimal
                        y: 10, // 10 pixels down from the top
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                }
               ,
                    {
                    name: 'Absence ',
                    data: absence,
                    dataLabels: {
                        enabled: true,
                        rotation: -90,
                        color: '#FFFFFF',
                        align: 'right',
                        format: '{point.y:.0f}', // one decimal
                        y: 10, // 10 pixels down from the top
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                }
                ]
            });
            $("#chatLoaderPV").hide();
        })
      
    }
    $scope.evaluationchildlist = [];
    $scope.getevaluation_report = function () {
       $http.post(baseUrl + '/getevaluationsummary').then(function success(response) {
           $scope.emptydata=[];
           console.log(response.data);
           $scope.evaluationchildlist = response.data;
       });
   }
   $scope.GetEvaluationSummaryData = function (obj) {
    $("#chatLoaderPV").show();
    obj = {
        studenDate: $scope.subjectDate1,
    };
    $http.post(baseUrl + '/getevaluation_summary_report', obj).then(function success(response) {
        $scope.emptydata = [];

        $scope.evaluationchildlist = [];
        $scope.evaluationchildlist = response.data;
    $scope.currentdate = new Date();
        angular.forEach(response.data, function (value, key) {
            if(value.reporttype=="1")
            {
                $scope.sub_subtoday=$scope.sub_subtoday+value.submitedtoday;
                $scope.sub_subtilldate=$scope.sub_subtilldate+value.submitedtotal;
                $scope.sub_comtoday=$scope.sub_comtoday+value.completedtoday;
                $scope.sub_comtilldate=$scope.sub_comtilldate+value.completedtotal;               
            }
            else
            {
                $scope.eva_subtoday=$scope.eva_subtoday+value.submitedtoday;
                $scope.eva_subtilldate=$scope.eva_subtilldate+value.submitedtotal;
                $scope.eva_comtoday=$scope.eva_comtoday+value.completedtoday;
                $scope.eva_comtilldate=$scope.eva_comtilldate+value.completedtotal;
            }
        });
        $("#chatLoaderPV").hide();
    })
}
$scope.GetEvaluationSummaryData();
}     
]);
OEMSController.controller("UserRoleMappingController", ['$scope', '$http', '$state', 'filterFilter', '$stateParams',
    function ($scope, $http, $state, $ff, $stateParams) {
        if(loginFrom==0)
        {
             window.location.href = baseUrl + "/";        
        }
        // List Page Pagination.
        //$scope.Id = "0";
        $scope.listdata = [];
        $scope.current_pages = 1;
        $scope.page_sizes = 30;
        $scope.rembemberCurrentPages = function (p) {
            $scope.current_pages = p
        }

        // List Page Pagination.
        $scope.current_page = 1;
        $scope.page_size = 10;
        $scope.rembemberCurrentPage = function (p) {
            $scope.current_page = p
        }

        /* Validating the create page mandatory fields
       checking mandatory for the follwing fields
       UserRoleName,SystemRole
       and showing alert message when it is null.
       */
        $scope.Validationcontrols = function () {

            if (typeof ($scope.UserRollName) == "undefined" || $scope.UserRollName == "") {
                alert("Please enter User Role Name");
                return false;
            } else if (typeof ($scope.SystemRole.length) == "undefined" || $scope.SystemRole.length == "0") {
                alert("Please select System Roles");
                return false;
            }
            return true;
        };

        // Declaration and initialization of Scope Variables.
        $scope.UserRole_Id = "0";
        $scope.UserRoleList = [];
        $scope.SystemRole_Id = [];
        $scope.EmployeeNameList = [];
        $scope.SystemRole = [];
        $scope.SystemRoles_Id = "0";
        $scope.UserRoleName = "";
        // $scope.Id = "0";

        // Declaration and initialization of row collection Variables.
        $scope.Initial = function () {
            $scope.rowCollection = [];
            $scope.rowCollections = [];
            $scope.flag = 0;
            $scope.flags = 0;
        }
        /* FUNCTION IS LIST THE EMPLOYEES  */
        $scope.EmployeeMappingTabClick = function () {
            $scope.UserRoleListFn();
            //$scope.ViewEmployeeDetails();
        };

        $scope.SystemRoleList = [];
        $http.get(baseUrl + '/getSystemRolelist').then(function success(response) {
            $scope.SystemRoleList = response.data;
            //console.log($scope.SystemRoleList);
        });

        //getDepartmentList
        $scope.DepartmentNameList = [];
        $http.post(baseUrl + '/getDepartmentList').then(function success(response) {
            $scope.DepartmentNameList = response.data;
            //console.log($scope.SystemRoleList);
        });

        $scope.getUserRole = [];
        $scope.UserRoleListFn = function () {

            $http.get(baseUrl + '/getUserRoleDetailslist').then(function success(response) {
                $scope.getUserRole = response.data;
            });
        };
        $scope.UserRoleListFn();


        /* Open the create pop up window */
        $scope.AddUser = function (ESId) {
            $scope.Id = ESId;
            angular.element('#MapView').modal('show');
        }


        $scope.Id = 0;

        // $scope.DuplicateId = 0;

        /*
    Calling the api method to view the details of the system role 
    for the system role  Id 
    and display the details in the view pop up window.
    */
        $scope.ViewSystemDetails = function (Id) {
            //$scope.SystemRoles_Id = Id;
            var data = {
                Id: $scope.Id
            }
            //console.log(data);
            $http.post(baseUrl + '/getUserrole_SystemRole_View', data).then(function success(response) {

                $scope.SystemRole = [];
                angular.forEach(response.data, function (Item, Index) {
                    var locObj = {
                        Id: Item.SystemRole_Id
                    }
                    $scope.SystemRole.push(locObj);
                });

            }).error(function (data) {
                $scope.error = "An error has occcurred while viewing Role Mapping details!" + data;
            });
        };

        /* THIS IS FOR ROLE MAPPING DELETE FUNCTION */
        $scope.SysIdList = "";
        $scope.SystemDeleteItemslist = function () {
            for (i = 0; i < $scope.SystemRole.length; i++) {

                if ($scope.SysIdList != "") {
                    $scope.SysIdList = $scope.SysIdList + ",";
                }
                $scope.SysIdList = $scope.SysIdList + $scope.SystemRole[i].Id.toString();
            };
        };

        /*
        Call the api method for insert and Update the record for a system role
        and display the record of selected system role when Id is greater than 0
        in edit.html and provide an option for create and modify the system role and save the system role record
        */
        $scope.DuplicateId = 0;

        $scope.Value = [];
        $scope.SaveMapping = function () {

            if ($scope.UserRollName != "") {

                var obj1 = {
                    Id: $scope.DuplicateId,
                    UserRollName: $scope.UserRollName
                }
                //console.log(obj1);
                $http.post(baseUrl + '/getUserRole_DuplicateChecking', obj1).then(function success(response) {
                    //console.log(response.data);

                    $scope.Value = response.data;

                    angular.forEach($scope.Value, function (v, index) {
                        $scope.val = v.val;
                        //console.log($scope.val);
                    })
                    // console.log($scope.Value[val]);
                    if ($scope.val == 1) {
                        alert("User Role already exists,cannot duplicate");
                        return false;
                    }

                    $scope.SaveMappingAddEdit();
                })

            } else {

                $scope.SaveMappingAddEdit();
            }


        };



        $scope.tempArr = [];
        $scope.SaveMappingAddEdit = function () {
            if ($scope.Validationcontrols() == true) {


                var obj = {
                    Id: $scope.Id,
                    UserRollName: $scope.UserRollName
                };
                //console.log(obj);
                $http.post(baseUrl + '/getAddUserRole', obj).then(function success(response) {
                    $scope.URId = response.data;
                    $scope.MasterId = response.data;

                    angular.forEach($scope.SystemRole, function (value, index) {
                        //value.URID = $scope.URId;
                        $scope.tempArr.push(value.Id);
                    });
                    // console.log($scope.tempArr);

                    var objchild = {
                        Id: $scope.Id,
                        UserRole_Id: $scope.URId,
                        SystemRole_Id: $scope.tempArr
                    };
                    // console.log(objchild);
                    $http.post(baseUrl + '/getAddUserRoleSystemRole', objchild).then(function success(response) {
                        $scope.flag = 'Role';
                    });

                    $scope.SystemRole = "";
                    $scope.CancellPopup();
                    $scope.EmployeeMappingListGo();

                })
            }
        };

        $scope.EmployeeMappingListGo = function () {
            $scope.Id = 0;
            var ListsId = $scope.Id;
            $scope.ListPopUP(ListsId);
        };

        $scope.ListPopUP = function (RMsId) {
            $scope.Id = RMsId;
            $scope.EmployeeMappingList();
        }


        $scope.flag2 = 0;
        $scope.UserRoll_Name = "";

        $scope.EmployeeMappingListGo = function () {

            var obj = {
                Id: $scope.Id,
                UserRollName: $scope.UserRoll_Name
            };
            // console.log(obj);
            $http.post(baseUrl + '/getUserRoleList', obj).then(function success(response) {
                //console.log(response.data);
                $scope.emptydatas = [];
                $scope.rowCollections = [];
                $scope.rowCollections = response.data;

                if ($scope.rowCollections.length > 0) {
                    $scope.flag2 = 1;

                } else {
                    $scope.flag2 = 0;

                }

            })
        };
        $scope.EmployeeMappingList = function () {
            var obj = {
                Id: $scope.Id,
                UserRollName: $scope.UserRole_Name
            };
            $http.post(baseUrl + '/getUserRoleListEmployee', obj).then(function success(response) {
                //console.log(response.data);
                //   $scope.emptydatas = [];
                //           $scope.rowCollections = [];
                $scope.Empemptydatas = [];
                $scope.EmprowCollections = [];
                //   $scope.rowCollections = response.data;
                $scope.EmprowCollections = response.data;

                if ($scope.EmprowCollections.length > 0) {
                    $scope.flags = 1;

                } else {
                    $scope.flags = 0;

                }

                //     })
            });
        };


        /* THIS IS FOR ROLE MAPPING VIEW POPUP FUNCTION */
        $scope.ViewEmployee = function (EMId) {
            $scope.Id = EMId;
            $scope.ViewDetails();
            angular.element('#MapView').modal('show');
        };

        /* Open the view pop up window and show the details for the Employee for the  employee Id */
        $scope.ViewRMPopUP = function (RMId) {
            $scope.Id = RMId;
            $scope.ViewEmployeeDetails();
            angular.element('#RoleMapView').modal('show');
        };


        /* Open the view pop up window and show the details for the Employee for the  employee Id */

        $scope.ViewEmpPopUP = function (RMsId) {
            $scope.Id = RMsId;
            $scope.ViewEmpDetails();
            angular.element('#EmployeeMapView').modal('show');
        };

        /*
        Calling the api method to view the details of the employee
        for the employee Id 
        and display the details in the view pop up window.
        */
        //$scope.Id = 0;
        $scope.ViewApplicationDetails = function () {
            if ($stateParams.Id != undefined && $stateParams.Id > 0) {
                $scope.Id = $stateParams.Id;
            }
            var obj = {
                Id: $scope.Id
            }
            $http.post(baseUrl + '/getApplicationRoleList_SP_View', obj).then(function success(response) {
                //console.log(response.data);
                $scope.Id = response.data[0].Id;
                $scope.UserRollName = response.data[0].UserRollName;
                $scope.ViewEmpDetails($scope.Id);
            });
        };

        /* THIS IS FOR ROLE MAPPING CANCEL POPUP FUNCTION */
        $scope.CancellPopup = function () {
            $scope.flag = "";
            angular.element('#MapView').modal('hide');
            $scope.ClearPopuprole();

        }

        /* THIS IS FOR ROLE MAPPING CLEARE FUNCTION */
        $scope.ClearPopuprole = function () {
            $scope.flag = "";
            $scope.UserRollName = "";
            $scope.SysIdList = "";
            $scope.SystemRole = "";
            $scope.tempArr = [];
            //$scope.SystemRole_Id = [];
        }
        /*
        Calling the api method to view the details of the User Role
        for the company Id 
        and display the details in the view page.
        */
        $scope.ViewDetails = function () {

            var data = {
                Id: $scope.Id
            }

            $http.post(baseUrl + '/getApplication_View', data).then(function success(response) {
                //console.log(response.data);
                $scope.DuplicateId = response.data[0].id;
                $scope.UserroleId = response.data[0].id;
                $scope.UserRollName = response.data[0].userrollname;
                $scope.ViewSystemDetails($scope.Id);
            });
        };

        $scope.ViewEmployeeDetails = function () {

            if ($stateParams.Id != undefined && $stateParams.Id > 0) {
                $scope.Id = $stateParams.Id;
            }
            var data = {
                Id: $scope.Id
            }

            $http.post(baseUrl + '/getEmployeeDetails_View', data).then(function success(response) {
                //console.log(response.data);
                $scope.EmployeeId = response.data[0].id;
                $scope.Employee_No = response.data[0].employeenumber;
                $scope.Employee_Name = response.data[0].employeename;
                // $scope.DepartmentName = response.data[0].DepartmentId.toString();
                $scope.ViewDepartment_Name = response.data[0].departmentname;
                $scope.Designation = response.data[0].designationid.toString();
                $scope.ViewDesignation = response.data[0].designation;
                $scope.ViewRoleMappingDetails($scope.Id);


            });

        };

        /*
         Call the api method for insert and Update the record for a Application Role
         and display the record of selected Application Role when Id is greater than 0
         in edit.html and provide an option for create and modify the Application Role and save the Application Role record
         */
        $scope.tempArray = [];
        $scope.RoleMapAddEdit = function () {
            angular.forEach($scope.ApplicationRole, function (value, index) {
                //value.URID = $scope.URId;
                $scope.tempArray.push(value.Id);
            });

            var obj = {
                Id: $scope.Id,
                UserId: $scope.EmployeeId,
                ApplicationRoleId: $scope.tempArray
            };




            $http.post(baseUrl + '/getAddApplicationRoleMapping', obj).then(function success(response) {

                //console.log(response.data);
            });
            //$scope.ApplicationRole = "";
            //$scope.RoleMappingListGo();
            $scope.ListRolePopUP($scope.EmployeeId);
            $scope.CancelPopup();
        };


        /*
        Calling the api method to view the details of the Application Mapping
        for the Application Id 
        and display the details in the view pop up window.
        */
        $scope.ViewRoleMappingDetails = function (Id) {
            var data = {
                Id: $scope.Id
            }
            $http.post(baseUrl + '/getApplicationRoleMapping_SP_View', data).then(function success(response) {
                //console.log(response.data);
                $scope.ApplicationRole = [];
                angular.forEach(response.data, function (Item, Index) {
                    var locObj = {
                        Id: Item.ApplicationRoleId
                    }
                    $scope.ApplicationRole.push(locObj);
                });

            });
        };

        /* THIS IS FOR APPLICATION MAPPING CANCEL POPUP FUNCTION */
        $scope.CancelPopup = function () {
            angular.element('#RoleMapView').modal('hide');
            $scope.ClearPopup();
        }

        /*THIS IS FOR CLEAR FUNCITON */
        $scope.ClearPopup = function () {
            //$scope.tempArray = "";
            $scope.UserId = "0";
            $scope.UserRollName = "";
            $scope.tempArray = [];
        }



        /*THIS IS FOR LIST FUNCITON FOR GO BUTTON*/
        $scope.RoleMappingListGo = function () {
            $scope.Id = 0;
            var ListId = $scope.Id;
            $scope.ListRolePopUP(ListId);
        };

        /* THIS IS FOR APPLICATION MAPPING LIST POPUP FUNCTION */
        $scope.ListRolePopUP = function (RMId) {
            $scope.Id = RMId;
            $scope.RoleMappingList($scope.Id);
        }

        //getEmployeeList
        $scope.EmployeeList = [];
        $http.get(baseUrl + '/getStaffNamelist').then(function success(response) {
            $scope.EmployeeList = response.data;
            //console.log($scope.SystemRoleList);
        });


        /*
        Calling the api method to list the company details for the  filters  Employee No,Employee Name,Department Name and
        showing the result in table.
        */
        $scope.emptydata = [];
        $scope.rowCollection = [];
        $scope.flag = 0;

        $scope.RoleMappingList = function () {
            var data = {
                Id: $scope.Id,
                EmployeeName: $scope.EmployeeName,
                EmployeeNumber: $scope.EmployeeNumber,
                DepartmentId: $scope.DepartmentName
            }
            $http.post(baseUrl + '/getEmployeeList', data).then(function success(response) {
                //console.log(response);
                $scope.emptydata = [];
                $scope.rowCollection = [];
                $scope.rowCollection = response.data;

                if ($scope.rowCollection.length > 0) {
                    $scope.flag = 1;
                } else {
                    $scope.flag = 0;
                }

            })
        };

        $scope.ViewEmpDetails = function (Id) {
            $scope.ApplicationRoleId = Id;
            var data = {
                Id: $scope.Id
            }
            $http.post(baseUrl + '/getApplicationRoleMapping_SP_View', data).then(function success(response) {
                //console.log(response.data);
                $scope.Id = response.data[0].Id;
                $scope.UserRollName = response.data[0].UserRollName;

                $scope.EmployeeNameList = [];
                angular.forEach(response.data, function (Item, Index) {
                    var localObj = {
                        Id: Item.UserId
                    }
                    $scope.EmployeeNameList.push(localObj);
                });
            })
        };
        //console.log()



        $scope.EmpArray = [];
        $scope.EmployeeMappingAddEdit = function () {

            //console.log($scope.EmployeeNameList);
            angular.forEach($scope.EmployeeNameList, function (value, index) {
                //value.URID = $scope.URId;
                $scope.EmpArray.push(value.Id);
            });

            var obj = {
                Id: $scope.Id,
                UserId: $scope.EmpArray,
                ApplicationRoleId: $scope.Id
            };
            //console.log(obj);

            $http.post(baseUrl + '/getAddEmployeeMapping', obj).then(function success(response) {
                //console.log(response.data);
                $scope.flag = 'Emp';
                // close the popup and move to List page only after updating all employee mapping list
                // if ($scope.EmployeeNameList.length - 1 == index) {
                $scope.EmployeeMappingListGo();
                $scope.CancelsPopup();
                // }
            });
        };



        /*THIS IS FOR CANCEL POPUP FUNCITON */
        $scope.CancelsPopup = function () {
            $scope.flag = "";
            angular.element('#EmployeeMapView').modal('hide');
            $scope.ClearsPopup();
        }

        /*THIS IS FOR POPUP FUNCITON */
        $scope.ClearsPopup = function () {

            $scope.UserRollName = "";
            $scope.EmpArray = [];
            $scope.DepartmentName = '';
            // $scope.EmployeeList = [];
        }



    }
]);

OEMSController.controller("QuestionPaperUploadController", ['$scope', '$http', '$state', '$stateParams', '$filter', '$window', '$location', 'filterFilter', '$rootScope', '$timeout',
    function ($scope, $http, $state, $stateParams, $filter, $window, $location, $ff, $rootScope, $timeout) {
        if(loginFrom==0)
        {
             window.location.href = baseUrl + "/";        
        }
        $scope.InstitutionId = $window.localStorage['Institution_Id'];
        $scope.AcademicYearId = 2;
        $scope.QRCodeList = [];
        $scope.Uploaddata = 0;
        $scope.pictureList = [];
        $scope.QRCode = "";

        $scope.ClearImage = function () {
            $('#UploadPhoto').val('');
            $scope.pictureList = [];
            $scope.QRCode = "";
            $scope.Uploaddata = 0;
        }
        
        $scope.ClearPhotoList = function () {
            $('#DocumentID').val('');
            $scope.File_Name = "";
            $scope.pictureList = [];
            $scope.Uploaddata = 0;
        }
        
        
        $scope.uploadvalidation = function (dataURI) {
            if ($('#DocumentID')[0].files[0] == undefined) {

                alert("Select Question Paper to Upload ");
                }

                else if ($('#DocumentID')[0].files[0] != undefined) {
                    $scope.QP_Fileupload();
                }
        }

        $scope.dataURItoBlob = function (dataURI) {
            var binary = atob(dataURI.split(',')[1]);
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            var array = [];
            for (var i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
            }
            return new Blob([new Uint8Array(array)], {
                type: mimeString
            });
        }
        $scope.StudentdocChange = function () {
            if ($('#DocumentID')[0].files[0] != undefined) {
                $scope.File_Name = $('#DocumentID')[0].files[0]['name'];
            }
        }
        // $scope.uploadImage = function (Photo) {
        //     var filename = "";
        //     if ($('#UploadPhoto1')[0].files[0] != undefined) {
        //         File_Name = $('#UploadPhoto1')[0].files[0]['name'];
        //     }
        // }

        $scope.QP_Fileupload= function () 
        {
            //alert('Qp');
            $scope.File_Name = "";
                 
              
                    var fd = new FormData();
                    var imgBlob;
                    var itemIndexfile = -1;
                    var fd = new FormData();
                          
                        if ($('#DocumentID')[0].files[0] != undefined) {
                           
                            $scope.File_Name = $('#DocumentID')[0].files[0]['name'];
                            imgBlobfile = $scope.dataURItoBlob($scope.QuestionPaperDoc);
                          
                            itemIndexfile = 0;
                        }
                       
                       
                            if (itemIndexfile != -1) {
                                        fd.append('file', imgBlobfile);
                                    }
                      
                        $http.post(baseUrl + 'UploadQuestionPaper_Document',
                        fd,
                        {
                            transformRequest: angular.identity,
                            headers: {
                                'Content-Type': undefined
                            }                   
                        }).then(function success(response) {
                         
                            if (response.data.success == true) {
                                var obj = {	
                                    Id: response.data.data[0].p_Id,	
                                    File_Name  : $scope.File_Name,	
                                    } ;	
                               $http.post(baseUrl + '/Update_filename', obj).then(function success(response) {	
                                   alert("Question paper uploaded successfully");	
                                   $scope.ClearPhotoList();	
                               });	
                            
                           }
                            // else{
                            //     alert("Select Question Paper to Upload ");
                            // }
                               
                     })
                   
        }
    }
]);
OEMSController.controller("ExaminationMarksSubmitController", ['$scope', '$http', '$state', '$stateParams', '$filter', '$window', '$location', 'filterFilter', '$rootScope', '$timeout',
    function ($scope, $http, $state, $stateParams, $filter, $window, $location, $ff, $rootScope, $timeout) {
        if(loginFrom==0)
        {
             window.location.href = baseUrl + "/";        
        }
        $scope.InstitutionId = $window.localStorage['Institution_Id'];
        $scope.AcademicYearId = "0";
        $scope.CourseId = "0";
        $scope.ExamNameId = "0";
        var InstObj = {
            InstitutionId: $scope.InstitutionId
        }

        $scope.AcademicYearList = [];
        $http.post(baseUrl + '/getAcademicYearList', InstObj).then(function success(response) {
            $scope.AcademicYearList = response.data;
            $scope.AcyYear = $ff(response.data, {
                academicflag: 1
            });
            $scope.AcademicYearId = $scope.AcyYear[0].id.toString();
            $scope.AcademicYearBasedCourseFunction();
        });
        $scope.AcademicYearBasedCourseFunction = function () {
            var obj = {
                AcademicYearId: $scope.AcademicYearId,
                InstitutionId: $scope.InstitutionId
            }
            $http.post(baseUrl + '/getAcademicYearBasedCourse', obj).then(function success(response) {
                $scope.Courselist = response.data;
            });
        }
        $scope.MediumList = [];
        $http.post(baseUrl + '/getmediumlist', InstObj).then(function success(response) {
            $scope.Mediumlist = response.data;
        });

        $scope.SectionList = [];
        $http.post(baseUrl + '/getSectionList', InstObj).then(function success(response) {
            $scope.SectionList = response.data;
        });

        $scope.CourseBasedSectionList = [];
        $scope.CourseBasedSectionFunction = function () {
            var obj = {
                AcademicYearId: $scope.AcademicYearId,
                CourseId: $scope.CourseId
            };
            $http.post(baseUrl + '/getCourseBasedSectionList', obj).then(function success(response) {
                $scope.CourseBasedSectionList = response.data;
            });
        }

        $scope.CourseClearFunction = function () {
            $scope.CourseId = '';
            $scope.HallTicketList = [];
        };
        $scope.CourseBasedExamNameFunction = function () {
            var obj = {
                AcademicYearId: $scope.AcademicYearId,
                CourseId: $scope.CourseId
            }
            $http.post(baseUrl + '/getCourseBasedExamList', obj).then(function success(response) {
                $scope.ExamNameList = response.data;
                if($scope.ExamNameList.length == 1){
                    $scope.ExamNameId = response.data[0].examnameid.toString();
                    //$scope.ExamBasedSubject();
                }
            });
        };
        $scope.ExamNameClearFunction = function () {
            $scope.ExamNameId = "0";
            $scope.SectionId = "0";
            $scope.flag = 0;
            $scope.HallTicketList = [];
        };

        $scope.ListExam_MarkEntry_Submit = function()
        {
            var obj = {
                AcademicYearId: $scope.AcademicYearId,
                CourseId: $scope.CourseId,
                ExamNameId: $scope.ExamNameId,
                SubjectNameId: $scope.SubjectNameId,
                InstitutionId: $scope.InstitutionId
            
            };
            $http.post(baseUrl + '/ListExamWiseMarkEntry_Submit', obj).then(function success(response1) {
                $scope.ExamWiseMarkEntry_Submit = [];
                $scope.ExamWiseMarkEntry_Submit = response1.data;
                if ($scope.ExamWiseMarkEntry_Submit.length > 0) {
                    $scope.flag = 1;
                } else {
                    $scope.flag = 0;
                }
            });            
        }
        $scope.Exam_MarkEntry_statusUpdate = function (row) {
            var data = {
                Id: row.id
            }
            $http.post(baseUrl + '/Update_ExamWiseMarkEntry_Status', data).then(function success(response) {
                if (response.data.length > 0) {
                    alert("Submitted Successfully");
                    $scope.ListExam_MarkEntry_Submit( );
                } else {
                    alert("Not Submitted ");
                    $scope.ListExam_MarkEntry_Submit();
                }
            })
        }
        
    }
]);

OEMSController.controller("ExaminationMarksReportController", ['$scope', '$http', '$state', '$filter', '$stateParams', '$window', 'CommonLabelNames', 'CommonHeadingNames', 'CommonButtonNames', 'filterFilter',
    function ($scope, $http, $state, $filter, $stateParams, $window, $CommonLabelNames, $CommonHeadingNames, $CommonButtonNames, $ff) {
        if(loginFrom==0)
        {
             window.location.href = baseUrl + "/";        
        }
        $scope.InstitutionId = $window.localStorage['Institution_Id'];
        var InstObj = {
            InstitutionId: $scope.InstitutionId
        }
        $scope.Id = 0;
        
        $scope.Id = 0;
        $scope.MediumId = '';
        $scope.CourseId = "0";
        $scope.SectionId = "0";
        $scope.ExamNameId = "0";
        $scope.CenterId = "0";
        $scope.FilterInstitutionId = "0";
        $scope.SubjectNameId = "0";
        $scope.flag = 0;
        $scope.StudentMasterList = [];

        /* This is function for Pagination */
        $scope.listdata = [];
        $scope.current_page = 1;
        $scope.page_size = 50;

        $scope.rembemberCurrentPage = function (p) {
            $scope.current_page = p
        }

        $scope.flag = 0;
        $scope.examlistsearch = function () {
            //if ($scope.Validationcontrols() == true) 
            {
                $("#chatLoaderPV").show();
                var obj = {
                    AcademicYearId: $scope.AcademicYearId,
                    MediumId: $scope.MediumId,
                    CourseId: $scope.CourseId,
                    SectionId: $scope.SectionId,
                    ExamNameId: $scope.ExamNameId,
                    SubjectNameId: $scope.SubjectNameId,
                    PaperPatternId: $scope.PaperPatternId,
                    ExamCenterId: $scope.CenterId,
                    InstitutionId: $scope.FilterInstitutionId
                };

                $http.post(baseUrl + '/getlistattendanceReport', obj).then(function success(response) {
                    $scope.emptydata = [];
                    $scope.StudentList = [];
                    $scope.StudentList = response.data;
                    angular.forEach($scope.StudentList, function (value, studentindex) {
                        if (value.attendance == 0) {
                            // alert('ashgd');
                            value.marksobtained = 'A'
                        }

                    });

                    if ($scope.SubjectNameId == 0) {
                        var objStud = {
                            AcademicYearId: $scope.AcademicYearId,
                            MediumId: $scope.MediumId,
                            CourseId: $scope.CourseId,
                            SectionId: $scope.SectionId,
                            ExamNameId: $scope.ExamNameId,
                            ExamCenterId: $scope.CenterId,
                            InstitutionId: $scope.FilterInstitutionId
                        };
                        $http.post(baseUrl + '/getExam_StudentList', objStud).then(function success(response1) {
                        
                            $scope.StudentMasterList = [];
                            $scope.StudentMasterList = response1.data;

                        });
                    } else {

                        $scope.StudentMasterList = $ff($scope.StudentList, {
                            subjectparentid: 0
                        });
                    }

                    if ($scope.StudentList.length > 0) {
                        $scope.flag = 1;
                    } else {
                        $scope.flag = 0;
                    }
                    $("#chatLoaderPV").hide();
                });

            }
            
        };

        $scope.getFilterHeaders = function (filterList, filterValue) {
            return $filter('filter')(filterList, function (obj) {
                if (obj.id == filterValue)
                    return obj;
            })[0];
        };


        $scope.AcademicYearList = [];
        $http.post(baseUrl + '/getAcademicYearList', InstObj).then(function success(response) {
            $scope.AcademicYearList = response.data;
            $scope.AcyYear = $ff(response.data, {
                academicflag: 1
            });
            $scope.AcademicYearId = $scope.AcyYear[0].id.toString();
            $scope.AcademicYearBasedCourseFunction();
        });
        $scope.AcademicYearBasedCourseFunction = function () {
            var obj = {
                AcademicYearId: $scope.AcademicYearId,
                InstitutionId: $scope.InstitutionId
            }
            $http.post(baseUrl + '/getAcademicYearBasedCourse', obj).then(function success(response) {
                $scope.Courselist = response.data;
            });
        }
        $scope.MediumList = [];
        $http.post(baseUrl + '/getmediumlist', InstObj).then(function success(response) {
            $scope.Mediumlist = response.data;
        });

        $scope.SectionList = [];
        $http.post(baseUrl + '/getSectionList', InstObj).then(function success(response) {
            $scope.SectionList = response.data;
        });

        $scope.CourseBasedSectionList = [];
        $scope.CourseBasedSectionFunction = function () {
            var obj = {
                AcademicYearId: $scope.AcademicYearId,
                CourseId: $scope.CourseId
            };
            $http.post(baseUrl + '/getCourseBasedSectionList', obj).then(function success(response) {
                $scope.CourseBasedSectionList = response.data;
            });
        }

        $scope.CourseClearFunction = function () {
            $scope.CourseId = '';
            $scope.HallTicketList = [];
        };
        $scope.CourseBasedExamNameFunction = function () {
            var obj = {
                AcademicYearId: $scope.AcademicYearId,
                CourseId: $scope.CourseId
            }
            $http.post(baseUrl + '/getCourseBasedExamList', obj).then(function success(response) {
                $scope.ExamNameList = response.data;
                if($scope.ExamNameList.length == 1){
                    $scope.ExamNameId = response.data[0].examnameid.toString();
                    $scope.ExamBasedSubject();
                }
            });
        };
        $scope.ExamNameClearFunction = function () {
            $scope.ExamNameId = "0";
            $scope.SectionId = "0";
            $scope.flag = 0;
            $scope.HallTicketList = [];
        };

        $scope.List_SubjectList = [];
        $scope.ExamBasedSubject = function () {
       
            if($scope.listPage == 1)
            {
                $scope.PaperPatternId = 2;
            }
            if ($scope.listPage == 3)
            {
                $scope.PaperPatternId = 5;
            }
            var obj = {
                AcademicYearId: $scope.AcademicYearId,
                CourseId: $scope.CourseId,
                ExamNameId: $scope.ExamNameId,
                PaperPatternId: $scope.PaperPatternId,
            }
            $http.post(baseUrl + '/Exam_SubjectList', obj).then(function success(response) {
                $scope.List_SubjectList = response.data;
                $scope.SubjectList = response.data;
            });
        };
     $scope.List_SubjectList = [];
        $scope.SubjectClearfunction = function () {
            $scope.SubjectNameId = "0";
            $scope.StudentList = [];
            $scope.flag = 0;
            $scope.StudentMasterList = [];
        };
        $scope.CourseBasedSectionList = [];
        $scope.CourseBasedSectionFunction = function () {
            var obj = {
                AcademicYearId: $scope.AcademicYearId,
                CourseId: $scope.CourseId
            };

            $http.post(baseUrl + '/getCourseBasedSectionList', obj).then(function success(response) {
                $scope.CourseBasedSectionList = response.data;
            });
        }
        var insobj = {
            InstitutionId: $scope.InstitutionId
        };
        var centerobj = {
            InstitutionId: $scope.FilterInstitutionId,
            CenterId: $scope.CenterId,
        
        };
        $http.post(baseUrl + '/getInstitution_Listcenter', centerobj).then(function success(response) {
          
            $scope.Institution_List = response.data;
        });
        $scope.InstitutionCenterBased = function () {
            var centerobj = {
                InstitutionId: $scope.FilterInstitutionId,
                CenterId: $scope.CenterId,
            
            };
            $http.post(baseUrl + '/getInstitution_Listcenter', centerobj).then(function success(response) {
              
                $scope.Institution_List = response.data;
            });
        }
        $scope.InstitutionClearfunction = function () {
            $scope.FilterInstitutionId = "0";      
            $scope.Institution_List = [];
        }; 

    }
]);
OEMSController.controller("AttendanceDetailsReportController", ['$scope', '$http', '$state', '$filter', '$stateParams', '$window', 'CommonLabelNames', 'CommonHeadingNames', 'CommonButtonNames', 'filterFilter',
    function ($scope, $http, $state, $filter, $stateParams, $window, $CommonLabelNames, $CommonHeadingNames, $CommonButtonNames, $ff) {
        if(loginFrom==0)
        {
             window.location.href = baseUrl + "/";        
        }
        $scope.InstitutionId = $window.localStorage['Institution_Id'];
        var InstObj = {
            InstitutionId: $scope.InstitutionId
        }
        $scope.Id = 0;
        
        $scope.Id = 0;
        $scope.MediumId = '';
        $scope.CourseId = "0";
        $scope.SectionId = "0";
        $scope.ExamNameId = "0";
        $scope.CenterId = "0";
        $scope.FilterInstitutionId = "0";
        $scope.SubjectNameId = "0";
        $scope.flag = 0;
        $scope.StudentMasterList = [];

        /* This is function for Pagination */
        $scope.listdata = [];
        $scope.current_page = 1;
        $scope.page_size = 50;

        $scope.rembemberCurrentPage = function (p) {
            $scope.current_page = p
        }

        $scope.flag = 0;
        $scope.examlistsearch = function () {
            //if ($scope.Validationcontrols() == true) 
            {
                $("#chatLoaderPV").show();
                var obj = {
                    AcademicYearId: $scope.AcademicYearId,                  
                    CourseId: $scope.CourseId,                  
                    ExamNameId: $scope.ExamNameId,                  
                    ExamCenterId: $scope.CenterId,
                    InstitutionId: $scope.FilterInstitutionId
                };
            

                $http.post(baseUrl + '/getExam_centerlist_Attendance', obj).then(function success(response) {
                    $scope.emptydata = [];
                    $scope.CenterList = [];
                    $scope.CenterList = response.data;
                    angular.forEach($scope.CenterList, function (value, studentindex) {
                        if (value.attendance == 0) {
                            // alert('ashgd');
                            value.marksobtained = 'A'
                        }

                    });

                    if ($scope.SubjectNameId == 0) {
                        var objStud = {
                            AcademicYearId: $scope.AcademicYearId,                       
                            CourseId: $scope.CourseId,                          
                            ExamNameId: $scope.ExamNameId,
                            ExamCenterId: $scope.CenterId,
                            InstitutionId: $scope.FilterInstitutionId
                        };
                        $http.post(baseUrl + '/getExam_StudentList_Attendance', objStud).then(function success(response1) {
                        
                            $scope.attendancelist = [];
                            $scope.attendancelist = response1.data;

                        });
                    } else {

                        $scope.attendancelist = $ff($scope.CenterList, {
                            subjectparentid: 0
                        });
                    }

                    if ($scope.CenterList.length > 0) {
                        $scope.flag = 1;
                    } else {
                        $scope.flag = 0;
                    }
                    $("#chatLoaderPV").hide();
                });

            }
            
        };

        $scope.getFilterHeaders = function (filterList, filterValue) {
            return $filter('filter')(filterList, function (obj) {
                if (obj.id == filterValue)
                    return obj;
            })[0];
        };


        $scope.AcademicYearList = [];
        $http.post(baseUrl + '/getAcademicYearList', InstObj).then(function success(response) {
            $scope.AcademicYearList = response.data;
            $scope.AcyYear = $ff(response.data, {
                academicflag: 1
            });
            $scope.AcademicYearId = $scope.AcyYear[0].id.toString();
            $scope.AcademicYearBasedCourseFunction();
        });
        $scope.AcademicYearBasedCourseFunction = function () {
            var obj = {
                AcademicYearId: $scope.AcademicYearId,
                InstitutionId: $scope.InstitutionId
            }
            $http.post(baseUrl + '/getAcademicYearBasedCourse', obj).then(function success(response) {
                $scope.Courselist = response.data;
            });
        }
        $scope.MediumList = [];
        $http.post(baseUrl + '/getmediumlist', InstObj).then(function success(response) {
            $scope.Mediumlist = response.data;
        });

        $scope.SectionList = [];
        $http.post(baseUrl + '/getSectionList', InstObj).then(function success(response) {
            $scope.SectionList = response.data;
        });

        $scope.CourseBasedSectionList = [];
        $scope.CourseBasedSectionFunction = function () {
            var obj = {
                AcademicYearId: $scope.AcademicYearId,
                CourseId: $scope.CourseId
            };
            $http.post(baseUrl + '/getCourseBasedSectionList', obj).then(function success(response) {
                $scope.CourseBasedSectionList = response.data;
            });
        }

        $scope.CourseClearFunction = function () {
            $scope.CourseId = '';
            $scope.HallTicketList = [];
        };
        $scope.CourseBasedExamNameFunction = function () {
            var obj = {
                AcademicYearId: $scope.AcademicYearId,
                CourseId: $scope.CourseId
            }
            $http.post(baseUrl + '/getCourseBasedExamList', obj).then(function success(response) {
                $scope.ExamNameList = response.data;
                if($scope.ExamNameList.length == 1){
                    $scope.ExamNameId = response.data[0].examnameid.toString();
                    $scope.ExamBasedSubject();
                }
            });
        };
        $scope.ExamNameClearFunction = function () {
            $scope.ExamNameId = "0";
            $scope.SectionId = "0";
            $scope.flag = 0;
            $scope.HallTicketList = [];
        };

        $scope.List_SubjectList = [];
        $scope.ExamBasedSubject = function () {
       
          
            var obj = {
                AcademicYearId: $scope.AcademicYearId,
                CourseId: $scope.CourseId,
                ExamNameId: $scope.ExamNameId,
                PaperPatternId: $scope.PaperPatternId,
            }
            $http.post(baseUrl + '/getExam_SubjectList_Attendance', obj).then(function success(response) {
                $scope.List_SubjectList = response.data;
                $scope.SubjectList = response.data;
            });
        };
     $scope.List_SubjectList = [];
        $scope.SubjectClearfunction = function () {
            $scope.SubjectNameId = "0";
            $scope.StudentList = [];
            $scope.flag = 0;
            $scope.StudentMasterList = [];
        };
        $scope.CourseBasedSectionList = [];
        $scope.CourseBasedSectionFunction = function () {
            var obj = {
                AcademicYearId: $scope.AcademicYearId,
                CourseId: $scope.CourseId
            };

            $http.post(baseUrl + '/getCourseBasedSectionList', obj).then(function success(response) {
                $scope.CourseBasedSectionList = response.data;
            });
        }
        var insobj = {
            InstitutionId: $scope.InstitutionId
        };

        var centerobj = {
            InstitutionId: $scope.FilterInstitutionId,
            CenterId: $scope.CenterId,
        
        };

        $scope.InstitutionClearfunction = function () {
            $scope.FilterInstitutionId = "0";      
            $scope.Institution_List = [];
        }; 
    }
]);

   OEMSController.controller("EvaluationMarkDetailReportController", ['$scope', '$http', '$state', '$filter', '$stateParams', '$window', 'CommonLabelNames', 'CommonHeadingNames', 'CommonButtonNames', 'filterFilter',
    function ($scope, $http, $state, $filter, $stateParams, $window, $CommonLabelNames, $CommonHeadingNames, $CommonButtonNames, $ff) {
          
    if(loginFrom==0)
    {
         window.location.href = baseUrl + "/";        
    }
    $scope.InstitutionId = $window.localStorage['Institution_Id'];
    var InstObj = {
        InstitutionId: $scope.InstitutionId
    }
    $scope.Id = 0;
    $scope.FilterStudentId = "0";
    $scope.Id = 0;
    $scope.MediumId = '';
    $scope.CourseId = "0";
    $scope.SectionId = "0";
    $scope.ExamNameId = "0";
    $scope.CenterId = "0";
    $scope.FilterInstitutionId = "0";
    $scope.SubjectNameId = "0";
    $scope.flag = 0;
    $scope.StudentMasterList = [];

    /* This is function for Pagination */
    $scope.listdata = [];
    $scope.current_page = 1;
    $scope.page_size = 50;

    $scope.rembemberCurrentPage = function (p) {
        $scope.current_page = p
    }

    $scope.flag = 0;
    $scope.rowcollection = [];
    $scope.markdetaillist = function () {
       
        $scope.emptydata = [];
        $scope.rowcollection = [];
        var obj = {
            AcademicYearId: $scope.AcademicYearId,
            CourseId: $scope.CourseId,           
            ExamNameId: $scope.ExamNameId,
            StudentId: $scope.FilterStudentId,
            ExamCenterId: $scope.CenterId,
            InstitutionId: $scope.FilterInstitutionId
        };
        $scope.filteredPaperPatternSearch(obj);
       
    }
    $scope.List_Validationcontrols = function () {

        if (typeof ($scope.AcademicYearId) == "undefined" || $scope.AcademicYearId == "0") {
            alert("Please select Academic Year");
            return false;
        }

        return true;
    };
    $scope.filteredPaperPatternSearch = function (obj) {
        if ($scope.List_Validationcontrols() == true) {
            $("#chatLoaderPV").show();
            $http.post(baseUrl + '/getevaluationliststudent', obj).then(function success(response) {

                $http.post(baseUrl + '/getevaluationliststudent_child', obj).then(function success(response1) {
                    $scope.emptydata = [];
                    $scope.rowcollection = [];
                    $scope.rowcollection = response.data;

                    $scope.evaluationchildlist1 = [];
                    $scope.evaluationchildlist1 = response1.data;

                   

                    if ($scope.rowcollection.length > 0) {
                        $scope.flag = 1;
                    } else {
                        $scope.flag = 0;
                    }


                    $scope.fileName = "Paper Pattern";
                    $scope.exportData = [];
                    $scope.childData = [];
                    // $scope.Export_AcademicYear = $filter('filter')($scope.CommontransactionList, {
                    //     Name: "AcademicYear"
                    // })[0].Value;

                    // $scope.SerialNumber = $filter('filter')($scope.CommontransactionList, {
                    //     Name: "SerialNumber"
                    // })[0].Value;
                    // $scope.Export_Course = $filter('filter')($scope.CommontransactionList, {
                    //     Name: "Course"
                    // })[0].Value;

                    // $scope.Export_Medium = $filter('filter')($scope.CommontransactionList, {
                    //     Name: "Medium"
                    // })[0].Value;

                    // $scope.Export_ExamName = $filter('filter')($scope.CommontransactionList, {
                    //     Name: "ExamName"
                    // })[0].Value;

                    // $scope.Export_SubjectName = $filter('filter')($scope.CommontransactionList, {
                    //     Name: "SubjectName"
                    // })[0].Value;

                    // $scope.Export_QuestionperSection = $filter('filter')($scope.CommontransactionList, {
                    //     Name: "QuestionPaperSection"
                    // })[0].Value;

                    // $scope.Export_NoOfQuestions = $filter('filter')($scope.CommontransactionList, {
                    //     Name: "NoofQuestions"
                    // })[0].Value;


                    // $scope.Export_Answers = $filter('filter')($scope.CommontransactionList, {
                    //     Name: "Answers"
                    // })[0].Value;


                    // $scope.Export_Marks = $filter('filter')($scope.CommontransactionList, {
                    //     Name: "Marks"
                    // })[0].Value;

                    // $scope.Export_Status = $filter('filter')($scope.CommontransactionList, {
                    //     Name: "Status"
                    // })[0].Value;




                    // $scope.headerData = [{
                    //         title: $scope.SerialNumber,
                    //         dataKey: "Id",
                    //         datamode: "Single"
                    //     },
                    //     {
                    //         title: $scope.Export_Course,
                    //         dataKey: "Course",
                    //         datamode: "Single"
                    //     },
                    //     {
                    //         title: $scope.Export_Medium,
                    //         dataKey: "MediumName",
                    //         datamode: "Single"
                    //     },

                    //     {
                    //         title: $scope.Export_ExamName,
                    //         dataKey: "ExamName",
                    //         datamode: "Single"
                    //     },
                    //     {
                    //         title: $scope.Export_SubjectName,
                    //         dataKey: "SubjectName",
                    //         datamode: "Single"
                    //     },

                    //     {
                    //         title: $scope.Export_QuestionperSection,
                    //         dataKey: "Id,PaperPatterenId",
                    //         datamode: "Multiple"
                    //     },
                    //     {
                    //         title: $scope.Export_QuestionperSection,
                    //         dataKey: "QuestionPaperSection",
                    //         datamode: "Multiple"
                    //     },
                    //     {
                    //         title: $scope.Export_NoOfQuestions,
                    //         dataKey: "NumberofQuestions",
                    //         datamode: "Multiple"
                    //     },


                    //     {
                    //         title: $scope.Export_Answers,
                    //         dataKey: "Answers",
                    //         datamode: "Multiple"
                    //     },


                    //     {
                    //         title: $scope.Export_Marks,
                    //         dataKey: "Marks",
                    //         datamode: "Multiple"
                    //     },
                    // ];


                    // $scope.filterdata = [

                    //     {
                    //         title: $scope.Export_AcademicYear,
                    //         dataKey: ($scope.getFilterHeaders($scope.AcademicYearList, $scope.AcademicYearId)).AcademicYear
                    //     },

                    //     {
                    //         title: $scope.Export_Course,
                    //         dataKey: ($scope.getFilterHeaders($scope.Filter_Courselist, $scope.CourseId)) == undefined ? "" : ($scope.getFilterHeaders($scope.Filter_Courselist, $scope.CourseId)).Course
                    //     },

                    //     {
                    //         title: $scope.Export_ExamName,
                    //         dataKey: ($scope.getFilterHeaders($scope.Filter_ExamNameList, $scope.ExamNameId)) == undefined ? "" : ($scope.getFilterHeaders($scope.Filter_ExamNameList, $scope.ExamNameId)).ExamName
                    //     },
                    //     {
                    //         title: $scope.Export_SubjectName,
                    //         dataKey: ($scope.getFilterHeaders($scope.Filter_SubjectList, $scope.SubjectId)) == undefined ? "" : ($scope.getFilterHeaders($scope.Filter_SubjectList, $scope.SubjectId)).SubjectName
                    //     },
                    //     {
                    //         title: $scope.Export_Status,
                    //         dataKey: $scope.IsActive == 1 ? "Active" : $scope.IsActive == 0 ? "InActive" : "All"

                    //     }

                    // ];


                    // $scope.UserId = 2;
                    // $scope.exportData = $scope.rowcollection;
                    // $scope.childData = $scope.PaperPatternchildlist;

                    // $scope.HeaderTitle = $scope.fileName;
                    // $scope.schoolname = $scope.SchoolNameList[0].SchoolName;
                    // $scope.address = $scope.SchoolNameList[0].Address;
                    $scope.loginuserId = $scope.UserId;

                    $("#chatLoaderPV").hide();
                })
            })
        }
    }
    $scope.getFilterHeaders = function (filterList, filterValue) {
        return $filter('filter')(filterList, function (obj) {
            if (obj.Id == filterValue)
                return obj;
        })[0];
    };


    $scope.AcademicYearList = [];
    $http.post(baseUrl + '/getAcademicYearList', InstObj).then(function success(response) {
        $scope.AcademicYearList = response.data;
        $scope.AcyYear = $ff(response.data, {
            academicflag: 1
        });
        $scope.AcademicYearId = $scope.AcyYear[0].id.toString();
        $scope.AcademicYearBasedCourseFunction();
    });
    $scope.AcademicYearBasedCourseFunction = function () {
        var obj = {
            AcademicYearId: $scope.AcademicYearId,
            InstitutionId: $scope.InstitutionId
        }
        $http.post(baseUrl + '/getAcademicYearBasedCourse', obj).then(function success(response) {
            $scope.Courselist = response.data;
        });
    }
    $scope.MediumList = [];
    $http.post(baseUrl + '/getmediumlist', InstObj).then(function success(response) {
        $scope.Mediumlist = response.data;
    });

    $scope.SectionList = [];
    $http.post(baseUrl + '/getSectionList', InstObj).then(function success(response) {
        $scope.SectionList = response.data;
    });

    $scope.CourseBasedSectionList = [];
    $scope.CourseBasedSectionFunction = function () {
        var obj = {
            AcademicYearId: $scope.AcademicYearId,
            CourseId: $scope.CourseId
        };
        $http.post(baseUrl + '/getCourseBasedSectionList', obj).then(function success(response) {
            $scope.CourseBasedSectionList = response.data;
        });
    }

    $scope.CourseClearFunction = function () {
        $scope.CourseId = '';
        $scope.HallTicketList = [];
    };
    $scope.CourseBasedExamNameFunction = function () {
        var obj = {
            AcademicYearId: $scope.AcademicYearId,
            CourseId: $scope.CourseId
        }
        $http.post(baseUrl + '/getCourseBasedExamList', obj).then(function success(response) {
            $scope.ExamNameList = response.data;
            if($scope.ExamNameList.length == 1){
                $scope.ExamNameId = response.data[0].examnameid.toString();
                $scope.ExamBasedSubject();
            }
        });
    };
    $scope.ExamNameClearFunction = function () {
        $scope.ExamNameId = "0";
        $scope.SectionId = "0";
        $scope.flag = 0;
        $scope.HallTicketList = [];
    };
    

    $scope.InstitutionBasedStudentNameFunction = function () {
        var obj = {
            AcademicYearId: $scope.AcademicYearId,
            InstitutionId: $scope.FilterInstitutionId
        }
        $http.post(baseUrl + '/getstudentdd_List', obj).then(function success(response) {
            $scope.StudentNameList = response.data;
            
        });
    };
    $scope.List_SubjectList = [];
    $scope.StudentNameClearfunction = function () {
        $scope.FilterStudentId = "0";       
        $scope.flag = 0;
        $scope.StudentNameList = [];
    };   
    $scope.List_SubjectList = [];
    $scope.ExamBasedSubject = function () {
   
        if($scope.listPage == 1)
        {
            $scope.PaperPatternId = 2;
        }
        if ($scope.listPage == 3)
        {
            $scope.PaperPatternId = 5;
        }
        var obj = {
            AcademicYearId: $scope.AcademicYearId,
            CourseId: $scope.CourseId,
            ExamNameId: $scope.ExamNameId,
            PaperPatternId: $scope.PaperPatternId,
        }
        $http.post(baseUrl + '/Exam_SubjectList', obj).then(function success(response) {
            $scope.List_SubjectList = response.data;
            $scope.SubjectList = response.data;
        });
    };
 $scope.List_SubjectList = [];
    $scope.SubjectClearfunction = function () {
        $scope.SubjectNameId = "0";
        $scope.StudentList = [];
        $scope.flag = 0;
        $scope.StudentMasterList = [];
    };   
  
    $http.post(baseUrl + '/getExamCentre_List', InstObj).then(function success(response) {
        $scope.ExamCentre_List = response.data;
    });
    var centerobj = {
        InstitutionId: $scope.FilterInstitutionId,
        CenterId: $scope.CenterId,
    
    };
    $http.post(baseUrl + '/getInstitution_List', centerobj).then(function success(response) {
        $scope.Institution_List = response.data;
    });
    $scope.InstitutionClearfunction = function () {
        $scope.FilterInstitutionId = "0";      
        $scope.Institution_List = [];
    };  
    $scope.InstitutionCenterBased = function () {
        var centerobj = {
            InstitutionId: $scope.FilterInstitutionId,
            CenterId: $scope.CenterId,
        
        };
        $http.post(baseUrl + '/getInstitution_Listcenter', centerobj).then(function success(response) {
          
            $scope.Institution_List = response.data;
        });
    }

}
]);
