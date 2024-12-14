import React from 'react';

interface HeaderCardProps {
    title: string;
    value: string | number;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    bgColor?: string;
    textColor?: string;
}

const HeaderCard: React.FC<HeaderCardProps> = ({
    title,
    value,
    icon: Icon,
    bgColor = '#243325',
    textColor = 'text-white',
}) => {
    return (
        <div style={{ backgroundColor: bgColor }} className={`flex items-center p-6 rounded-lg shadow-md `}>
            <Icon className="w-8 h-8  self-start" />

            <div className="ml-4">
                <h3 className={`text-sm font-semibold  uppercase ${textColor}`}>{title}</h3>
                <p className={`text-3xl font-bold ${textColor}`}>{value}</p>
            </div>
        </div>
    );
};

export default HeaderCard;
