import { AlertCircle, Map, Target, Calendar } from 'lucide-react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const StatisticsCards = ({ statistics }) => {
    const cards = [
        {
            title: 'Aggregate Crime Volume',
            value: statistics.totalCrimes.toLocaleString(),
            icon: AlertCircle,
            color: 'text-red-400',
            glowColor: 'bg-red-500/20',
            borderColor: 'border-red-500/30',
            desc: 'Cumulative recorded IPC incidents'
        },
        {
            title: 'Primary Crime Vector',
            value: statistics.mostCommonCrime || 'N/A',
            icon: Target,
            color: 'text-amber-400',
            glowColor: 'bg-amber-500/20',
            borderColor: 'border-amber-500/30',
            desc: 'Highest frequency classification'
        },
        {
            title: 'Critical Risk Sector',
            value: statistics.mostAffectedState || 'N/A',
            icon: Map,
            color: 'text-blue-400',
            glowColor: 'bg-blue-500/20',
            borderColor: 'border-blue-500/30',
            desc: 'Region with highest reported density'
        },
        {
            title: 'Peak Intensity Period',
            value: statistics.yearWithHighestCrimes || 'N/A',
            icon: Calendar,
            color: 'text-indigo-400',
            glowColor: 'bg-indigo-500/20',
            borderColor: 'border-indigo-500/30',
            desc: 'Year of maximum activity recording'
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {cards.map((card, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative p-8 rounded-[32px] border ${card.borderColor} bg-white dark:bg-slate-900/40 backdrop-blur-md shadow-sm dark:shadow-none group hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all duration-500 overflow-hidden`}
                >
                    {/* Background Glow */}
                    <div className={`absolute -right-4 -top-4 w-24 h-24 ${card.glowColor} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-8">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 group-hover:border-slate-300 dark:group-hover:border-slate-500 transition-colors shadow-inner`}>
                                <card.icon className={`w-6 h-6 ${card.color}`} />
                            </div>
                            {/* Pulse Indicator */}
                            <div className="flex gap-1">
                                <span className={`w-1 h-1 rounded-full ${card.color} animate-pulse`}></span>
                                <span className={`w-1 h-1 rounded-full ${card.color} animate-pulse delay-75`}></span>
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">{card.title}</p>
                            <h3 className={`text-2xl font-black ${card.color} tracking-tight break-words`}>
                                {card.value}
                            </h3>
                            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/50">
                                <p className="text-xs font-medium text-slate-400 dark:text-slate-500 italic leading-relaxed">
                                    {card.desc}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Corner Accent */}
                    <div className={`absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-br from-transparent to-slate-100 dark:to-slate-800/10 rounded-tl-3xl`}></div>
                </motion.div>
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
