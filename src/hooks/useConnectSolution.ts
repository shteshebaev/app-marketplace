import { useCallback } from 'react';
import { useConnect, type ProductToConnect, type ProductPlan } from '../context/ConnectContext';
import type { Solution } from '../components/solutions/types';

// Mock plans generator based on solution price
function generatePlansForSolution(solution: Solution): ProductPlan[] {
    const basePrice = parseInt(solution.price.replace(/\s/g, '')) || 0;

    if (basePrice === 0) {
        return [{
            id: `${solution.id}-free`,
            name: 'Бесплатный',
            price: 0,
            period: 'monthly',
            features: [
                'Базовый функционал',
                'До 3 пользователей',
                'Техподдержка по email',
                'Обновления'
            ],
            isFree: true
        }];
    }

    return [
        {
            id: `${solution.id}-starter`,
            name: 'Стартовый',
            price: basePrice,
            period: 'monthly',
            features: [
                'Базовый функционал',
                'До 5 пользователей',
                'Техподдержка по email',
                'Обновления'
            ]
        },
        {
            id: `${solution.id}-pro`,
            name: 'Профессиональный',
            price: Math.round(basePrice * 2),
            period: 'monthly',
            features: [
                'Расширенный функционал',
                'До 20 пользователей',
                'Приоритетная поддержка',
                'API доступ',
                'Аналитика'
            ],
            isPopular: true
        },
        {
            id: `${solution.id}-enterprise`,
            name: 'Корпоративный',
            price: Math.round(basePrice * 5),
            period: 'monthly',
            features: [
                'Полный функционал',
                'Неограниченные пользователи',
                'Выделенный менеджер',
                'SLA 99.9%',
                'Кастомизация',
                'Интеграции'
            ]
        }
    ];
}

export function useConnectSolution() {
    const { initiateConnect } = useConnect();

    const connectSolution = useCallback((solution: Solution) => {
        const productToConnect: ProductToConnect = {
            id: solution.id,
            name: solution.name,
            developerName: solution.targetAudience || 'Разработчик',
            gradient: solution.gradient,
            plans: generatePlansForSolution(solution)
        };

        initiateConnect(productToConnect);
    }, [initiateConnect]);

    return { connectSolution };
}
