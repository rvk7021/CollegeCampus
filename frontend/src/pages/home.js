import { Slider } from "../components/slider.js";
import NavBar from "../components/NavBar.js"
import { FaCalendarAlt } from 'react-icons/fa'; 
import { useState ,useEffect} from "react";
const dataCounts = [
  { count: 2400, label: 'Undergraduates', color: 'bg-blue-400' },
  { count: 417, label: 'Postgraduates', color: 'bg-green-400' },
  { count: 160, label: 'Ph.D. Scholars', color: 'bg-yellow-400' },
  { count: 3, label: 'Departments', color: 'bg-purple-400' },
  { count: 60, label: 'Faculties', color: 'bg-red-400' },
  { count: 56, label: 'Staffs', color: 'bg-indigo-400' },
  { count: 790, label: 'Publications', color: 'bg-pink-400' },
];
export default function Home(){

  const [displayCounts, setDisplayCounts] = useState(
    dataCounts.map(data => ({ ...data, displayedCount: 0 }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayCounts(prevCounts => 
        prevCounts.map(data => {
          if (data.displayedCount < data.count) {
            return { ...data, displayedCount: Math.min(data.displayedCount + 10, data.count) }; // Increment by 10
          }
          return data;
        })
      );
    }, 20); // Adjust timing as needed

    return () => clearInterval(interval);
  }, []);
  const notices = [
    { category: 'Students', caption: 'Orientation session for first-year students on campus guidelines', link: '/news/orientation', date: '2024-11-01' },
    { category: 'Students', caption: 'Student club registrations open for all departments', link: '/news/club-registration', date: '2024-10-15' },
    { category: 'Students', caption: 'Scholarship application deadlines for the semester announced', link: '/news/scholarship-deadline', date: '2024-10-12' },
    { category: 'Students', caption: 'New library hours and rules for the upcoming semester', link: '/news/library-hours', date: '2024-10-25' },
    
    { category: 'Teachers', caption: 'Faculty meeting scheduled for upcoming curriculum review', link: '/news/faculty-meeting', date: '2024-10-30' },
    { category: 'Teachers', caption: 'Workshop on research and development methodologies', link: '/news/workshop', date: '2024-10-22' },
    { category: 'Teachers', caption: 'Seminar on interdisciplinary teaching methods', link: '/news/interdisciplinary-teaching', date: '2024-10-14' },
    { category: 'Teachers', caption: 'Annual faculty development program begins next month', link: '/news/faculty-development', date: '2024-10-08' },
    
    { category: 'Important', caption: 'COVID-19: Health and safety measures for all members', link: '/news/covid-guidelines', date: '2024-10-28' },
    { category: 'Important', caption: 'Alumni meet scheduled for December 2023', link: '/news/alumni-meet', date: '2024-10-18' },
    { category: 'Important', caption: 'Electricity maintenance alert for selected buildings on campus', link: '/news/electricity-maintenance', date: '2024-10-05' },
    { category: 'Important', caption: 'National Science Day celebrations and keynote speakers', link: '/news/science-day', date: '2024-10-02' },
];

      const values = [
        { 
          title: 'Integrity', 
          description: 'We adhere to the highest standards of honesty and ethics in all our actions. Integrity is the foundation of our institution, guiding every decision and interaction to ensure trust and respect across our community. We believe that integrity fosters transparency and accountability, creating an environment where all members can feel valued and secure.' 
        },
        { 
          title: 'Excellence', 
          description: 'We strive for excellence in all aspects of our academic, research, and community service endeavors. Our commitment to high standards drives us to constantly improve, innovate, and inspire others. Excellence is not just a goal but a continuous journey, as we seek to challenge ourselves and set new benchmarks in education and research that benefit society.' 
        },
        { 
          title: 'Innovation', 
          description: 'We foster creativity and innovation to address real-world challenges and prepare our community for the future. We encourage a mindset of curiosity and exploration, empowering our students and faculty to think outside the box. Through research, collaboration, and applied learning, we aim to create solutions that have a lasting, positive impact on society and advance knowledge in meaningful ways.' 
        },
      ];
      
      const studentNotices = notices.filter(notice => notice.category === 'Students');
      const teacherNotices = notices.filter(notice => notice.category === 'Teachers');
      const importantNotices = notices.filter(notice => notice.category === 'Important');
      const handleNoticeClick = (link) => {
        window.open(link, '_blank');
      };

      const images = [
        { src: 'gal1.jpeg', title: 'Gallery Image 1' },
        { src: 'gal2.jpeg', title: 'Gallery Image 2' },
        { src: 'gal3.jpeg', title: 'Gallery Image 3' },
        { src: 'gal4.jpeg', title: 'Gallery Image 4' },
        { src: 'gal5.jpeg', title: 'Gallery Image 5' },
        { src: 'gal6.jpeg', title: 'Gallery Image 6' },
        { src: 'gal7.jpeg', title: 'Gallery Image 7' },
        { src: 'gal8.jpeg', title: 'Gallery Image 8' },
        { src: 'gal9.jpeg', title: 'Gallery Image 9' },
        { src: 'gal10.jpeg', title: 'Gallery Image 10' },
        { src: 'gal11.jpg', title: 'Gallery Image 11' },
      ];
      
  const [visibleCount, setVisibleCount] = useState(8);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 8);
  };


  const [isNavFixed, setIsNavFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsNavFixed(true);
      } else {
        setIsNavFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
    return (
      <section>
        {/* navbar && slider div */}
        <div>
          <div className="flex justify-center items-center w-full md:m-2">
            <img
              src="/iiitn.png"
              alt="IIIT Nagpur Logo"
              className="w-[60%] h-auto object-cover"
            />
          </div>
          <div className={isNavFixed ? "fixed top-0 w-full z-10" : "relative"}>
            <NavBar />
          </div>

          {/* slider  */}
          <div className="border-[10px]">
            <Slider></Slider>
          </div>
        </div>

        {/* notice board section */}
        <div className="values rounded-md bg-red-100 m-2 p-4">
          <h1 className="text-center md:text-3xl text-2xl font-bold  mb-4 p-2 border-b-[2px] border-b-black">
            Notice Board
          </h1>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
            {/* Students Section */}
            <section className="bg-red-300 opacity-90 p-4 rounded-lg shadow-md">
              <h1 className="text-center md:text-2xl p-2 border-b-[2px] border-b-black text-xl font-semibold  mb-4">
                Students
              </h1>
              {studentNotices.map((notice, index) => (
                <div
                  key={index}
                  className="mb-4 pb-6 border-b-[1px] relative border-b-white p-2"
                >
                  {" "}
                  {/* Added padding-bottom */}
                  <p
                    className="text-md font-sans  cursor-pointer"
                    onClick={() => handleNoticeClick(notice.link)}
                  >
                    {notice.caption}
                  </p>
                  <br></br>
                  <div className="text-md text-gray-700  font-semibold absolute bottom-1 right-1 flex items-center space-x-1">
                    {" "}
                    {/* Adjusted bottom position */}
                    <FaCalendarAlt className="mr-1" />{" "}
                    <span>{notice.date}</span>
                  </div>
                </div>
              ))}
            </section>

            {/* Teachers Section */}
            <section className="bg-red-300 opacity-90 p-4 rounded-lg shadow-md">
              <h1 className="text-center md:text-2xl p-2 border-b-[2px] border-b-black text-xl font-semibold font-mono mb-4">
                Teachers
              </h1>
              {teacherNotices.map((notice, index) => (
                <div
                  key={index}
                  className="mb-4 pb-6 border-b-[1px] relative border-b-white p-2"
                >
                  {" "}
                  {/* Added padding-bottom */}
                  <p
                    className="text-md font-sans  cursor-pointer"
                    onClick={() => handleNoticeClick(notice.link)}
                  >
                    {notice.caption}
                  </p>
                  <br></br>
                  <div className="text-md text-gray-700  font-semibold absolute bottom-1 right-1 flex items-center space-x-1">
                    {" "}
                    {/* Adjusted bottom position */}
                    <FaCalendarAlt className="mr-1" />{" "}
                    <span>{notice.date}</span>
                  </div>
                </div>
              ))}
            </section>

            {/* Important Section */}
            <section className="bg-red-300 opacity-90 p-4 rounded-lg shadow-md">
              <h1 className="text-center md:text-2xl p-2 border-b-[2px] border-b-black text-xl font-semibold font-mono mb-4">
                Important
              </h1>
              {importantNotices.map((notice, index) => (
                <div
                  key={index}
                  className="mb-4 pb-6 border-b-[1px] relative border-b-white p-2"
                >
                  {" "}
                  {/* Added padding-bottom */}
                  <p
                    className="text-md font-sans  cursor-pointer"
                    onClick={() => handleNoticeClick(notice.link)}
                  >
                    {notice.caption}
                  </p>
                  <br></br>
                  <div className="text-md text-gray-700  font-semibold absolute bottom-1 right-1 flex items-center space-x-1">
                    {" "}
                    {/* Adjusted bottom position */}
                    <FaCalendarAlt className="mr-1" />{" "}
                    <span>{notice.date}</span>
                  </div>
                </div>
              ))}
            </section>
          </div>
        </div>

        {/* gallary section */}
        <div className="text-center bg-red-100 rounded-md m-2 p-4">
          <h2 className="text-center md:text-3xl text-2xl font-bold font-mono mb-4 p-2 border-b-[2px] border-b-black">
            Gallery Of Arts
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-4  gap-4">
            {images.slice(0, visibleCount).map((image, index) => (
              <div key={index} className="gallery-item p-2">
                <img
                  src={image.src}
                  alt={image.title}
                  className="rounded-lg shadow-md w-full h-auto"
                />
                <h3 className="mt-2 font-semibold text-md font-sans">
                  {image.title}
                </h3>
              </div>
            ))}
          </div>
          {visibleCount < images.length && (
            <button
              onClick={loadMore}
              className="mt-4 bg-blue-600 text-white rounded px-4 py-2"
            >
              Load More
            </button>
          )}
        </div>

        {/* values section */}

        <div className="values rounded-md bg-red-100 m-2 p-4 shadow-lg border border-gray-300">
          <h1 className="text-center md:text-3xl text-2xl font-bold font-mono mb-4">
            Our Values
          </h1>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
            {values.map((value, index) => (
              <section
                key={index}
                className="bg-red-200 p-6 rounded-lg shadow-md border border-gray-400 transform transition duration-300 hover:scale-105"
              >
                <h2 className="text-center md:text-2xl text-xl font-semibold font-mono mb-4">
                  {value.title}
                </h2>
                <p className="text-md font-sans">{value.description}</p>
              </section>
            ))}
          </div>
        </div>

        {/* stats */}
        <div className="values rounded-md bg-red-100 m-2 p-4">
          <h1 className="text-center md:text-3xl text-2xl font-bold font-mono mb-4">
            Our Journey
          </h1>
          <div className="grid content-center lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
            {displayCounts.map((data, index) => (
              <div
                key={index}
                className={`${data.color} p-4 rounded-lg shadow-md flex flex-col items-center`}
              >
                <h2 className="text-xl font-semibold">
                  {data.displayedCount}+
                </h2>
                <p className="text-md font-sans text-center">{data.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );

}