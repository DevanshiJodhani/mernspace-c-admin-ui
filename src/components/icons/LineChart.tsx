const LineChart = () => {
  return (
    <svg
      width="100%"
      height="260"
      viewBox="0 0 700 260"
      xmlns="http://www.w3.org/2000/svg">
      <g stroke="#D1D5DB" strokeDasharray="4 4" strokeWidth="1">
        <line x1="60" y1="40" x2="680" y2="40" />
        <line x1="60" y1="90" x2="680" y2="90" />
        <line x1="60" y1="140" x2="680" y2="140" />
        <line x1="60" y1="190" x2="680" y2="190" />

        <line x1="60" y1="40" x2="60" y2="210" />
        <line x1="160" y1="40" x2="160" y2="210" />
        <line x1="260" y1="40" x2="260" y2="210" />
        <line x1="360" y1="40" x2="360" y2="210" />
        <line x1="460" y1="40" x2="460" y2="210" />
        <line x1="560" y1="40" x2="560" y2="210" />
        <line x1="680" y1="40" x2="680" y2="210" />
      </g>

      <g fill="#6B7280" fontSize="12" textAnchor="end">
        <text x="50" y="195">
          ₹ 10 000
        </text>
        <text x="50" y="145">
          ₹ 20 000
        </text>
        <text x="50" y="95">
          ₹ 30 000
        </text>
      </g>

      {/* X Axis labels */}
      <g fill="#6B7280" fontSize="12" textAnchor="middle">
        <text x="160" y="235">
          1 Jan
        </text>
        <text x="260" y="235">
          2 Jan
        </text>
        <text x="360" y="235">
          3 Jan
        </text>
        <text x="460" y="235">
          4 Jan
        </text>
        <text x="560" y="235">
          5 Jan
        </text>
        <text x="680" y="235">
          6 Jan
        </text>
      </g>

      <path
        d="
          M60 150
          C140 200, 200 190, 260 160
          S360 90, 460 120
          S560 160, 680 80
        "
        fill="none"
        stroke="#F97316"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="
          M60 150
          C140 200, 200 190, 260 160
          S360 90, 460 120
          S560 160, 680 80
        "
        fill="none"
        stroke="#FDBA74"
        strokeWidth="6"
        opacity="0.3"
      />

      {/* Points */}
      <g fill="#F97316">
        <circle cx="60" cy="150" r="4" />
        <circle cx="160" cy="180" r="4" />
        <circle cx="260" cy="160" r="4" />
        <circle cx="360" cy="110" r="4" />
        <circle cx="460" cy="120" r="4" />
        <circle cx="560" cy="150" r="4" />
        <circle cx="680" cy="80" r="4" />
      </g>
    </svg>
  );
};

export default LineChart;
