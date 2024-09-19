
import {GoTrashcan} from "react-icons/go";
import {useThunk} from "../hooks/use-thunk";
import {removeUser} from "../store";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import {Fragment} from "react";
import AlbumsList from "./AlbumsList";

function UserListItem ({user}) {


    const [doRemoveUser, isLoading, error] = useThunk(removeUser);

    const handleRemoveUser = () => {
        doRemoveUser(user);
    }

    const header = (
        <Fragment>
            <Button className='mr-3' loading={isLoading} onClick={handleRemoveUser}>
                <GoTrashcan />
            </Button>
            {error && <div>Error deleting user...</div>}
            {user.name}
        </Fragment>

    );



    return (
        <ExpandablePanel header={header}>
            <AlbumsList user={user}/>
        </ExpandablePanel>
    );
}

export default UserListItem;
