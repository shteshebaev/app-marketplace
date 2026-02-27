export interface DeveloperSocialLinks {
    website?: string;
    telegram?: string;
    vk?: string;
    linkedin?: string;
    github?: string;
}

export interface DeveloperContact {
    email: string;
    phone?: string;
    address?: string;
}

export interface Developer {
    id: string;
    slug: string;
    companyName: string;
    logo?: string;
    description: string;
    aboutCompany: string;
    foundedYear?: number;
    employeesCount?: string;
    rating: number;
    reviewsCount: number;
    productsCount: number;
    clientsCount: number;
    contact: DeveloperContact;
    socialLinks: DeveloperSocialLinks;
    isVerified: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface DeveloperStats {
    totalViews: number;
    totalClicks: number;
    totalInquiries: number;
    ctr: number;
    viewsByProduct: Record<string, number>;
    viewsByDay: { date: string; views: number }[];
    topProducts: { id: string; name: string; views: number }[];
}
