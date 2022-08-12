<div class="modal-dialog" style="width: 60%">
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">System Role Mapping</h4>
        </div>
        <div class="modal-body ">
            {!! Form::model($UserRole, ['method' => 'PATCH','class' => 'form-horizontal','route' => ['RoleMapping.update', $UserRole->Id]]) !!} {!! csrf_field() !!}


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
                        <select class="form-control" multiple="multiple" name="SystemRoleId[]" id="SystemRoleId">
                                    @foreach($SystemRoles as $SystemRole)
                                        <option value="{{$SystemRole->Id}}" @foreach($SystemRoleId as $p) @if($SystemRole->Id == $p->Id)selected="selected" @endif @endforeach >{{$SystemRole->SystemRollName}}</option>
                                    @endforeach
                        </select>
                    </td>
                </tr>
            </table>

            <div class="modal-footer" style="text-align: center;">
                <td> <button type="submit" class="btn btn-save">Save</button>
                    <a class="btn btn-save" href="{{route('RoleMapping.index') }}">Cancel</a>
                </td>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
</div>


<script>
    var demo1 = $('select[name="SystemRoleId[]"]').bootstrapDualListbox();

</script>
