const images: Record<string, string> = {
  'Hospitals': 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80',
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
