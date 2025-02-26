
declare module '#app' {
    interface NuxtApp {
      $animate: (el: Element, keyframes: Keyframe[], options?: KeyframeAnimationOptions) => Promise<Animation>
    }
  }
  