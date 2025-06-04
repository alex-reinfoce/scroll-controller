interface SmoothScrollControllerOptions {
  container: HTMLElement;
}

export default class SmoothScrollController {
  private options: SmoothScrollControllerOptions;

  private get container() {
    return this.options.container;
  }

  private autoScroll = true;

  private lastScrollHeight = 0;

  private onScroll(e: Event) {

  }

  private bundleEvent() {
    this.container.addEventListener('scroll', this.onScroll)
  }

  constructor(options: SmoothScrollControllerOptions) {
    this.options = options;

    if (!this.options.container) {
      throw new Error('container is required')
    }

    this.bundleEvent()
  }

  public settleDown() {
    if (!this.autoScroll) {
      return
    }

    if (this.lastScrollHeight > 0) {
      console.log(this.container.scrollHeight)
    } else {
      window.requestAnimationFrame(() => {
        this.lastScrollHeight = this.container.scrollHeight;
        this.container.scrollTo({
          top: this.container.scrollHeight,
          behavior: 'smooth'
        })
      })
    }
  }
}
