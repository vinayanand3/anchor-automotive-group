export interface RectCache {
  readonly current: DOMRect;
  update: () => void;
  destroy: () => void;
}

export function createRectCache(element: HTMLElement | HTMLCanvasElement): RectCache {
  let cachedRect = element.getBoundingClientRect();

  const update = () => {
    cachedRect = element.getBoundingClientRect();
  };

  if (typeof window !== "undefined") {
    window.addEventListener("resize", update, { passive: true });
    window.addEventListener("scroll", update, { passive: true });
  }

  let observer: ResizeObserver | null = null;
  if (typeof ResizeObserver !== "undefined") {
    observer = new ResizeObserver(update);
    observer.observe(element);
  }

  return {
    get current() {
      return cachedRect;
    },
    update,
    destroy() {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", update);
        window.removeEventListener("scroll", update);
      }
      observer?.disconnect();
    },
  };
}
