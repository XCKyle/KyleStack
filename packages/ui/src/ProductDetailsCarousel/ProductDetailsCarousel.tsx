import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

type ImageType = {
  title: string
  url: string
}

export default function ProductDetailsCarousel({ images }: { images: ImageType[] }) {
  return (
    <div className="sticky top-[50px] mx-auto w-full max-w-[1360px] text-[20px] text-white">
      <Carousel
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        thumbWidth={60}
        className="productCarousel"
      >
        {images.map((image) => (
          <img key={image.url} src={image.url} alt={image.title} width={860} height={1080} />
        ))}
      </Carousel>
    </div>
  )
}
