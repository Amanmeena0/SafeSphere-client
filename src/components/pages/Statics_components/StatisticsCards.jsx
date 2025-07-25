import { TrendingUp, TrendingDown, AlertTriangle, Users } from 'lucide-react';
import PropTypes from 'prop-types';

const StatisticsCards = ({ statistics }) => {
    const cards = [
        {
            title: 'Total Crimes',
            value: statistics.totalCrimes.toLocaleString(),
            icon: AlertTriangle,
            color: 'text-red-600',
            bgColor: 'bg-red-50',
            borderColor: 'border-red-200'
        },
        {
            title: 'Most Common Crime',
            value: statistics.mostCommonCrime || 'N/A',
            icon: TrendingUp,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50',
            borderColor: 'border-orange-200'
        },
        {
            title: 'Most Affected State',
            value: statistics.mostAffectedState || 'N/A',
            icon: Users,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
            borderColor: 'border-purple-200'
        },
        {
            title: 'Peak Year',
            value: statistics.yearWithHighestCrimes || 'N/A',
            icon: TrendingDown,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200'
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className={`p-6 rounded-xl border ${card.borderColor} ${card.bgColor} transition-all duration-200 hover:shadow-lg hover:scale-105`}
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className={`p-2 rounded-lg ${card.bgColor} ${card.color}`}>
                            <card.icon className="w-6 h-6" />
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                        <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

StatisticsCards.propTypes = {
    statistics: PropTypes.shape({
        totalCrimes: PropTypes.number.isRequired,
        mostCommonCrime: PropTypes.string,
        mostAffectedState: PropTypes.string,
        yearWithHighestCrimes: PropTypes.string,
    }).isRequired,
};

export default StatisticsCards;
