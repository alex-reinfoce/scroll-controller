interface SmoothScrollControllerOptions {
  container: HTMLElement;
  threshold?: number;
  animationDuration?: number;
  easingFunction?: (t: number) => number;
}

export default class SmoothScrollController {
  private options: SmoothScrollControllerOptions;
  private autoScroll = true;
  private lastScrollHeight = 0;
  private isScrolling = false;
  private scrollAnimationId: number | null = null;
  private lastScrollTop = 0;
  private userScrollThreshold: number;
  private animationDuration: number;
  private easingFunction: (t: number) => number;

  private get container() {
    return this.options.container;
  }

  private defaultEasing = (t: number): number => {
    return 1 - Math.pow(1 - t, 3);
  }

  private isNearBottom(threshold: number = 50): boolean {
    const { scrollTop, scrollHeight, clientHeight } = this.container;
    return scrollHeight - scrollTop - clientHeight <= threshold;
  }

  private onScroll = (e: Event) => {
    if (!this.isScrolling) {
      const currentScrollTop = this.container.scrollTop;

      if (currentScrollTop < this.lastScrollTop) {
        this.autoScroll = false;
      } else if (this.isNearBottom(this.userScrollThreshold)) {
        this.autoScroll = true;
      }

      this.lastScrollTop = currentScrollTop;
    }
  }

  private smoothScrollTo(targetScrollTop: number): Promise<void> {
    return new Promise((resolve) => {
      if (this.scrollAnimationId) {
        cancelAnimationFrame(this.scrollAnimationId);
      }

      const startScrollTop = this.container.scrollTop;
      const distance = targetScrollTop - startScrollTop;
      const startTime = performance.now();

      this.isScrolling = true;

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / this.animationDuration, 1);

        const easedProgress = this.easingFunction(progress);
        const currentScrollTop = startScrollTop + distance * easedProgress;

        this.container.scrollTop = currentScrollTop;

        if (progress < 1) {
          this.scrollAnimationId = requestAnimationFrame(animateScroll);
        } else {
          this.isScrolling = false;
          this.scrollAnimationId = null;
          this.lastScrollTop = currentScrollTop;
          resolve();
        }
      };

      this.scrollAnimationId = requestAnimationFrame(animateScroll);
    });
  }

  private bundleEvent() {
    this.container.addEventListener('scroll', this.onScroll, { passive: true });
  }

  constructor(options: SmoothScrollControllerOptions) {
    this.options = options;

    if (!this.options.container) {
      throw new Error('container is required');
    }

    this.userScrollThreshold = this.options.threshold || 100;
    this.animationDuration = this.options.animationDuration || 300;
    this.easingFunction = this.options.easingFunction || this.defaultEasing;
    this.lastScrollTop = this.container.scrollTop;

    this.bundleEvent();
  }

  public async settleDown(): Promise<void> {
    const currentScrollHeight = this.container.scrollHeight;

    if (currentScrollHeight === this.lastScrollHeight) {
      return;
    }

    this.lastScrollHeight = currentScrollHeight;

    if (!this.autoScroll) {
      return;
    }

    const targetScrollTop = currentScrollHeight - this.container.clientHeight;

    if (Math.abs(this.container.scrollTop - targetScrollTop) < 1) {
      return;
    }

    await this.smoothScrollTo(targetScrollTop);
  }

  public async forceScrollToBottom(): Promise<void> {
    const targetScrollTop = this.container.scrollHeight - this.container.clientHeight;
    await this.smoothScrollTo(targetScrollTop);
    this.autoScroll = true;
  }

  public enableAutoScroll(): void {
    this.autoScroll = true;
  }

  public disableAutoScroll(): void {
    this.autoScroll = false;
  }

  public isAutoScrollEnabled(): boolean {
    return this.autoScroll;
  }

  public destroy(): void {
    if (this.scrollAnimationId) {
      cancelAnimationFrame(this.scrollAnimationId);
    }
    this.container.removeEventListener('scroll', this.onScroll);
  }
}
