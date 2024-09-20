import {GoTrashcan} from "react-icons/go";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";
import {useRemoveAlbumMutation} from "../store";
import PhotosList from "./PhotosList";

function AlbumsListItem({album}) {

    const [removeAlbum, results] = useRemoveAlbumMutation();

    const handleRemoveAlbum = () => {
        removeAlbum(album);
    }

    const header = (
        <div className="flex justify-between items-center gap-2">
            <Button onClick={handleRemoveAlbum} loading={results.isLoading}>
                <GoTrashcan />
            </Button>
            {album.title}
        </div>
    );

    return (

            <ExpandablePanel key={album.id} header={header}>
                <PhotosList album={album}/>
            </ExpandablePanel>

    );


}

export default AlbumsListItem;
