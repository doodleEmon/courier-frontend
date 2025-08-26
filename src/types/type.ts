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
export interface Location {
    latitude: number;
    longitude: number;
}

export interface TrackingHistoryEntry {
    status: Parcel['status'];
    location?: Location;
    timestamp?: string;
}

// Parcel Types
export interface Parcel {
    _id: string;
    customerId: string | User;
    agentId: string | User;
    recipientName: string;
    recipientPhone: string;
    pickupAddress: string;
    deliveryAddress: string;
    parcelSize: string;
    parcelType: string;
    paymentType: 'COD' | 'Prepaid';
    status: 'Pending' | 'Picked Up' | 'In Transit' | 'Delivered' | 'Failed';
    description: string;
    currentLocation: Location;
    trackingNumber?: string;
    qrCode?: string;
    createdAt: string;
    updatedAt: string;
    trackingHistory: TrackingHistoryEntry[];
}

export interface ParcelState {
    parcels: Parcel[];
    loading: boolean;
    error: string | null;
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
    error: unknown;
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

export interface CreateParcel {
    pickupAddress: string;
    deliveryAddress: string;
    parcelSize: 'Small' | 'Medium' | 'Large';
    parcelType: string;
    paymentType: 'COD' | 'Prepaid';
}

export interface ParcelFormData {
    pickupAddress: string;
    deliveryAddress: string;
    parcelSize: string;
    parcelType: string;
    paymentType: 'COD' | 'Prepaid';
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

export interface RouteStep {
    html_instructions: string;
    distance: { text: string; value: number };
    duration: { text: string; value: number };
    end_location: { lat: number; lng: number };
    start_location: { lat: number; lng: number };
    travel_mode: string;
}

export interface OptimizedRoute {
    route: {
        summary: string;
        legs: Array<{ steps: RouteStep[] }>;
    };
    parcels: Parcel[];
}

// Component Props Types
export interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: User['role'][];
}

export interface ConfirmModalProps {
    isOpen: boolean;
    title?: string;
    description?: string;
    onConfirm: () => void;
    onCancel: () => void;
}