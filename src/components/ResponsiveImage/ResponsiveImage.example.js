import React from 'react';
import ResponsiveImage from './ResponsiveImage';
import { types as sdkTypes } from '../../util/sdkLoader';

import css from './ResponsiveImageExample.module.css';

const { UUID } = sdkTypes;

const ResponsiveImageWrapper = props => {
  return (
    <div className={css.root}>
      <ResponsiveImage {...props} />
    </div>
  );
};

const ResponsiveImageWrapperWithAspectRatio = props => {
  return (
    <div className={css.root}>
      <div className={css.aspectWrapper}>
        <ResponsiveImage {...props} rootClassName={css.rootForImageWithAspectRatio} />
      </div>
    </div>
  );
};

/* Image without aspect ratio wrapper */
export const Image2X = {
  component: ResponsiveImageWrapper,
  props: {
    alt: 'img',
    image: {
      id: new UUID('empty'),
      type: 'image',
      attributes: {
        variants: {
          crop: {
            name: 'crop',
            width: 200,
            height: 133,
            url: 'https://picsum.photos/200/133/',
          },
          crop2x: {
            name: 'crop2x',
            width: 400,
            height: 266,
            url: 'https://picsum.photos/400/266/',
          },
        },
      },
    },
    variants: ['crop', 'crop2x'],
  },
  group: 'images',
};

/* Image with aspect ratio wrapper */
export const Image2XAspect = {
  component: ResponsiveImageWrapperWithAspectRatio,
  props: {
    alt: 'img',
    image: {
      id: new UUID('empty'),
      type: 'image',
      attributes: {
        variants: {
          crop: {
            name: 'crop',
            width: 200,
            height: 133,
            url: 'https://picsum.photos/200/133/',
          },
          crop2x: {
            name: 'crop2x',
            width: 400,
            height: 266,
            url: 'https://picsum.photos/400/266/',
          },
        },
      },
    },
    variants: ['crop', 'crop2x'],
  },
  group: 'images',
};

/* Image with aspect ratio wrapper and wrong aspect */
export const Image2XWrongAspect = {
  component: ResponsiveImageWrapperWithAspectRatio,
  props: {
    alt: 'img',
    image: {
      id: new UUID('empty'),
      type: 'image',
      attributes: {
        variants: {
          crop: {
            name: 'crop',
            width: 200,
            height: 200,
            url: 'https://picsum.photos/200/200/',
          },
          crop2x: {
            name: 'crop2x',
            width: 400,
            height: 400,
            url: 'https://picsum.photos/400/400/',
          },
        },
      },
    },
    variants: ['crop', 'crop2x'],
  },
  group: 'images',
};

export const Image2XWrongAspectNoWrapper = {
  component: ResponsiveImage,
  props: {
    alt: 'img',
    image: {
      id: new UUID('empty'),
      type: 'image',
      attributes: {
        variants: {
          crop: {
            name: 'crop',
            width: 200,
            height: 133,
            url: 'https://picsum.photos/200/133/',
          },
          crop2x: {
            name: 'crop2x',
            width: 400,
            height: 266,
            url: 'https://picsum.photos/400/266/',
          },
        },
      },
    },
    variants: ['crop', 'crop2x'],
  },
  group: 'images',
};

/* No image without aspect ratio wrapper */
export const ImageEmpty = {
  component: ResponsiveImageWrapper,
  props: {
    alt: 'img',
    image: null,
    variants: ['crop', 'crop2x'],
  },
  group: 'images',
};

/* No image with aspect ratio wrapper */
export const ImageEmptyWithAspect = {
  component: ResponsiveImageWrapperWithAspectRatio,
  props: {
    alt: 'img',
    image: null,
    variants: ['crop', 'crop2x'],
  },
  group: 'images',
};

/* Image without aspect ratio wrapper usign sizes */
const ResponsiveImageWrapperForSizes = props => (
  <div className={css.rootForSizes}>
    <div className={css.aspectWrapper}>
      <ResponsiveImage {...props} />
    </div>
  </div>
);

export const ImageWithSizes = {
  component: ResponsiveImageWrapperForSizes,
  props: {
    alt: 'img',
    image: {
      id: new UUID('empty'),
      type: 'image',
      attributes: {
        variants: {
          crop: {
            name: 'crop',
            width: 200,
            height: 133,
            url: 'https://picsum.photos/200/133/',
          },
          crop2x: {
            name: 'crop2x',
            width: 400,
            height: 266,
            url: 'https://picsum.photos/400/266/',
          },
        },
      },
    },
    variants: ['crop', 'crop2x'],
    sizes: '(max-width: 600px) 200px, 400px',
  },
  group: 'images',
};
