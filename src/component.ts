
export class liteYoutubeIframe extends HTMLElement {

    static nameComponent = "yt-lite";

/**
 * Constructs a new liteYoutubeIframe element and initializes the preview.
 */
    constructor() {
        super();
        this.preview();
    }

    static get observedAttributes() {
        return ["id", "title", "start-at"];  
    }

    /**
     * This method is called when the element is inserted into the document.
     * It adds an event listener to the element to listen for clicks.
     * When the element is clicked, the setVideo method is called to set the
     * src attribute of the iframe to the YouTube video URL and append the iframe to the element.
     */

    connectedCallback() {

        this.addEventListener("click", (e) => {
            e.preventDefault();
            this.setVideo();
        });
    }

    /**
     * This style string is used to style the component and its children.
     * It is also used to style the iframe when it is rendered.
     * The style string is a template literal that defines the styles for the component and its children.
     * The style string is set once when the component is first rendered and is not changed after that.
     */
    static get style() : string {
        return `
            yt-lite > .play__container {
                position: relative;
                min-width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                aspect-ratio: 16/9;
            }

            yt-lite > .play__container > .play__button {
                width: 68px;
                height: 48px;
                background: transparent;
                background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="68" height="48" viewBox="0 0 227 160" fill="none"><path d="M222.252 24.9795C220.966 20.1506 218.436 15.7435 214.914 12.1984C211.392 8.65325 207.002 6.09409 202.181 4.77646C184.485 1.12752e-06 113.5 0 113.5 0C113.5 0 42.5152 1.12752e-06 24.8092 4.77646C19.9906 6.09553 15.6023 8.65533 12.0821 12.2004C8.56198 15.7454 6.03317 20.1517 4.74808 24.9795C0 42.799 0 79.9702 0 79.9702C0 79.9702 0 117.141 4.74808 134.961C6.03399 139.79 8.56422 144.197 12.0861 147.742C15.608 151.287 19.9983 153.846 24.8187 155.164C42.5152 159.94 113.5 159.94 113.5 159.94C113.5 159.94 184.485 159.94 202.191 155.164C207.011 153.846 211.401 151.287 214.923 147.742C218.445 144.197 220.975 139.79 222.261 134.961C227 117.141 227 79.9702 227 79.9702C227 79.9702 227 42.799 222.252 24.9795ZM90.2798 113.718V46.2229L149.612 79.9702L90.2798 113.718Z" fill="url(%23paint0_linear_645_749)"/><defs><linearGradient id="paint0_linear_645_749" x1="-142.29" y1="81.6023" x2="227.001" y2="81.4144" gradientUnits="userSpaceOnUse"><stop stop-color="%236600CC"/><stop offset="1" stop-color="%23009990"/></linearGradient></defs></svg>');
                background-size: cover;
                border: none;
                cursor: pointer;

                &:hover {
                    transform: scale(1.1);
                }
            }
            
            yt-lite > .title__container {
                position:absolute;
                top:0;
                left:0;
                width: 100%;
                padding-left: 15px;    

                & > H2 {
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                }
            }

            yt-lite {
                position: relative;
                display: block;
                width: 100%;
                max-width: 600px;
                height: 100%;
                aspect-ratio: 16/9;
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                border-radius: 5px;
                
            }

            yt-lite > iframe {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }

            yt-lite, iframe {
                border-radius: 20px;
                border: 2px solid #362548;    
            }

            
        `
    }

    /**
     * Sets the preview for the YouTube video.
     * If the `src` attribute is set, the video ID is extracted from it.
     * The preview is set to the YouTube video thumbnail of the video set in the id attribute.
     * The preview also includes a play button that when clicked will set the src attribute of an iframe to the YouTube video URL and append the iframe to the element.
     */
    private preview(): void {

        if (this.getAttribute("src") !== null) {
            const id = this.getAttribute("src") ?? "";
            this.id = this.getId(id) ?? this.id;
        }

        this.innerHTML = `

        <style>${liteYoutubeIframe.style}</style>
        <div class="title__container">
            <h2 class="title__text">${this.title}</h2>
        </div>
        <div class="play__container">
            <button class="play__button"></button>
        </div>
        <noscript>
            <iframe src="https://www.youtube.com/embed/${this.id}" allowfullscreen></iframe>
        </noscript>
     `

        this.setThumbail();
    }

    /**
     * Sets the background image of this element to the YouTube video thumbnail of the video set in the id attribute.
     * The image is set from the YouTube thumbnail URL for the HQ default thumbnail.
     */
    private setThumbail(): void {
        const thumbJpg = `https://i1.ytimg.com/vi/${this.id}/hqdefault.jpg`;

        this.style.backgroundImage = `url(${thumbJpg})`;

    }

    /**
     * Creates an iframe and appends it to this element, the iframe points to the YouTube video with the video ID set in the id attribute.
     * The iframe is set to autoplay the video and allows the user to control the video with the mouse and keyboard.
     * The iframe is also set to allow picture-in-picture mode and to allow the video to be embedded in a fullscreen mode.
     */
    private setVideo(): void {

        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube-nocookie.com/embed/${this.id}?autoplay=1`;
        iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        this.appendChild(iframe);
    }

    /**
     * Extracts the YouTube video ID from a given URL.
     * 
     * @param src - The source URL string from which to extract the video ID.
     * @returns The video ID if found, otherwise null.
     */
    private getId( src: string ): string | null {
        const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^#&?\s]*)/i;
        const match = src.match(regex);
        return match ? match[1] : new URL(src).searchParams.get("v");
    }
}

customElements.define(liteYoutubeIframe.nameComponent, liteYoutubeIframe);
