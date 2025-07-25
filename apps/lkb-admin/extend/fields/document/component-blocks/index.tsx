import { youtubeVideo } from "./youtube-video";
import { InferRenderersForComponentBlocks } from "@keystone-6/fields-document/component-blocks";

// it's important that this file has a named export called componentBlocks
// schema.Post.ui.views import looks for a named export `componentBlocks`
export const componentBlocks = {
  youtubeVideo,
};

export type Renderers = InferRenderersForComponentBlocks<typeof componentBlocks>;
