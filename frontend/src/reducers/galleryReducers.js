import {
  GALLERY_ALBUMS_FAIL,
  GALLERY_ALBUMS_REQUEST,
  GALLERY_ALBUMS_SUCCESS,
  GALLERY_ALBUM_CREATE_FAIL,
  GALLERY_ALBUM_CREATE_REQUEST,
  GALLERY_ALBUM_CREATE_RESET,
  GALLERY_ALBUM_CREATE_SUCCESS,
  GALLERY_ALBUM_DELETE_FAIL,
  GALLERY_ALBUM_DELETE_REQUEST,
  GALLERY_ALBUM_DELETE_SUCCESS,
  GALLERY_VIDEOS_ADD_FAIL,
  GALLERY_VIDEOS_ADD_REQUEST,
  GALLERY_VIDEOS_ADD_RESET,
  GALLERY_VIDEOS_ADD_SUCCESS,
  GALLERY_VIDEOS_DELETE_FAIL,
  GALLERY_VIDEOS_DELETE_REQUEST,
  GALLERY_VIDEOS_DELETE_SUCCESS,
  GALLERY_VIDEOS_FAIL,
  GALLERY_VIDEOS_REQUEST,
  GALLERY_VIDEOS_SUCCESS,
  SINGLE_ALBUM_FAIL,
  SINGLE_ALBUM_REQUEST,
  SINGLE_ALBUM_SUCCESS,
  WGALLERY_ALBUMS_REQUEST,
  WGALLERY_ALBUMS_SUCCESS,
  WGALLERY_ALBUMS_FAIL,
  WGALLERY_ALBUM_CREATE_REQUEST,
  WGALLERY_ALBUM_CREATE_SUCCESS,
  WGALLERY_ALBUM_CREATE_FAIL,
  WGALLERY_ALBUM_CREATE_RESET,
  WGALLERY_ALBUM_DELETE_REQUEST,
  WGALLERY_ALBUM_DELETE_SUCCESS,
  WGALLERY_ALBUM_DELETE_FAIL,
  SINGLE_WALBUM_REQUEST,
  SINGLE_WALBUM_SUCCESS,
  SINGLE_WALBUM_FAIL,
} from "../actions/types";

export const galleryAlbumsReducer = (state = { albums: [] }, action) => {
  switch (action.type) {
    case GALLERY_ALBUMS_REQUEST:
      return { loading: true, albums: [] };
    case GALLERY_ALBUMS_SUCCESS:
      return { loading: false, albums: action.payload };
    case GALLERY_ALBUMS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const galleryWAlbumsReducer = (state = { wAlbums: [] }, action) => {
  switch (action.type) {
    case WGALLERY_ALBUMS_REQUEST:
      return { loading: true, wAlbums: [] };
    case WGALLERY_ALBUMS_SUCCESS:
      return { loading: false, wAlbums: action.payload };
    case WGALLERY_ALBUMS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const galleryAlbumCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case GALLERY_ALBUM_CREATE_REQUEST:
      return { loading: true };
    case GALLERY_ALBUM_CREATE_SUCCESS:
      return { loading: false, success: true, albums: action.payload };
    case GALLERY_ALBUM_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case GALLERY_ALBUM_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const galleryWAlbumCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case WGALLERY_ALBUM_CREATE_REQUEST:
      return { loading: true };
    case WGALLERY_ALBUM_CREATE_SUCCESS:
      return { loading: false, success: true, wAlbums: action.payload };
    case WGALLERY_ALBUM_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case WGALLERY_ALBUM_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const galleryAlbumDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case GALLERY_ALBUM_DELETE_REQUEST:
      return { loading: true };
    case GALLERY_ALBUM_DELETE_SUCCESS:
      return { loading: false, success: true };
    case GALLERY_ALBUM_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const galleryWAlbumDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case WGALLERY_ALBUM_DELETE_REQUEST:
      return { loading: true };
    case WGALLERY_ALBUM_DELETE_SUCCESS:
      return { loading: false, success: true };
    case WGALLERY_ALBUM_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const singleGalleryAlbumReducer = (state = {}, action) => {
  switch (action.type) {
    case SINGLE_ALBUM_REQUEST:
      return { loading: true, images: [] };
    case SINGLE_ALBUM_SUCCESS:
      return { loading: false, images: action.payload };
    case SINGLE_ALBUM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const singleWGalleryAlbumReducer = (state = {}, action) => {
  switch (action.type) {
    case SINGLE_WALBUM_REQUEST:
      return { loading: true, images: [] };
    case SINGLE_WALBUM_SUCCESS:
      return { loading: false, images: action.payload };
    case SINGLE_WALBUM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const galleryVideosReducer = (state = { videos: [] }, action) => {
  switch (action.type) {
    case GALLERY_VIDEOS_REQUEST:
      return { loading: true, videos: [] };
    case GALLERY_VIDEOS_SUCCESS:
      return { loading: false, videos: action.payload };
    case GALLERY_VIDEOS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const galleryVideosCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case GALLERY_VIDEOS_ADD_REQUEST:
      return { loading: true };
    case GALLERY_VIDEOS_ADD_SUCCESS:
      return { loading: false, success: false, videos: action.payload };
    case GALLERY_VIDEOS_ADD_FAIL:
      return { loading: false, error: action.payload };
    case GALLERY_VIDEOS_ADD_RESET:
      return {};
    default:
      return state;
  }
};

export const galleryVideosDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case GALLERY_VIDEOS_DELETE_REQUEST:
      return { loading: true };
    case GALLERY_VIDEOS_DELETE_SUCCESS:
      return { loading: false, success: true };
    case GALLERY_VIDEOS_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
