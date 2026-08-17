const images: Record<string, string> = {
  'Hospitals & Clinics': 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80',
  'Medical shops': 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=80',
  'Restaurants': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
  'Food Hotels': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
  'Education': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
  'Engineering colleges': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
  'Degree colleges': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
  'Polytechnic colleges': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
  'Schools': 'https://images.unsplash.com/photo-1517486808906-6ca8b3d0b8df?auto=format&fit=crop&w=1200&q=80',
  'Lodges': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
  'Bus stand': 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
  'Police station': 'https://images.unsplash.com/photo-1526481280698-9e25f9dbea8b?auto=format&fit=crop&w=1200&q=80',
  'Theaters': 'https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=1200&q=80',
  'Movie Theaters': 'https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=1200&q=80',
  'Banks': 'https://images.unsplash.com/photo-1522204502412-6f0f0a8d2d3b?auto=format&fit=crop&w=1200&q=80',
  'Beauty clinics': 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
  'Shopping clothes': 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80',
  'Retail marts': 'https://images.unsplash.com/photo-1601598851547-4302969d0614?auto=format&fit=crop&w=1200&q=80',
  'Wine shops': 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
  'Jewellery shops': 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=80',
  'RealEstate': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
  'ATM machines': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80',
  'Common Utilities': 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
  'Buy & Sell': 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80',
  'Cars for Sale': 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80',
  'Bikes for Sale': 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80',
  'Tractors for Sale': 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c6b41?auto=format&fit=crop&w=1200&q=80',
  'ATM Centers': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80',
  'Petrol Pumps': 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=1200&q=80',
  'Gas Centers': 'https://images.unsplash.com/photo-1524159730786-939d4c6e8f6a?auto=format&fit=crop&w=1200&q=80',
  'EV Charging Stations': 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=1200&q=80',
  'Agricultural info': 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80',
  'Tobacoco Boards': 'https://images.unsplash.com/photo-1523742810-6d6a13f3f6a5?auto=format&fit=crop&w=1200&q=80',
  'Vegitable Market': 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
  'Fish Market': 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=1200&q=80',
  'Real Estate': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
  Agriculture: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80',
  'Food & Meat Markets': 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
  'Rental Transport': 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80',
  'Tourist Places': 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80',
  'Rental Houses': 'https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=1200&q=80',
  'Construction Materials': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
  'Government Offices': 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
  'Cold Storages': 'https://images.unsplash.com/photo-1586528116493-da8b3f9d4c3c?auto=format&fit=crop&w=1200&q=80',
  'Manpower Services': 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
  'Show Rooms': 'https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?auto=format&fit=crop&w=1200&q=80',
  'Bike & Car Mechanics': 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1200&q=80',
  'Training Institutions': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
  'Computer Training': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
  'Spoken English': 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
  'Driving Schools': 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80',
  'Skill Development': 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
  // Shops & Local Businesses
  'Book Stores': 'https://images.unsplash.com/photo-150784272343-583f20270319?auto=format&fit=crop&w=1200&q=80',
  'Photo Studios': 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80',
  'Courier Services': 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1200&q=80',
  'Kids Toys & Cycles': 'https://images.unsplash.com/photo-1633185032649-8e0718bcad0d?auto=format&fit=crop&w=1200&q=80',
  'Vehicle Battery Shops': 'https://images.unsplash.com/photo-1486501046311-41f0e6370e1f?auto=format&fit=crop&w=1200&q=80',
  'Key & Lock Repair': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
  'Painting & Hardware': 'https://images.unsplash.com/photo-1579884838548-f3e3c1e1e4f0?auto=format&fit=crop&w=1200&q=80',
  'Dry Fruit Stores': 'https://images.unsplash.com/photo-1585515207836-b3f86e599e0c?auto=format&fit=crop&w=1200&q=80',
  'Mobile & Accessories': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
  'Fireworks & Crackers': 'https://images.unsplash.com/photo-1519451241446-180cf6fabf4a?auto=format&fit=crop&w=1200&q=80',
  'Iron & Grill Suppliers': 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?auto=format&fit=crop&w=1200&q=80',
  'Clothing & Tailors': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
  // Home & Technical Services
  'Carpentry Services': 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
  'AC Services': 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=1200&q=80',
  'Washing Machine Repair': 'https://images.unsplash.com/photo-1587974007375-cd277c2a9e38?auto=format&fit=crop&w=1200&q=80',
  'Event Caterers': 'https://images.unsplash.com/photo-1555244637-c5d96dbf3e66?auto=format&fit=crop&w=1200&q=80',
  'WiFi & Internet Services': 'https://images.unsplash.com/photo-1600585152915-d92dbb6b0db0?auto=format&fit=crop&w=1200&q=80',
  'Tractor Mechanics': 'https://images.unsplash.com/photo-1574444847212-c3d71556f55e?auto=format&fit=crop&w=1200&q=80',
  // Government & Public Services
  'MeeSeva Centers': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
  'Aadhaar Centers': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
  'Sachivalayams': 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
  'Court & Legal Services': 'https://images.unsplash.com/photo-1589829085046-3d562c2a2b9c?auto=format&fit=crop&w=1200&q=80',
  'Electricity & Water Offices': 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=1200&q=80',
  // Education & Training
  'Sports Coaching': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
  'Tuition Centers': 'https://images.unsplash.com/photo-1427504494785-cdec0f72edd9?auto=format&fit=crop&w=1200&q=80',
  'Dance Academies': 'https://images.unsplash.com/photo-1547220328-3bab663a76ad?auto=format&fit=crop&w=1200&q=80',
  // Travel & Transport
  'APSRTC Bus Stand': 'https://images.unsplash.com/photo-1570647788417-0f82fb18a6be?auto=format&fit=crop&w=1200&q=80',
  'Private Travels': 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?auto=format&fit=crop&w=1200&q=80',
  'Railway Station': 'https://images.unsplash.com/photo-1570649831066-22d50c50bed2?auto=format&fit=crop&w=1200&q=80',
  // Religious & Miscellaneous
  'Priests & Poojaris': 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=1200&q=80',
  'Swimming Pools': 'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?auto=format&fit=crop&w=1200&q=80',
  'Other Services': 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
  // Tourism & Attractions
  'Ramayapatnam Beach': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  'Pakala Lake': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
  'Etha Mokkala': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
  'Chirala Beach': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  // Finance & Utilities
  'Banks & ATMs': 'https://images.unsplash.com/photo-1556740729-b8a9ad5cb316?auto=format&fit=crop&w=1200&q=80',
  'Insurance Offices': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
  // Parent Categories
  'Shops & Local Businesses': 'https://images.unsplash.com/photo-1555636222-cae831c7a47f?auto=format&fit=crop&w=1200&q=80',
  'Home & Technical Services': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  'Government & Public Services': 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
  'Education & Training': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
  'Travel & Transport': 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80',
  'Religious & Miscellaneous': 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=1200&q=80',
  'Tourism & Attractions': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
  'Finance & Utilities': 'https://images.unsplash.com/photo-1556740729-b8a9ad5cb316?auto=format&fit=crop&w=1200&q=80',
}

const defaultImage = 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'

export function getCategoryImage(categoryName?: string) {
  if (!categoryName) return defaultImage
  return images[categoryName] || defaultImage
}

export function getBusinessImage(image: unknown, categoryName?: string) {
  if (typeof image === 'number') return image
  if (typeof image === 'string' && image.startsWith('http')) return { uri: image }
  return { uri: getCategoryImage(categoryName) }
}

export default getCategoryImage
