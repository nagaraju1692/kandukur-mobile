export const categories = [
  { id: '1', name: 'Education', parentId: null },
  { id: 'edu-1', name: 'Engineering colleges', parentId: '1' },
  { id: 'edu-2', name: 'Degree colleges', parentId: '1' },
  { id: 'edu-3', name: 'Intermediate', parentId: '1' },
  { id: 'edu-4', name: 'Polytechnic colleges', parentId: '1' },
  { id: 'edu-5', name: 'Schools', parentId: '1' },
  { id: '2', name: 'Hospitals', parentId: null },
  { id: '3', name: 'Medical shops', parentId: null },
  { id: '4', name: 'Restaurants', parentId: null },
  { id: '6', name: 'Lodges', parentId: null },
  { id: '7', name: 'Bus stand', parentId: null },
  { id: '8', name: 'Police station', parentId: null },
  { id: '10', name: 'Temples', parentId: null },
  { id: '11', name: 'Banks', parentId: null },
  { id: '12', name: 'Beauty clinics', parentId: null },
  { id: '13', name: 'Movie Theaters', parentId: null },
  { id: '14', name: 'Shopping clothes', parentId: null },
  { id: '15', name: 'Retail marts', parentId: null },
  { id: '16', name: 'Wine shops', parentId: null },
  { id: '17', name: 'Jewellery shops', parentId: null },
  { id: '18', name: 'RealEstate', parentId: null },
  { id: '19', name: 'ATM machines', parentId: null },
  { id: '20', name: 'Agricultural info', parentId: null },
  { id: 'agri-1', name: 'Tobacoco Boards', parentId: '20'},
  { id: 'agri-2', name: 'Vegitable Market', parentId: '20'},
  { id: 'agri-3', name: 'Fish Market', parentId: '20' },
]

export const businesses = [
  // 🏫 Schools
  {
    id: 's1',
    name: 'Sri Chaitanya High School, Kandukur',
    categoryId: 'edu-5',
    categoryName: 'Schools',
    address: 'Pamur Road, Kandukur, Andhra Pradesh',
    phone: 'N/A',
    website: 'https://srichaitanyaschool.net',
    description: 'State Board curriculum with strong academic focus and modern teaching methods.',
    image: 'images/SriChaitanya_main.jpg',
    gallery: ['images/SriChaitanya_building1.jpg','images/SriChaitanya_classroom2.jpg']
  },
  {
    id: 's2',
    name: 'Vikas High School, Kandukur',
    categoryId: 'edu-5',
    categoryName: 'Schools',
    address: 'Kandukur, Prakasam District',
    phone: 'N/A',
    website: 'N/A',
    description: 'Known for extracurriculars, cultural activities, and holistic student development.',
    image: 'images/VikasSchool_main.jpg',
    gallery: ['images/VikasSchool_building1.jpg','images/VikasSchool_event2.jpg']
  },
  {
    id: 's3',
    name: 'Gowthami Model School, Kandukur',
    categoryId: 'edu-5',
    categoryName: 'Schools',
    address: 'Near ZPHS, Kandukur, Andhra Pradesh',
    phone: 'N/A',
    website: 'N/A',
    description: 'Affordable education with focus on conceptual learning and community support.',
    image: 'images/GowthamiSchool_main.jpg',
    gallery: ['images/GowthamiSchool_building1.jpg','images/GowthamiSchool_classroom2.jpg']
  },
  {
    id: 's4',
    name: 'Ravindra Bharathi Primary School, Kandukur',
    categoryId: 'edu-5',
    categoryName: 'Schools',
    address: 'Kandukur, Andhra Pradesh',
    phone: 'N/A',
    website: 'https://ravindrabharathi.in',
    description: 'Modern facilities with emphasis on holistic development and extracurriculars.',
    image: 'images/RavindraBharathi_main.jpg',
    gallery: ['images/RavindraBharathi_building1.jpg','images/RavindraBharathi_classroom2.jpg']
  },

  // 🎓 Intermediate Colleges
  {
    id: 'i1',
    name: 'Sri Vidya Junior College, Kandukur',
    categoryId: 'edu-3',
    categoryName: 'Intermediate',
    address: 'Opposite Bus Stand, Kandukur, Andhra Pradesh',
    phone: '18001030',
    website: 'https://srividyaeducation.com',
    description: 'Strong performance in Science and Commerce streams, mentoring for competitive exams.',
    image: 'images/SriVidya_main.jpg',
    gallery: ['images/SriVidya_building1.jpg','images/SriVidya_building2.jpg']
  },
  {
    id: 'i2',
    name: 'Sri Gayatri Vidya Parishad Junior College, Kandukur',
    categoryId: 'edu-3',
    categoryName: 'Intermediate',
    address: 'O.V. Road, Kandukur, Andhra Pradesh',
    phone: 'N/A',
    website: 'N/A',
    description: 'Private junior college offering Science and Commerce streams.',
    image: 'images/SriGayatriJunior_main.jpg',
    gallery: ['images/SriGayatriJunior_building1.jpg']
  },
  {
    id: 'i3',
    name: 'Sri Viveka Junior College, Kandukur',
    categoryId: 'edu-3',
    categoryName: 'Intermediate',
    address: 'Beside SBI Bank, O.V. Road, Kandukur',
    phone: 'N/A',
    website: 'N/A',
    description: 'Intermediate college with focus on Science and Arts streams.',
    image: 'images/VivekaJunior_main.jpg',
    gallery: ['images/VivekaJunior_building1.jpg']
  },

  // 🛠 Polytechnic
  {
    id: 'p1',
    name: 'Government Polytechnic College, Kandukur',
    categoryId: 'edu-4',
    categoryName: 'Polytechnic colleges',
    address: 'Beside TRR Degree & Junior Colleges, Uppucheruvu Road, SPSR Nellore District – 523105',
    phone: '08598-222245',
    website: 'mailto:gptkdkr@gmail.com',
    description: 'Established in 2009, offers Diploma in Civil Engineering and Electrical & Electronics Engineering.',
    image: 'images/GovtPolytechnic_main.jpg',
    gallery: ['images/GovtPolytechnic_building1.jpg','images/GovtPolytechnic_building2.jpg']
  },

  // ⚙️ Engineering Colleges
  {
    id: 'e1',
    name: 'Prakasam Engineering College (PEC), Kandukur',
    categoryId: 'edu-1',
    categoryName: 'Engineering colleges',
    address: 'Kanigiri Road, Kandukur, Andhra Pradesh – 523105',
    phone: '08598-223546',
    website: 'https://pec.ac.in',
    description: 'Established in 2001, affiliated to JNTU Kakinada. Offers B.Tech, M.Tech, MBA, MCA.',
    image: 'images/PrakasamEngg_main.jpg',
    gallery: ['images/PrakasamEngg_campus1.jpg','images/PrakasamEngg_campus2.jpg']
  },
  {
    id: 'e2',
    name: 'ABR College of Engineering & Technology, Kandukur',
    categoryId: 'edu-1',
    categoryName: 'Engineering colleges',
    address: 'China Irlapadu, Kanigiri Road, Prakasam District',
    phone: 'N/A',
    website: 'N/A',
    description: 'Engineering college offering B.Tech programs in multiple streams.',
    image: 'images/ABRCollege_main.jpg',
    gallery: ['images/ABRCollege_building1.jpg']
  }
,
  {
    id: 'h3',
    name: 'Dr. Kota Reddy Multi Speciality Hospital',
    categoryId: '2',
    categoryName: 'Hospitals',
    address: '6-2/4C, Kandukur, Prakasam District',
    phone: '08594-223344',
    website: 'https://www.kotareddymultispeciality.com',
    description: 'A multi-specialty hospital with emergency care, diagnostics and specialist consultations for families and travellers.',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895973?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1538108149393-fbbd81895973?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'h4',
    name: 'Sarada Nursing Home',
    categoryId: '2',
    categoryName: 'Hospitals',
    address: 'Front garden, Kandukur',
    phone: '08594-332211',
    website: 'https://www.saradanursinghome.com',
    description: 'Long-standing nursing home and care center focused on maternal support, treatment, and community patient care.',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1538108149393-fbbd81895973?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'h5',
    name: 'Pranavi Children\'s Hospital & Eye Care',
    categoryId: '2',
    categoryName: 'Hospitals',
    address: 'Kovur Road, Kandukur',
    phone: '08594-556677',
    website: 'https://www.pranavihospital.com',
    description: 'Child-friendly care center and eye treatment facility serving local families with pediatric and eye care services.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1538108149393-fbbd81895973?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'h6',
    name: 'Sakthi Children\'s Hospital',
    categoryId: '2',
    categoryName: 'Hospitals',
    address: 'Opposite Municipal Office, Kandukur',
    phone: '08594-667788',
    website: 'https://www.sakthihospital.in',
    description: 'Pediatric hospital offering compassionate and affordable care for children, newborns and family wellness checks.',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1538108149393-fbbd81895973?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'h7',
    name: 'Harish ENT Hospital',
    categoryId: '2',
    categoryName: 'Hospitals',
    address: 'Rural Police Station Area, Kandukur',
    phone: '072078 83551',
    website: 'https://www.harishenthospital.com',
    description: 'Specialist ENT care and hearing treatment center serving local families with trusted clinical support and consultation.',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1538108149393-fbbd81895973?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'h8',
    name: 'Sultan Mohiuddin Nursing Home',
    categoryId: '2',
    categoryName: 'Hospitals',
    address: 'OV Rd, beside ZPHS Boys High School, Kandukur',
    phone: '08594-556677',
    website: 'https://www.sultanmohiuddinnursinghome.com',
    description: 'Care-focused nursing home offering patient support, nursing assistance and community health services for families.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1538108149393-fbbd81895973?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'h9',
    name: 'Muppa Roshaiah Hospital',
    categoryId: '2',
    categoryName: 'Hospitals',
    address: '6W83+H2W, Unnamed Road, Kandukur',
    phone: '08594-102030',
    website: 'https://www.mupparoshaiahhospital.com',
    description: 'General hospital providing regular checkups, emergency care and basic treatment for patients in and around Kandukur.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1538108149393-fbbd81895973?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'h10',
    name: 'Babu Dental Hospital',
    categoryId: '2',
    categoryName: 'Hospitals',
    address: 'Pamuru Rd, beside Rajmahal theatre, Kandukur',
    phone: '097042 29777',
    website: 'https://www.babudentalhospital.com',
    description: 'Dental care and oral health clinic with restorative, hygiene, and family dental services for everyday care needs.',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1538108149393-fbbd81895973?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'h11',
    name: 'Royal Multispeciality Hospital',
    categoryId: '2',
    categoryName: 'Hospitals',
    address: 'Ongole, Andhra Pradesh',
    phone: '08594-334455',
    website: 'https://www.royalmultispeciality.com',
    description: 'Multi-specialty hospital offering specialist consultations, diagnostics, and full-time treatment services for local and regional patients.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1538108149393-fbbd81895973?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'h12',
    name: 'Jaya bharath multispeciality hospital',
    categoryId: '2',
    categoryName: 'Hospitals',
    address: 'Kandukur, Andhra Pradesh',
    phone: '098661 16121',
    website: 'https://www.jayabharathhospital.com',
    description: 'Multi-specialty healthcare center offering emergency support, diagnostic services, and quality treatment for families in and around Kandukur.',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895973?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1538108149393-fbbd81895973?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'h13',
    name: 'Harini hospital',
    categoryId: '2',
    categoryName: 'Hospitals',
    address: '523105, 523105, Kandukur',
    phone: '098996 04693',
    website: 'https://www.harinihospital.com',
    description: 'Local hospital providing essential treatment, consultation, and family support services with a caring approach to patient health.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1538108149393-fbbd81895973?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'h14',
    name: 'Saahithi Multispeciality Hospital',
    categoryId: '2',
    categoryName: 'Hospitals',
    address: '6W73+W37, Kandukur',
    phone: '08594-98765',
    website: 'https://www.saahithihospital.com',
    description: 'Comprehensive multi-speciality treatment center delivering diagnosis, specialist care, and supportive recovery services.',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1538108149393-fbbd81895973?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'h15',
    name: 'Venkiah naidu child hospital and vaccination',
    categoryId: '2',
    categoryName: 'Hospitals',
    address: 'Kandukur - Gudluru Rd, Kandukur',
    phone: '08594-99876',
    website: 'https://www.venkaiahnaiduhospital.com',
    description: 'Child-focused healthcare and vaccination center devoted to pediatric wellness, immunization, and family care support.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1538108149393-fbbd81895973?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'h16',
    name: 'Dr Dhanyasi Malakondaiah Hospital',
    categoryId: '2',
    categoryName: 'Hospitals',
    address: '6W62+9P6, Kandukur',
    phone: '085982 22706',
    website: 'https://www.drdhanyasihospital.com',
    description: 'Primary healthcare and treatment center with routine care, diagnostics, and patient support for the local community.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1538108149393-fbbd81895973?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'h17',
    name: 'Mother hospital',
    categoryId: '2',
    categoryName: 'Hospitals',
    address: 'old LIC building, near government hospital, Kandukur',
    phone: '08594-112233',
    website: 'https://www.motherhospital.com',
    description: 'Community care hospital focused on general treatment, maternity support, and accessible healthcare for families.',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1538108149393-fbbd81895973?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'h18',
    name: 'New Life Hospital',
    categoryId: '2',
    categoryName: 'Hospitals',
    address: '6V8X+W9Q, Kandukur',
    phone: '08594-778899',
    website: 'https://www.newlifehospital.in',
    description: 'Patient-centered clinic offering general checkups, care services, and a dependable healthcare experience for the local community.',
    image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1538108149393-fbbd81895973?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'h19',
    name: 'SANKALPA HOSPITAL',
    categoryId: '2',
    categoryName: 'Hospitals',
    address: '10-2-72, 10-2-72, Kandukur',
    phone: '085982 95522',
    website: 'https://www.sankalpathospital.com',
    description: 'General and maternity healthcare service with compassionate doctors, emergency support, and focused family care.',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1538108149393-fbbd81895973?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'h20',
    name: 'Suraksha Hospital',
    categoryId: '2',
    categoryName: 'Hospitals',
    address: 'OV Rd, opposite Town Church, Kandukur',
    phone: '08594-99881',
    website: 'https://www.surakshahospital.in',
    description: 'Caring hospital with patient-focused treatment, medical consultations, and reliable support for emergency and family care.',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895973?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1538108149393-fbbd81895973?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'h21',
    name: 'Ajmal Hospital',
    categoryId: '2',
    categoryName: 'Hospitals',
    address: '6W65+C7C, hospital road, Kandukur',
    phone: '085982 3250',
    website: 'https://www.ajmalhospital.com',
    description: 'Family healthcare and hospital service known for attentive treatment, basic emergency support, and consistent patient care.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1538108149393-fbbd81895973?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'h22',
    name: 'District Government Hospital Kandukur',
    categoryId: '2',
    categoryName: 'Hospitals',
    address: '6W72+7HX, Kandukur',
    phone: '08594-224466',
    website: 'https://www.dghkandukur.com',
    description: 'Government healthcare center providing accessible public care, emergency support, and regular patient treatment services.',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1538108149393-fbbd81895973?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'm1',
    name: 'Keerthi Medical Stores',
    categoryId: '3',
    categoryName: 'Medical shops',
    address: 'Kandukur, Andhra Pradesh',
    phone: '094939 43418',
    website: 'https://www.keerthimedicalstores.com',
    description: 'A trusted medical supply store offering medicines, health essentials, and dependable local service for everyday needs.',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1538108149393-fbbd81895973?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'm2',
    name: 'MedPlus Ramalayam Street Kandukur',
    categoryId: '3',
    categoryName: 'Medical shops',
    address: 'Ramalayam Street, Kandukur',
    phone: '098765 43210',
    website: 'https://www.medplus.in',
    description: 'Pharmacy and health store with a broad range of medicines, personal care products, and fast in-store assistance.',
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'm3',
    name: 'Kandukur Medicals General Pharmacy',
    categoryId: '3',
    categoryName: 'Medical shops',
    address: 'Shop No 158, Near Bus Stand, Kandukur',
    phone: '090000 69622',
    website: 'https://www.kandukurmedicals.com',
    description: 'General pharmacy serving the community with essential medicines, healthcare products, and personalized assistance.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1538108149393-fbbd81895973?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'm4',
    name: 'Sai Rekha Generic Medicals Kandukur',
    categoryId: '3',
    categoryName: 'Medical shops',
    address: 'D, 20-4-98, Kandukur',
    phone: '088866 67713',
    website: 'https://www.sairekhageneric.com',
    description: 'Affordable generic medicines and daily health essentials with a focus on accessible and trusted care.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1538108149393-fbbd81895973?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'm5',
    name: 'RANGA MEDICAL STORES',
    categoryId: '3',
    categoryName: 'Medical shops',
    address: 'Kandukur, Andhra Pradesh',
    phone: '09800 345 1500',
    website: 'https://www.rangamedicalstores.com',
    description: 'Local medical retail outlet offering medicines and healthcare essentials with convenient community access.',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1538108149393-fbbd81895973?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'm6',
    name: 'Gouse Medical Shop',
    categoryId: '3',
    categoryName: 'Medical shops',
    address: 'Opp. Masjid Street, Kandukur',
    phone: '098842 73105',
    website: 'https://www.gousemedicalshop.com',
    description: 'Reliable neighborhood medical store with pharmacy essentials and prescribed medicines for family healthcare needs.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'm7',
    name: 'Apollo Pharmacy Kandukur',
    categoryId: '3',
    categoryName: 'Medical shops',
    address: 'Guptas Plaza, No. 20/2/27, Kandukur',
    phone: '08594-998877',
    website: 'https://www.apollopharmacy.in',
    description: 'Pharmacy store offering branded medicines, health supplements, and daily wellness products in a convenient setup.',
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'm8',
    name: 'Sri Shirdi Sai Medical Shop',
    categoryId: '3',
    categoryName: 'Medical shops',
    address: 'Old Bank St, Kandukur',
    phone: '090108 63963',
    website: 'https://www.srishirdisaimedicalshop.com',
    description: 'Medical store known for dependable availability of medicines, wellness products, and quick local support.',
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'm9',
    name: 'JAYABHARATH PHARMACY',
    categoryId: '3',
    categoryName: 'Medical shops',
    address: 'Pamuru Rd, Kandukur',
    phone: '08594-112233',
    website: 'https://www.jayabharathpharmacy.com',
    description: 'A reliable neighborhood pharmacy serving families with essential medicines and regular health supplies.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1538108149393-fbbd81895973?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'm10',
    name: 'DV MEDICAL AGENCIES',
    categoryId: '3',
    categoryName: 'Medical shops',
    address: 'Kanikirri Rd, opp. Corporation ATM, Kandukur',
    phone: '099949 007676',
    website: 'https://www.dvmedicalagencies.com',
    description: 'Medical agency and supply point known for dependable medicines and prompt service for local customers.',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895973?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1538108149393-fbbd81895973?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'm11',
    name: 'SREE RAMA MEDICAL AND FANCY',
    categoryId: '3',
    categoryName: 'Medical shops',
    address: '6W73+J6J, Pamuru Rd, Kandukur',
    phone: '08594-887799',
    website: 'https://www.sreeramamedicalandfancy.com',
    description: 'Medical and fancy store serving the community with regular pharmaceutical needs and household essentials.',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1538108149393-fbbd81895973?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'm12',
    name: 'MedPlus Lvpai Kandukur',
    categoryId: '3',
    categoryName: 'Medical shops',
    address: 'S.V. No. 787, LVPai, Kandukur',
    phone: '08594-889900',
    website: 'https://www.medplus.in',
    description: 'Convenient local pharmacy with a range of medicines, healthcare items, and family wellness support.',
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1538108149393-fbbd81895973?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'm13',
    name: 'Venkata Ravi Medical & General Stores',
    categoryId: '3',
    categoryName: 'Medical shops',
    address: '6W86+VM2, Kandukur',
    phone: '099121 26156',
    website: 'https://www.venkataravimedical.com',
    description: 'General stores and medical supply outlet providing daily healthcare essentials and trusted assistance.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1538108149393-fbbd81895973?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'm14',
    name: 'Ravi medical shop',
    categoryId: '3',
    categoryName: 'Medical shops',
    address: '12-5-1, Kandukur',
    phone: '08594-223344',
    website: 'https://www.ravimedicalshop.com',
    description: 'Local pharmacy outlet offering quality medicines, healthcare items, and prompt neighborhood availability.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'm15',
    name: 'Somisetty Venkateswarulu medicals',
    categoryId: '3',
    categoryName: 'Medical shops',
    address: 'Old Bank St, Kandukur',
    phone: '098487 50271',
    website: 'https://www.somisettyvenkateswarulumedicals.com',
    description: 'Trusted pharmacy store with a wide range of Ayurvedic and general medicines for family care and routine treatment.',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1538108149393-fbbd81895973?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'm16',
    name: 'Sri sai srinivasa medical and fancy',
    categoryId: '3',
    categoryName: 'Medical shops',
    address: '6W62+VQG, Kandukur',
    phone: '08594-887766',
    website: 'https://www.srisaisrinivasamedical.com',
    description: 'Community pharmacy offering medical essentials, supplementary items, and dependable service in the local area.',
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'm17',
    name: 'SARADA MEDICALS',
    categoryId: '3',
    categoryName: 'Medical shops',
    address: '12-5-40/1, Old Bank St, Kandukur',
    phone: '098491 23646',
    website: 'https://www.saradamedicals.com',
    description: 'Medical retail shop known for regular pharmacy supplies, quick service, and experienced community support.',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'm18',
    name: 'RANGA MEDICALS',
    categoryId: '3',
    categoryName: 'Medical shops',
    address: 'Shop 8, OV Rd, Kandukur',
    phone: '099492 35545',
    website: 'https://www.rangamedicals.com',
    description: 'Focused medical store serving local households with everyday medications and trusted health care products.',
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1538108149393-fbbd81895973?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'm19',
    name: 'Anand Medical Shop',
    categoryId: '3',
    categoryName: 'Medical shops',
    address: 'Palukur, Andhra Pradesh',
    phone: '08594-778899',
    website: 'https://www.anandmedicalshop.com',
    description: 'Dependable medical sales outlet with a steady range of medicines and essential healthcare supplies.',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 's1',
    name: 'Zilla Parishad High School, Kandukur',
    categoryId: 'edu-5',
    categoryName: 'Schools',
    address: 'Near Government Hospital, Kandukur',
    phone: '08594-250298',
    website: 'https://www.zphs.com',
    description: 'A trusted local high school providing quality education and a supportive environment for students from class 6 to class 10.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'ms1',
    name: 'Sri Lakshmi Medicals',
    categoryId: '3',
    categoryName: 'Medical shops',
    address: 'Kandukur Market Road',
    phone: '08594-250112',
    website: 'https://www.srilakshmimedicines.com',
    description: 'Reliable local pharmacy stocking prescription medicines, wellness products and everyday health essentials for the community.',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 't1',
    name: 'Lord Venkateswara Temple',
    categoryId: '10',
    categoryName: 'Temples',
    address: 'Temple Road, Kandukur',
    phone: '08594-250880',
    website: 'https://www.templesofandhra.com',
    description: 'A vibrant temple devoted to Lord Venkateswara with daily prayers, spiritual gatherings and major festival celebrations.',
    image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80'
    ]
  },
  {
    id: 'r1',
    name: 'Sai Sagar Grand Family Dining',
    categoryId: '4',
    categoryName: 'Restaurants',
    address: 'New Bus Stand Road, Kandukur',
    phone: '08594-250333',
    website: 'https://www.saisagarrestaurant.in',
    description: 'A family-friendly restaurant serving Andhra meals, biryani, South Indian favourites and fresh vegetarian specialties.',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80'
    ]
  }
]
