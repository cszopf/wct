
import React, { useState } from 'react';
import { Mail, Phone, ExternalLink, Eye } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  category: string;
  img?: string;
  email?: string;
  phone?: string;
}

const TeamSection: React.FC = () => {
  const [revealedPhones, setRevealedPhones] = useState<Record<string, boolean>>({});

  const togglePhone = (name: string) => {
    setRevealedPhones(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const domain = "@worldclasstitle.com";

  const team: TeamMember[] = [
    // Funding Team
    { 
      name: "Kelley Shumaker", 
      role: "Co-Owner | Funding Manager", 
      category: "Funding Team", 
      email: `kelley${domain}`, 
      img: "https://www.dropbox.com/scl/fi/zj1zailzod2xanlpic853/Screenshot-2026-02-15-at-9.33.37-AM.png?rlkey=4rg4zhn1e9z4fqrvf3xpcq07f&st=cw7na7kz&dl=1" 
    },
    { 
      name: "Jennifer Winstanley", 
      role: "Funding Manager", 
      category: "Funding Team", 
      email: `jenn${domain}`, 
      img: "https://www.dropbox.com/scl/fi/m48rihrnihms6yjlxqxtj/Screenshot-2026-02-15-at-9.33.43-AM.png?rlkey=gq76tews9z7unjq5p071z239o&st=078wfb82&dl=1" 
    },

    // Title Team
    { 
      name: "Jacqueline Gainer", 
      role: "Title Manager", 
      category: "Title Team", 
      email: `jacqueline${domain}`, 
      img: "https://www.dropbox.com/scl/fi/hlvz9cuwfjdowu2syudtx/Screenshot-2026-02-15-at-9.33.51-AM.png?rlkey=l8va47z2bze26dao1u1bm21wz&st=ntih4rpi&dl=1" 
    },
    { 
      name: "Stephanie Arbaugh", 
      role: "Title Administrator", 
      category: "Title Team", 
      email: `stephanie${domain}`, 
      img: "https://www.dropbox.com/scl/fi/yzcipapkx9qcoyzctv1mk/Screenshot-2026-02-15-at-9.33.55-AM.png?rlkey=m7aajb87r02ldzf943vfd71eg&st=94zmzlf3&dl=1" 
    },
    { 
      name: "Cheyanne Counts", 
      role: "Title Processor", 
      category: "Title Team", 
      email: `cheyanne${domain}`, 
      img: "https://www.dropbox.com/scl/fi/mw9ftxzbqreojj3nskhy1/Screenshot-2026-02-15-at-9.34.00-AM.png?rlkey=60lj4giemk8tcuxapyp46e7va&st=t20d8ee2&dl=1" 
    },
    { 
      name: "Gracie Gessner", 
      role: "Title Processor", 
      category: "Title Team", 
      email: `gracie${domain}`, 
      img: "https://www.dropbox.com/scl/fi/w8qf447c6u4o86s81ilub/Screenshot-2026-02-15-at-9.34.05-AM.png?rlkey=3vdat50qcd10kjd0lu808qjw7&st=2vojascy&dl=1" 
    },
    { 
      name: "Jen Good", 
      role: "Title Processor", 
      category: "Title Team", 
      email: `jgood${domain}`, 
      img: "https://www.dropbox.com/scl/fi/mdsehpa6cq9t6dlnjhmtx/Screenshot-2026-02-15-at-9.34.09-AM.png?rlkey=y7btqdhageb9a5oma0t212et6&st=80ell86h&dl=1" 
    },

    // Closing Team
    { 
      name: "Leslie Arndt", 
      role: "Closing Manager", 
      category: "Closing Team", 
      email: `leslie${domain}`, 
      img: "https://www.dropbox.com/scl/fi/zvcnkdkyabv0htcgivf0n/Screenshot-2026-02-15-at-9.34.13-AM.png?rlkey=j47jjlh4u9ba3z8crr20v9n10&st=ucexjw7p&dl=1" 
    },
    { 
      name: "Chanda Worthington", 
      role: "Escrow Officer", 
      category: "Closing Team", 
      email: `chanda${domain}`, 
      img: "https://www.dropbox.com/scl/fi/yryjf91yhoybg8b4srisv/Screenshot-2026-02-15-at-9.34.27-AM.png?rlkey=rzd1k2wa8rjmqpn7ee9tiex4t&st=mtngw46r&dl=1" 
    },
    { 
      name: "Mara LeVeck", 
      role: "Escrow Officer", 
      category: "Closing Team", 
      email: `mara${domain}`, 
      img: "https://www.dropbox.com/scl/fi/7yc9c7skd61mqzvhptbn9/Screenshot-2026-02-15-at-9.34.17-AM.png?rlkey=a1azz0agqzmjnq7apyvpdhvg4&st=8jbkjzt2&dl=1" 
    },
    { 
      name: "Delaney Clark", 
      role: "Post Closing Coordinator", 
      category: "Closing Team", 
      email: `delaney${domain}`, 
      img: "https://www.dropbox.com/scl/fi/hgf387c192ep780fomi79/Screenshot-2026-02-15-at-9.34.31-AM.png?rlkey=rglr597vpdrlnmgugx3mmc1l1&st=v9i5jp9a&dl=1" 
    },
    { 
      name: "Brandon Woerner", 
      role: "Escrow Officer", 
      category: "Closing Team", 
      email: `brandon${domain}`, 
      img: "https://www.dropbox.com/scl/fi/pmg7fckjvla014yg08rft/Screenshot-2026-02-15-at-9.34.21-AM.png?rlkey=ujhmpuhvh511sg5qmcmtmozde&st=j16euw32&dl=1" 
    },

    // Sales Team
    { 
      name: "Chris Sauerzopf", 
      role: "Co-Owner | Sales Manager", 
      category: "Sales Team", 
      email: `chris${domain}`, 
      phone: "614-882-8022",
      img: "https://www.dropbox.com/scl/fi/0fa2hhjz47qu2ldlusy4d/Screenshot-2026-02-15-at-9.27.42-AM.png?rlkey=8n76nkakiv1vrlk3zj9gzz4yc&st=ztr598el&dl=1" 
    },
    { 
      name: "Trish Conrad", 
      role: "VP of Sales", 
      category: "Sales Team", 
      email: `trish${domain}`, 
      img: "https://www.dropbox.com/scl/fi/c9kjg5w0srynn51cubu84/Screenshot-2026-02-15-at-9.34.37-AM.png?rlkey=ijcr3d8hvlzcv67pum3gxprgq&st=zy3uuald&dl=1" 
    },
    { 
      name: "Nicole Evans", 
      role: "VP of Sales", 
      category: "Sales Team", 
      email: `nicole${domain}`, 
      img: "https://www.dropbox.com/scl/fi/yjs51l00ukb0644csi9e9/Screenshot-2026-02-15-at-9.34.41-AM.png?rlkey=oa3jvfjxxhr6wcynu5tvju9zx&st=besmkx6a&dl=1" 
    },
    { 
      name: "Jillian McGuire", 
      role: "Sr. Account Executive", 
      category: "Sales Team", 
      email: `jillian${domain}`, 
      img: "https://www.dropbox.com/scl/fi/2abb02iwgkgisv5z9vxv8/Screenshot-2026-02-15-at-9.34.46-AM.png?rlkey=2xdq1db6wxq2s0hwb2s6zenv9&st=vc2d1ovo&dl=1" 
    },
    { 
      name: "Cheyenne Nixon", 
      role: "Sr. Account Executive", 
      category: "Sales Team", 
      email: `cheyenne${domain}`, 
      img: "https://www.dropbox.com/scl/fi/abojve4w5vlxxh9xo5727/Screenshot-2026-02-15-at-9.34.51-AM.png?rlkey=1us3qpnr7hv5k4z2fbbmjiaok&st=uymaxuu8&dl=1" 
    },
    { 
      name: "Leslie Cunningham", 
      role: "Account Executive", 
      category: "Sales Team", 
      email: `lesliec${domain}`, 
      img: "https://www.dropbox.com/scl/fi/hc3v6nrcd45sm0awuqvy8/Screenshot-2026-02-15-at-9.34.55-AM.png?rlkey=zv21p5gefat8fef314311umit&st=weufd7ol&dl=1" 
    },

    // Marketing Team
    { 
      name: "Nicole Donnini", 
      role: "Brand Manager | Design & Social Media", 
      category: "Marketing Team", 
      email: `nicoled${domain}`, 
      img: "https://www.dropbox.com/scl/fi/ezs7e2zoabykzkhzr2uli/Screenshot-2026-02-15-at-9.35.01-AM.png?rlkey=udck9lk21z28xad8gvstbzy44&st=rxp7xiw8&dl=1" 
    },
    { 
      name: "Malia Carter", 
      role: "Graphic Design", 
      category: "Marketing Team", 
      email: `malia${domain}`, 
      img: "https://www.dropbox.com/scl/fi/wy09qwtpscipet79nyrk4/Screenshot-2026-02-15-at-9.35.06-AM.png?rlkey=o0b7k82y9gj0ak5kbpmkt6mqb&st=ftbpciua&dl=1" 
    },
    { 
      name: "Grant Burks", 
      role: "Photography & Videography", 
      category: "Marketing Team", 
      email: `grant${domain}`, 
      img: "https://www.dropbox.com/scl/fi/4m2ot16osfdm94b8gqd5e/Screenshot-2026-02-15-at-9.35.11-AM.png?rlkey=1grf03o269lvgmgngn7a3c50j&st=vvdgrhcy&dl=1" 
    },

    // Office Admin Team
    { 
      name: "Mandy Sargel", 
      role: "Office Manager", 
      category: "Office Admin Team", 
      email: `mandy${domain}`, 
      img: "https://www.dropbox.com/scl/fi/4jg4ge1g83a6zmshwjcad/Screenshot-2026-02-15-at-9.35.16-AM.png?rlkey=t590acmu2vg8jgeiammiya9d2&st=jng94hke&dl=1" 
    },
    { 
      name: "Emilie Yguado", 
      role: "Office Administration", 
      category: "Office Admin Team", 
      email: `emilie${domain}`, 
      img: "https://www.dropbox.com/scl/fi/bsjtccvej4si7ikuvm0ii/Screenshot-2026-02-15-at-9.35.31-AM.png?rlkey=wfnnm5c8aqrrjvbkfgp014ej0&st=zsdptegn&dl=1" 
    },
    { 
      name: "Paige Moreland", 
      role: "Operations Manager", 
      category: "Office Admin Team", 
      email: `paige${domain}`, 
      img: "https://www.dropbox.com/scl/fi/7y036ins33z1ta6nmugqn/Screenshot-2026-02-15-at-9.35.20-AM.png?rlkey=jyy8w2a7navj4tvp4bp4usei1&st=tf0kxww8&dl=1" 
    },
    { 
      name: "Maya Clark", 
      role: "Office Administration", 
      category: "Office Admin Team", 
      email: `maya${domain}`, 
      img: "https://www.dropbox.com/scl/fi/lli9ykebz5xwhst4n33qm/Screenshot-2026-02-15-at-9.35.25-AM.png?rlkey=jofw5nob38ibleu4fffoo31it&st=glsu6zub&dl=1" 
    },

    // General Counsel
    { 
      name: "Emily Owens", 
      role: "General Counsel", 
      category: "General Counsel", 
      email: `emily${domain}`, 
      img: "https://www.dropbox.com/scl/fi/ltrtz60mjcbgvoxc4nd19/Screenshot-2026-02-15-at-9.35.36-AM.png?rlkey=7z424irhtb73kf3x9guocp14c&st=01ff5khb&dl=1" 
    }
  ];

  const categories = ["Funding Team", "Title Team", "Closing Team", "Sales Team", "Marketing Team", "Office Admin Team", "General Counsel"];

  return (
    <section id="team" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#004EA8]/10 text-[#004EA8] rounded-full mb-6">
            <span className="text-[10px] font-header font-black uppercase tracking-[0.2em]">Our People</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-header font-extrabold text-[#004EA8] mb-6">The World Class Team</h2>
          <p className="text-xl text-slate-500 font-subheader max-w-2xl mx-auto leading-relaxed">
            A collective of industry experts dedicated to transforming the closing experience through technology and high-touch service.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-3">
             <div className="sticky top-32 space-y-4">
                <p className="text-[10px] font-header font-black text-slate-400 uppercase tracking-widest mb-6">Departments</p>
                {categories.map(cat => (
                  <a 
                    key={cat} 
                    href={`#${cat.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block text-xs font-header font-bold text-slate-500 hover:text-[#004EA8] transition-colors"
                  >
                    {cat}
                  </a>
                ))}
                <div className="pt-8 border-t border-slate-100">
                  <p className="text-[10px] font-header font-black text-slate-400 uppercase tracking-widest mb-4">General Inquiries</p>
                  <a href="mailto:info@worldclasstitle.com" className="flex items-center gap-2 text-xs font-header font-bold text-[#64CCC9] hover:text-[#004EA8]">
                    <Mail className="w-3 h-3" />
                    info@worldclasstitle.com
                  </a>
                </div>
             </div>
          </div>

          <div className="lg:col-span-9 space-y-24">
            {categories.map((cat) => (
              <div key={cat} id={cat.toLowerCase().replace(/\s+/g, '-')} className="scroll-mt-32">
                <div className="flex items-center gap-6 mb-12">
                  <h3 className="text-lg font-header font-black text-[#004EA8] uppercase tracking-[0.2em] whitespace-nowrap">{cat}</h3>
                  <div className="h-px bg-[#B9D9EB]/30 flex-grow" />
                </div>
                
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
                  {team.filter(m => m.category === cat).map((member, i) => (
                    <div key={i} className="group transition-all duration-500">
                      <div className="flex items-center gap-6">
                        {member.img && (
                          <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 shadow-lg border-4 border-white ring-1 ring-slate-100 group-hover:ring-[#64CCC9] transition-all">
                            <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                        )}
                        <div className="flex-grow">
                          <h4 className="text-lg font-header font-black text-slate-900 mb-0.5 group-hover:text-[#004EA8] transition-colors leading-tight">{member.name}</h4>
                          <p className="text-[10px] font-header font-bold text-[#64CCC9] uppercase tracking-widest mb-3 leading-none">{member.role}</p>
                          
                          <div className="flex gap-2">
                            {member.email && (
                              <a 
                                href={`mailto:${member.email}`}
                                className="p-1.5 bg-slate-50 text-slate-400 rounded-md hover:bg-[#004EA8] hover:text-white transition-all"
                                title="Send Email"
                              >
                                <Mail className="w-3.5 h-3.5" />
                              </a>
                            )}
                            {member.phone && (
                              <button 
                                onClick={() => togglePhone(member.name)}
                                className={`p-1.5 rounded-md transition-all ${revealedPhones[member.name] ? 'bg-[#64CCC9] text-white' : 'bg-slate-50 text-slate-400 hover:bg-[#004EA8] hover:text-white'}`}
                                title={revealedPhones[member.name] ? "Hide Number" : "Reveal Phone Number"}
                              >
                                {revealedPhones[member.name] ? <Phone className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                              </button>
                            )}
                          </div>
                          
                          {revealedPhones[member.name] && member.phone && (
                            <div className="mt-1 animate-in slide-in-from-top-1 duration-300">
                              <a href={`tel:${member.phone}`} className="text-[11px] font-header font-black text-[#004EA8] hover:underline">
                                {member.phone}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-32 p-12 bg-slate-50 rounded-[3rem] border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="max-w-xl">
              <h3 className="text-2xl font-header font-extrabold text-[#004EA8] mb-2">Want to join the team?</h3>
              <p className="text-slate-500 font-subheader">We're always looking for talented professionals to help us redefine the title industry.</p>
           </div>
           <a 
            href="mailto:info@worldclasstitle.com?subject=WEBSITE: I'm interested in joining WCT" 
            className="px-8 py-4 bg-white border border-[#B9D9EB] text-[#004EA8] rounded-full font-header font-bold text-xs flex items-center gap-3 hover:bg-[#004EA8] hover:text-white transition-all"
           >
             VIEW OPEN ROLES
             <ExternalLink className="w-4 h-4" />
           </a>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
