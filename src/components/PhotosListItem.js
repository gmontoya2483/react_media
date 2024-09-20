import {GoTrashcan} from "react-icons/go";
import {useRemovePhotoMutation} from "../store";


function PhotosListItem({photo}) {


    const [removePhoto] = useRemovePhotoMutation()

    const handleRemovePhoto = () => {
        removePhoto(photo);
    }

    return (
        <div className="relative cursor-pointer" onClick={handleRemovePhoto}>
            <img className="h-40 w-40 object-cover" src={photo.url} alt={`Random pic #${photo.id}`}/>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-80 hover:bg-gray-50">
                <GoTrashcan className="text-6xl "/>
            </div>
        </div>
    );
}

export default PhotosListItem
