export interface Donation {
  id: number;
  item: string;
  category: string;
  donorName: string;
  quantity?: string;
  address: string;
  location: string;
  image?: string;
  status: 'Available' | 'Pending' | 'Picked Up' | 'Delivered';
  date: string;
}

export interface RequestedItem {
  id: string;
  name: string;
  donor: string;
  location: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface AssignedTask {
  id: string;
  name: string;
  pickup: string;
  delivery: string;
  route: string;
}
