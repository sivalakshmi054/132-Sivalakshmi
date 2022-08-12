<div class="row">
        <div class="col-md-12">            
            <table  cellpadding="0" padding-bottom="25px;" cellspacing="10%" st-table="emptydata" style="width: 100%" st-safe-src="rowcollection" class="table table-striped table-bordered">
                <thead>
             
                <tr style="text-align: center">
                               
                                <th st-ratio="20" st-sort="totalquestion">
                                        Allocated Date</th>
                                <th st-ratio="15" st-sort="ab_qrcode">
                                        Ref. Code</th>                              
                                <th st-ratio="20" st-sort="totalquestion">
                                        Subject</th>
                                <th st-ratio="15" st-sort="totalquestion_attempted">
                                        No. of Question/Part Attempted</th>
                                <th st-ratio="15" st-sort="totalquestion_notattempted">
                                        No. of Question/Part Not Attempted</th>
                                <th st-ratio="20" st-sort="totalquestion">
                                        Allocated Date</th>
                                <th st-ratio="15" st-sort="partcount">
                                        Question Count</th>
                                <th st-ratio="10" st-sort="totalmarks">
                                        Total Marks </th>
                                <!-- <th st-ratio="20" st-sort="PaperType" ng-show="Tabvalue==2 || Tabvalue==3">
                                        Pass/Fail</th>         -->
                                <th st-ratio="25" >
                                        Status</th>
                            </tr>

                </thead>
                <tbody>                       
                @foreach ($data as $row)
                        <tr>
                                <td style="text-align: right">{{ $row['created_date'] }}</td>
                                <!-- <td style="text-align: left">{{QuestionBank.AcademicYear}}</td> -->
                                <td style="text-align: left">{{ $row["refcode"] }} </td>                               
                                <td style="text-align: left">{{$row["totalquestion_attempted"]}}</td>
                                <td style="text-align: left">{{$row["totalquestion_notattempted"]}}</td>
								<td style="text-align: left">{{$row["totalquestion"]}}</td>
                                <td style="text-align: left">{{$row["partcount"]}}</td>
                                <td style="text-align: left">{{$row["totalmarks"]}} </td>                                 
                                
                                
                                           
                        </tr>
                        @endforeach
                    </tbody>
              
               
            </table>
        </div>
    </div>