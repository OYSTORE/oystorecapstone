import Image from "next/image";
import { Carousel } from "flowbite-react";

const Carousel1 = () => {
    return (
   
      <div className="h-60 lg:h-96 w-full">
        <Carousel>
          <div className="h-full w-full ">
            <Image
              src="/assets/c1.png" layout="fill" objectFit="cover" priority
              alt="..."
            />
          </div>
          <div className="h-full w-full">
          <Image
            src="/assets/c2.png" layout="fill" objectFit="cover" priority
            alt="..."
          />
          </div>
          <div className="h-full w-full">
            <Image
              src="/assets/c3.png" layout="fill" objectFit="cover" priority
              alt="..."
            />
          </div>
          <div className="h-full w-full">
          <Image
            src="/assets/c4.png" layout="fill" objectFit="cover" priority
            alt="..."
          />
          </div>
        </Carousel>
      </div>
   

    );
}
 
export default Carousel1;