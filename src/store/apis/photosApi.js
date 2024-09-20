import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {faker} from "@faker-js/faker";


const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};


const photosApi = createApi({
    reducerPath: 'photos',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005',
        fetchFn: async (...args) => {
            // REMOVE FOR PRODUCTION, the complete
            await pause(1000);
            return fetch(...args);
        }
    }),
    endpoints(build) {
        return {
            fetchPhotos: build.query({
                providesTags: (result, error, album) => {
                    const tags = result.map((photo) => {
                        return {type: 'Photo', id: photo.id}
                    });

                    tags.push({
                        type: 'AlbumsPhotos',
                        id: album.id
                    });

                    return tags;

                },
                query: (album) => {
                    return {
                        url: '/photos',
                        params: {
                            albumId: album.id
                        },
                        method: 'GET'
                    }
                }

            }),
            addPhoto: build.mutation({
                invalidatesTags: (result,error, album) => {
                    return [{type: 'AlbumsPhotos', id: album.id}];
                },
                query:(album) => {
                    return {
                        url: '/photos',
                        body: {
                            url: faker.image.abstract(150,150, true),
                            albumId: album.id
                        },
                        method: 'POST'
                    }
                }
            }),
            removePhoto: build.mutation({
                invalidatesTags: (result, error, photo) => {
                    return [{type: 'Photo', id: photo.id }];
                },
                query: (photo) => {
                    return {
                        url: `/photos/${photo.id}`,
                        method: 'DELETE'
                    }
                }
            }),
        }
    }
});

export const {
    useFetchPhotosQuery,
    useAddPhotoMutation,
    useRemovePhotoMutation,
} = photosApi
export {photosApi};
