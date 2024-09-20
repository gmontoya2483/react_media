import {useFetchAlbumsQuery, useAddAlbumMutation} from "../store";
import Skeleton from "./Skeleton";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";
import AlbumsListItem from "./AlbumsListItem";

function AlbumsList({user}) {

    const {data, error, isFetching, ...rest} = useFetchAlbumsQuery(user);

    const [addAlbum, results] = useAddAlbumMutation();
    // console.log(results);
    // const result =  useFetchAlbumsQuery(user);
    // console.log(result);
    // console.log(data,error, isLoading);

    const handleAddAlbum = () => {
        addAlbum(user);
    }

    let content;
    if (isFetching) {
        content = <Skeleton className="h-10 w-full" times={3}/>
    } else if (error) {
        content = <div>Error loading albums.</div>
    } else {
        content = data.map(
            (album) => <AlbumsListItem key={album.id} album={album}/>
        )
    }

    return (
        <div>
            <div className="flex items-center justify-between m-2">
                <h3 className='text-lg font-bold'>Albums for {user.name}</h3>
                <Button onClick={handleAddAlbum} loading={results.isLoading}>
                    + Add Album
                </Button>
            </div>
            <div>
                {content}
            </div>
        </div>
    );

}

export default AlbumsList
