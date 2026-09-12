const Header = ({ language }) => {
  const isMalayalam = language === 'malayalam';

  return (
    <header className="text-center mb-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600 drop-shadow-md tracking-tight">
        {isMalayalam ? '😂 എന്റെ പൊന്നു അളിയാ' : '😂 ENTE PONNU ALIYA'}
      </h1>
      <h2 className="text-xl md:text-2xl font-bold text-slate-300 mb-4 tracking-wide">
        {isMalayalam ? 'നിന്റെ സ്വന്തം ചങ്ക്' : 'Your Savage Best Friend'}
      </h2>
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 inline-block shadow-lg">
        <p className="text-lg font-medium text-orange-200 mb-1">
          {isMalayalam ? '"പറയെടാ മോനെ... എന്താ സീൻ?"' : '"Parayeda mone... entha scene?"'}
        </p>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          {isMalayalam
            ? 'നിന്റെ പ്രശ്നം പറ. ഞാൻ അതൊരു പാട്ടാക്കി നിന്നെ റോസ്റ്റ് ചെയ്യാം, എന്നിട്ട് മോട്ടിവേറ്റ് ചെയ്യാം.'
            : "Tell me your problem. I'll turn it into a song and roast you before I motivate you."}
        </p>
      </div>
    </header>
  );
};

export default Header;
