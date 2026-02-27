import { useState, useEffect, useCallback } from 'react';

interface UseProductNavResult {
    activeSection: string;
    isSticky: boolean;
    showCTA: boolean;
    scrollToSection: (sectionId: string) => void;
}

export function useProductNav(): UseProductNavResult {
    const [activeSection, setActiveSection] = useState('overview');
    const [isSticky, setIsSticky] = useState(false);
    const [showCTA, setShowCTA] = useState(false);

    useEffect(() => {
        const sections = document.querySelectorAll('[data-section]');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.getAttribute('data-section') || 'overview');
                    }
                });
            },
            {
                rootMargin: '-80px 0px -60% 0px',
                threshold: 0.1
            }
        );

        sections.forEach((section) => {
            observer.observe(section);
        });

        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsSticky(scrollY > 400);
            setShowCTA(scrollY > 600);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToSection = useCallback((sectionId: string) => {
        const element = document.querySelector(`[data-section="${sectionId}"]`);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth'
            });
        }
    }, []);

    return { activeSection, isSticky, showCTA, scrollToSection };
}
