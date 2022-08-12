@extends('layouts.master') @section('content')
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <p class="page-title">System Role Mapping</p>
        </div>
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-body">
                    <form class="form-horizontal" role="form">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%" class="formControlGroup">
                            <tr>
                                <td width="15%">
                                    <label>User Roll Name</label>
                                </td>
                                <td width="20%">
                                    <input type="text" class="form-control" name="LastName" />
                                </td>
                                <td width="65%">
                                    <button type="button" class="btn btn-small">Go</button>
                                </td>
                            </tr>
                        </table>
                    </form>
                </div>
            </div>
            <button type="button" class="btn btn-autosize pull-right mb-15" data-toggle="modal" data-target="#EnquiryCreateModal">Add New</button>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <table style="width: 100%" class="table table-striped table-bordered">
                <thead>
                    <tr style="text-align: center">
                        <th st-ratio="8">Sl No.</th>
                        <th st-ratio="85">User Roll Name</th>
                        <th st-ratio="7">Action</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($UserRoles as $UserRole)
                    <tr>
                        <td style="text-align: right">{{ ++$i }}</td>
                        <td style="text-align: left">{{ $UserRole->UserRollName }}</td>
                        <td style="text-align: center">{{$UserRole->Id}}
                            <!-- <a class="btn btn-save" data-toggle="modal" data-target="#EditModel" data-id="$UserRole->Id">Map</a> 
                            
                            <button data-toggle="modal" data-target="#EditModel"  href="{{ route('RoleMapping.show',$UserRole->Id) }}" class="btn btn-default editbtn-modal" value="{{ $UserRole->Id }}" type="button" name="editbtn">View</button> -->
                            <a class="btn btn-save" data-toggle="modal" data-target="#ViewModel" data-backdrop="static" href="{{ route('RoleMapping.edit',$UserRole->Id) }}">View</a>
                            <a class="btn btn-save" href="{{ route('RoleMapping.edit',$UserRole->Id) }}">Map</a>
                            {!! Form::open(['method' => 'DELETE','route' => ['RoleMapping.destroy', $UserRole->Id],'style'=>'display:inline']) !!}
                            {!! Form::submit('Delete', ['class' => 'btn btn-save']) !!}
                            {!! Form::close() !!}
                            
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
            {!! $UserRoles ->render() !!}
        </div>
    </div>

    <div id="EnquiryCreateModal" class="modal fade" role="dialog">
        <div class="modal-dialog" style="width: 60%">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">System Role Mapping</h4>
                </div>
                <div class="modal-body">
                    {!! Form::open(array('action' => 'SystemRMController@store', 'method' => 'POST', 'class' => 'form-horizontal')) !!} {{ csrf_field() }}
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" class="formControlGroup">
                        <tr>
                            <td width="20%">
                                <label>User Roll Name</label>
                            </td>
                            <td width="80%">
                                {!! Form::text('UserRollName', null, array('placeholder' => 'UserRollName','class' => 'form-control')) !!}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>System Roles</label>
                            </td>
                            <td>
                                <select id="SystemRoleId" name="SystemRoleId[]" multiple class="form-control">
                                     @foreach($SystemRoles as $option)
                                        <option value="{{ $option->Id }}">{{ $option->SystemRollName}}</option>
                                     @endforeach
                                </select>                                
                            </td>
                        </tr>
                    </table>

                    <div class="modal-footer" style="text-align: center;">
                        <td> <button type="submit" class="btn btn-save">Save</button>
                            <button type="button" class="btn btn-save" data-dismiss="modal">Cancel</button>
                        </td>
                    </div>
                    {!! Form::close() !!}
                </div>
            </div>
        </div>
    </div>
    
 
<!-- View Model -->
<div id="ViewModel" class="modal fade" role="dialog">
</div> 
    

    
</div>
@endsection @section('script')
<script>
    var demo1 = $('select[name="SystemRoleId[]"]').bootstrapDualListbox();
</script>
@endsection
