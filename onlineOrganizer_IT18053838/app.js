
// var app = angular.module('app',['ngMaterial', 'ngMessages', 'material.svgAssetsCache']);
var MyApp=angular.module('MyApp', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache']);

    MyApp.controller('myhandler', ['$scope','$filter','$interval',function($scope,$filter,$interval) {
         $scope.eventList = [];
        $scope.sortedList=[];
         $scope.EventID=0;
        $scope.EditbtnClicked='false';
        $scope.eventbuttonName="Add Event +";
        $scope.i=0;
        $scope.firstremain;
        $scope.timmeclr;
        $scope.remainingtimeDifference;



        $scope.addEvent=function () {
             $scope.eventList.push(
                {   event:$scope.scdedule.eventname,
                    eventId:$scope.EventID++,
                     eventUTCDate:$scope.scdedule.startDate,
                     LocalDate:$filter('date')($scope.scdedule.startDate, 'MM/dd/yyyy'),
                     eventUTCTime:$scope.scdedule.eventtime,
                      LocaltimeIn24: $filter('date')($scope.scdedule.eventtime, 'HH:mm a'),
                    remainingtimeDifference:(($scope.scdedule.startDate.getTime())/1000)+($scope.scdedule.eventtime.getHours()*3600)+($scope.scdedule.eventtime.getMinutes()*60)
                 });
             $scope.EditbtnClicked='false';
             if($scope.EditbtnClicked=='false')
             {
                 $scope.eventbuttonName="Add Event +"
             }


            $scope.countdowntimer();


             $scope.scdedule.startDate=new Date();
             $scope.scdedule.eventtime=new Date(" ");
             $scope.scdedule.eventname="";


            window.scrollTo(0,document.body.scrollHeight);

         };

         $scope.removeEvent=function(oneevent){
             let removedevent=$scope.eventList.indexOf(oneevent);
             $scope.eventList.splice(removedevent,1);
             if( $scope.eventList.length>0){

                 $scope.countdowntimer();
             }


         }

        $scope.editEvent=function(eventId){

            const filteredevent= $scope.eventList.find(singleitem=>singleitem.eventId===eventId);

            $scope.scdedule.eventname=filteredevent.event;
            $scope.scdedule.startDate=filteredevent.eventUTCDate;
            $scope.scdedule.eventtime=filteredevent.eventUTCTime;
            $scope.removeEvent(filteredevent);
            $scope.EditbtnClicked='true';
            if($scope.EditbtnClicked=='true')
            {
                $scope.eventbuttonName="Edit Event";
            }

            window.scrollTo(0,document.querySelector(".fields").scrollHeight);

        }


        $scope.countdowntimer=function(){


            $scope.sortedList=[...$scope.eventList];
            $scope.sortedList.sort((a,b)=>a.remainingtimeDifference-b.remainingtimeDifference);
            $scope.nextremainitem=$scope.sortedList[0];









            while(true)
            {

                if($scope.i==0)
                {
                    $scope.firstremain=$scope.nextremainitem;

                    $scope.timmeclr=$interval(function(){

                        $scope.timeWithSeconds=new Date();
                        $scope.recentTimeWithoutSeconds=(($scope.timeWithSeconds.getTime())/1000);
                        $scope.timerForEvent=Math.ceil( $scope.firstremain.remainingtimeDifference-$scope.recentTimeWithoutSeconds);//Match ceil

                        if( $scope.timerForEvent<= 0){
                            $scope.removeEvent( $scope.firstremain);

                        }

                        $scope.days=Math.trunc($scope.timerForEvent/(3600*24));
                        $scope.hours=Math.trunc( ($scope.timerForEvent%(3600*24))/3600);
                        $scope.minutes= Math.trunc(  (($scope.timerForEvent%(3600*24))%3600)/60);
                        $scope.seconds=(($scope.timerForEvent%(3600*24))%3600)%60;

                    },1000);


                    $scope.i++;
                    break;
                }

                if($scope.firstremain.eventId!==$scope.nextremainitem.eventId && $scope.sortedList.length!==0)
                {

                    $interval.cancel($scope.timmeclr);
                    $scope.firstremain=$scope.nextremainitem;


                    $scope.timmeclr=$interval(function(){

                        $scope.timeWithSeconds=new Date();
                        $scope.recentTimeWithoutSeconds=(($scope.timeWithSeconds.getTime())/1000);
                        $scope.timerForEvent=Math.ceil( $scope.firstremain.remainingtimeDifference-$scope.recentTimeWithoutSeconds);//Match ceil

                        if( $scope.timerForEvent<= 0){
                            $scope.removeEvent( $scope.firstremain);

                        }


                        $scope.days=Math.trunc($scope.timerForEvent/(3600*24));
                        $scope.hours=Math.trunc( ($scope.timerForEvent%(3600*24))/3600);
                        $scope.minutes= Math.trunc(  (($scope.timerForEvent%(3600*24))%3600)/60);
                        $scope.seconds=(($scope.timerForEvent%(3600*24))%3600)%60;

                    },1000);




                    $scope.i++;
                    break;
                }
                if($scope.firstremain.eventId==$scope.nextremainitem.eventId){

                    $interval.cancel($scope.timmeclr);
                    $scope.firstremain=$scope.nextremainitem;


                    $scope.timmeclr=$interval(function(){

                        $scope.timeWithSeconds=new Date();
                        $scope.recentTimeWithoutSeconds=(($scope.timeWithSeconds.getTime())/1000);
                        $scope.timerForEvent=Math.ceil( $scope.firstremain.remainingtimeDifference-$scope.recentTimeWithoutSeconds);//Match ceil

                        if( $scope.timerForEvent<= 0){
                            $scope.removeEvent( $scope.firstremain);

                        }


                        $scope.days=Math.trunc($scope.timerForEvent/(3600*24));
                        $scope.hours=Math.trunc( ($scope.timerForEvent%(3600*24))/3600);
                        $scope.minutes= Math.trunc(  (($scope.timerForEvent%(3600*24))%3600)/60);
                        $scope.seconds=(($scope.timerForEvent%(3600*24))%3600)%60;

                    },1000);

                    $scope.i++;
                    break;
                }
                if($scope.sortedList.length==0 && $scope.i>0){
                    $interval.cancel($scope.timmeclr);

                }
                else{

                    break;
                }


            }



        }







}]);


/**
 Copyright 2018 Google LLC. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that can be found
 in the LICENSE file at http://material.angularjs.org/HEAD/license.
 **/