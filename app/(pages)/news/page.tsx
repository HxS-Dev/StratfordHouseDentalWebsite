import Contact from '@/app/components/Contact'
import Footer from '@/app/components/Footer'
import Header from '@/app/components/Header'
import HeroSec from '@/app/components/HeroSec'
import { sanityClient } from '@/lib/sanity'
import { allArticleQuery } from '@/lib/queries';
import ArticlesWithPagination from './ArticlesWithPagination'

type TitlePart = {
     tag: "h1" | "h6";
     text: string;
};
const exampleTitleParts: TitlePart[] = [
     { tag: "h1", text: "Articles Of Interest" },
];
async function page() {
     const articles = await sanityClient.fetch(allArticleQuery);

     return (
          <div>
               <Header></Header>
               <HeroSec titleParts={exampleTitleParts} />;
               <section className='md:py-[105px] pt-10'>
                    <div className="xl:max-w-[1270px]  w-full max-w-[952px] relative md:px-5 px-4 mx-auto">
                         <img src="images/articel-img.png" className='mb-8' alt="" />
                         <h2 className='md:text-[40px] text-2xl md:mb-8 mb-2.5 font-medium md:leading-[44px] leading-7 text-blue-1300'>Ullamcorper in quis nulla eu feugiat lacus.</h2>
                         <p className='md:text-lg text-base font-normal md:leading-7 leading-6 text-black'>Ultrices dolor sodales tellus aliquam aenean. Volutpat risus fringilla diam consectetur consequat nam. Donec massa sit lectus vitae sed nunc urna cursus. Vitae sit cras sed sollicitudin leo. Vel pellentesque mattis volutpat sagittis amet mi nullam quis ac. Tellus nunc tincidunt malesuada enim diam. In mauris consequat at.</p>
                         <div className='w-full relative'>
                           <img src="/images/ullamcorper-bg.png" alt="no-img" className='absolute -left-16 -top-10 -z-[1]' />
                              <ArticlesWithPagination  items={articles}/>
                         </div>
                    </div>
               </section>
               <Footer></Footer>
          </div>
     )
}

export default page
