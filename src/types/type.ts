// User Types
export interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: 'Customer' | 'Agent' | 'Admin';
    avatar?: string;
    dateOfBirth?: string;
    gender?: 'Male' | 'Female' | 'Other';
    createdAt: string;
    updatedAt: string;
}

// Address Type
export interface Address {
    house: string;
    street: string;
    area: string;
    city: string;
    district: string;
    division: string;
    postalCode?: string;
    coordinates?: {
        latitude: number;
        longitude: number;
    };
}

// Location Type
export interface Location {
    latitude: number;
    longitude: number;
}

// Parcel Types
export interface Parcel {
    _id: string;
    customerId: string | User;
    agentId?: string | User;
    pickupAddress: Address;
    deliveryAddress: Address;
    parcelSize: string;
    paymentType: 'COD' | 'Prepaid';
    status: 'Pending' | 'Picked Up' | 'In Transit' | 'Delivered' | 'Failed';
    currentLocation: Location;
    trackingNumber?: string;
    qrCode?: string;
    createdAt: string;
    updatedAt: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    phone: string;
    password: string;
    dateOfBirth?: string;
    role?: 'Customer' | 'Agent' | 'Admin';
    gender?: 'male' | 'female' | 'other';
    avatar: string;
}

export interface AuthState {
    user: AuthResponse | null;
    loading: boolean;
    error: any;
}

// API Response Types
export interface AuthResponse {
    _id: string;
    name: string;
    email: string;
    phone: string;
    dateOfBirth?: string;
    role?: 'Customer' | 'Agent' | 'Admin';
    gender?: 'male' | 'female' | 'other';
    token: string;
}

export interface ApiError {
    message: string;
    status?: number;
}

// Form Types
export interface ParcelFormData {
    pickupAddress: Address;
    deliveryAddress: Address;
    parcelSize: string;
    paymentType: 'COD' | 'Prepaid';
    codAmount?: number;
}

export interface StatusUpdateData {
    status: Parcel['status'];
    latitude: number;
    longitude: number;
}

// Dashboard Types
export interface DashboardStats {
    totalParcels: number;
    pendingParcels: number;
    deliveredParcels: number;
    failedParcels: number;
    totalCOD: number;
    totalRevenue: number;
}

// Socket Types
export interface SocketParcelUpdate {
    parcelId: string;
    status: Parcel['status'];
    currentLocation: Location;
}

// Route Types
export interface RouteParams {
    id?: string;
    trackingNumber?: string;
}

// Component Props Types
export interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: User['role'][];
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

export interface TableColumn<T> {
    key: keyof T | string;
    label: string;
    render?: (item: T) => React.ReactNode;
    sortable?: boolean;
}

// Utility Types
export type ParcelStatus = Parcel['status'];
export type UserRole = User['role'];
export type PaymentType = Parcel['paymentType'];

// Form Validation Types
export interface FieldError {
    type: string;
    message: string;
}

export interface FormErrors {
    [key: string]: FieldError | undefined;
}

// Constants Types
export const PARCEL_SIZES = ['Small', 'Medium', 'Large', 'Extra Large'] as const;
export const BANGLADESH_DIVISIONS = [
    'Dhaka', 'Chittagong', 'Rajshahi', 'Khulna',
    'Barisal', 'Sylhet', 'Rangpur', 'Mymensingh'
] as const;

export type ParcelSize = typeof PARCEL_SIZES[number];
export type BangladeshDivision = typeof BANGLADESH_DIVISIONS[number];