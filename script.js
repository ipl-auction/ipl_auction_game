class Team {
    constructor(name, budget, retainedPlayers) {
        this.name = name;
        this.budget = budget;
        this.squad = retainedPlayers;
        this.foreignPlayers = retainedPlayers.filter(player => player.nationality === 'Foreign').length;
        this.batsmen = retainedPlayers.filter(player => player.role === 'Batsman').length;
        this.allRounders = retainedPlayers.filter(player => player.role === 'All-Rounder').length;
        this.bowlers = retainedPlayers.filter(player => player.role === 'Bowler').length;
        this.wicketkeepers = retainedPlayers.filter(player => player.role === 'Wicketkeeper').length;
        this.lastBidder = null;
    }

    addPlayer(player, price) {
        if (this.squad.length < 25 && this.budget >= price) {
            // Check role constraints
            if (player.role === 'Batsman' && this.batsmen < 6) {
                this.batsmen++;
            } else if (player.role === 'All-Rounder' && this.allRounders < 5) {
                this.allRounders++;
            } else if (player.role === 'Bowler' && this.bowlers < 6) {
                this.bowlers++;
            } else if (player.role === 'Wicketkeeper' && this.wicketkeepers < 2) {
                this.wicketkeepers++;
            } else if (player.nationality === 'Foreign' && this.foreignPlayers < 8) {
                this.foreignPlayers++;
            } else {
                console.log(`${player.name} cannot be added due to role or foreign player constraints.`);
                return;
            }

            this.squad.push(player);
            this.budget -= price;
            if (player.nationality === 'Foreign') this.foreignPlayers += 1;
            console.log(`${player.name} added to ${this.name} for ₹${price / 1e7} crore.`);
        } else {
            console.log(`${this.name} cannot add ${player.name}. Budget or squad limit exceeded.`);
        }
    }

    decideBid(player, currentPrice) {
    if (this.name === userTeam.name) return false; 
        if (this.squad.length >= 25) return false; // No more players can be added
        if (player.role === 'Batsman' && this.batsmen < 6) {
            return currentPrice <= this.budget * 0.2;
        } else if (player.role === 'All-Rounder' && this.allRounders < 5) {
            return currentPrice <= this.budget * 0.25;
        } else if (player.role === 'Bowler' && this.bowlers < 6) {
            return currentPrice <= this.budget * 0.15;
        } else if (player.role === 'Wicketkeeper' && this.wicketkeepers < 2) {
            return currentPrice <= this.budget * 0.2;
        } else if (player.nationality === 'Foreign' && this.foreignPlayers < 8) {
            return currentPrice <= this.budget * 0.3;
        }
        return false;
    }

    // Function to check if team satisfies all constraints
    isValidTeam() {
        return (
            this.batsmen >= 6 &&
            this.allRounders >= 5 &&
            this.bowlers >= 6 &&
            this.wicketkeepers >= 2 &&
            this.foreignPlayers >= 8 &&
            this.squad.length >= 19 &&
            this.squad.length <= 25
        );
    }
}
let currentAuctionIndex = parseInt(localStorage.getItem('currentAuctionIndex')) || 0;
// Sample teams and players setup (continue to add more if needed)
let teams = [
    new Team("MI", 450000000, [
        { name: "Rohit Sharma", role: "Batsman", nationality: "Indian" },
        { name: "Suryakumar Yadav", role: "Batsman", nationality: "Indian" },
        { name: "Tilak Varma", role: "Batsman", nationality: "Indian" },
        { name: "Hardik Pandya", role: "All-Rounder", nationality: "Indian" },
        { name: "Jasprit Bumrah", role: "Bowler", nationality: "Indian" }
    ]),
   new Team("CSK", 550000000, [
        {'name': 'MS Dhoni', 'role': 'Wicketkeeper', 'nationality': 'Indian'},
        {'name': 'Ruturaj Gaikwad', 'role': 'Batsman', 'nationality': 'Indian'},
        {'name': 'Shivam Dube', 'role': 'All-Rounder', 'nationality': 'Indian'},
        {'name': 'Ravindra Jadeja', 'role': 'All-Rounder', 'nationality': 'Indian'},
        {'name': 'Matheesha Pathirana', 'role': 'Bowler', 'nationality': 'Foreign'}
    ]),
    new Team("DC", 730000000, [
        {'name': 'Tristan Stubbs', 'role': 'Batsman', 'nationality': 'Foreign'},
        {'name': 'Abisheak Poreal', 'role': 'Batsman', 'nationality': 'Indian'},
        {'name': 'Axar Patel', 'role': 'All-Rounder', 'nationality': 'Indian'},

        {'name': 'Kuldeep Yadav', 'role': 'Bowler', 'nationality': 'Indian'}
    ]),
    new Team("KKR", 510000000, [
        {'name': 'Rinku Singh', 'role': 'Batsman', 'nationality': 'Indian'},
        {'name': 'Andre Russell', 'role': 'All-Rounder', 'nationality': 'Foreign'},
        {'name': 'Sunil Narine', 'role': 'All-Rounder', 'nationality': 'Foreign'},
        {'name': 'Ramandeep Singh', 'role': 'All-Rounder', 'nationality': 'Indian'},
        {'name': 'Haristh Rana', 'role': 'Bowler', 'nationality': 'Indian'},
        {'name': 'Varun', 'role': 'Bowler', 'nationality': 'Indian'}
    ]),
    new Team("GT", 690000000, [
        {'name': 'Shubman Gill', 'role': 'Batsman', 'nationality': 'Indian'},
        {'name': 'Rashid Khan', 'role': 'Bowler', 'nationality': 'Foreign'},
        {'name': 'Sai Sudharsan', 'role': 'Batsman', 'nationality': 'Indian'},
        {'name': 'Rahul Tewatia', 'role': 'All-Rounder', 'nationality': 'Indian'},
        {'name': 'Shahrukh Khan', 'role': 'Batsman', 'nationality': 'Indian'}
    ]),
    new Team("SRH", 450000000, [
        {'name': 'Head', 'role': 'Batsman', 'nationality': 'Foreign'},
        {'name': 'Heinrich Klaasen', 'role': 'Wicketkeeper', 'nationality': 'Foreign'},
        {'name': 'Cummins', 'role': 'Bowler', 'nationality': 'Foreign'},
        {'name': 'Abhishek Sharma', 'role': 'All-Rounder', 'nationality': 'Indian'},
        {'name': 'Nithish', 'role': 'All-Rounder', 'nationality': 'Indian'}
    ]),
    new Team("RCB", 830000000, [
        {'name': 'Virat Kohli', 'role': 'Batsman', 'nationality': 'Indian'},
        {'name': 'Panditar', 'role': 'Batsman', 'nationality': 'Indian'},
        {'name': 'Yash', 'role': 'Bowler', 'nationality': 'Indian'}
    ]),
    new Team("LSG", 690000000, [
        {'name': 'Porran', 'role': 'Batsman', 'nationality': 'Foreign'},
        {'name': 'Badohni', 'role': 'All-Rounder', 'nationality': 'Indian'},
        {'name': 'Ravi Bishnoi', 'role': 'Bowler', 'nationality': 'Indian'},
        {'name': 'Mohsin Khan', 'role': 'Bowler', 'nationality': 'Indian'},
        {'name': 'Mayank', 'role': 'Bowler', 'nationality': 'Indian'}
    ]),
    new Team("PBKS", 1105000000, [
        {'name': 'Sashant singh', 'role': 'Batsman', 'nationality': 'Indian'},
        {'name': 'Prabsimran Singh', 'role': 'Batsman', 'nationality': 'Indian'}
    ]),
    new Team("RR", 410000000, [
        {'name': 'Yashasvi Jaiswal', 'role': 'Batsman', 'nationality': 'Indian'},
        {'name': 'Sanju Samson', 'role': 'Wicketkeeper', 'nationality': 'Indian'},
        {'name': 'Shimron Hetmyer', 'role': 'Batsman', 'nationality': 'Foreign'},
        {'name': 'Riyan Parag', 'role': 'All-Rounder', 'nationality': 'Indian'},
        {'name': 'Sandeep Sharma', 'role': 'Bowler', 'nationality': 'Indian'},
        {'name': 'Druv Jurel', 'role': 'Wicketkeeper', 'nationality': 'Indian'}
    ])
];

let players = [
    { name: "Rishabh Pant", basePrice: 20000000, role: "Wicketkeeper", nationality: "Indian", image: "rishabh_pant.jpg" },
    { name: "KL Rahul", basePrice: 20000000, role: "Wicketkeeper", nationality: "Indian", image: "kl_rahul.jpg" },
    { name: "Shreyas Iyer", basePrice: 20000000, role: "Batsman", nationality: "Indian", image: "shreyas_iyer.jpg" },
{ name: "Cameron Green", basePrice: 15000000, role: "All-rounder", nationality: "Foreign", image: "cameron_green.jpg" },   
 { name: "Mohammad Shami", basePrice: 20000000, role: "Bowler", nationality: "Indian", image: "mohammad_shami.jpg" },
 { name: "Mitchell Starc", basePrice: 20000000, role: "Bowler", nationality: "Foreign", image: "mitchell_starc.jpg" },
{ name: "Glenn Maxwell", basePrice: 15000000, role: "All-rounder", nationality: "Foreign", image: "glenn_maxwell.jpg" },   
{ name: "Ishan Kishan", basePrice: 20000000, role: "Wicketkeeper", nationality: "Indian", image: "ishan_kishan.jpg" },
{ name: "Jos Buttler", basePrice: 15000000, role: "Wicketkeeper", nationality: "Foreign", image: "jos_buttler.jpg" },    
{ name: "Arshdeep Singh", basePrice: 20000000, role: "Bowler", nationality: "Indian", image: "arshdeep_singh.jpg" },
    { name: "Mohammed Siraj", basePrice: 20000000, role: "Bowler", nationality: "Indian", image: "mohammed_siraj.jpg" },    
{ name: "Marcus Stoinis", basePrice: 15000000, role: "All-rounder", nationality: "Foreign", image: "marcus_stoinis.jpg" },
 { name: "Kagiso Rabada", basePrice: 25000000, role: "Bowler", nationality: "Foreign", image: "kagiso_rabada.jpg" },
  { name: "Trent Boult", basePrice: 15000000, role: "Bowler", nationality: "Foreign", image: "trent_boult.jpg" },   
{ name: "Rachin Ravindra", basePrice: 15000000, role: "All-rounder", nationality: "Foreign", image: "rachin_ravindra.jpg" },
{ name: "R Ashwin", basePrice: 20000000, role: "Bowler", nationality: "Indian", image: "r_ashwin.jpg" },
    { name: "Yuzvendra Chahal", basePrice: 20000000, role: "Bowler", nationality: "Indian", image: "yuzvendra_chahal.jpg" },
    { name: "Jake Fraser-McGurk", basePrice: 5000000, role: "All-rounder", nationality: "Foreign", image: "jake_fraser_mcgurk.jpg" }, 
 { name: "Ashutosh Sharma", basePrice: 5000000, role: "All-rounder", nationality: "Indian", image: "ashutosh_sharma.jpg" },
{ name: "Will Jacks", basePrice: 10000000, role: "All-rounder", nationality: "Foreign", image: "will_jacks.jpg" },
    { name: "Jofra Archer", basePrice: 20000000, role: "Bowler", nationality: "Foreign", image: "jofra_archer.jpg" },
    { name: "Khaleel Ahmed", basePrice: 20000000, role: "Bowler", nationality: "Indian", image: "khaleel_ahmed.jpg" },
    { name: "Mitchell Marsh", basePrice: 15000000, role: "All-rounder", nationality: "Foreign", image: "mitchell_marsh.jpg" },
    { name: "Deepak Chahar", basePrice: 20000000, role: "Bowler", nationality: "Indian", image: "deepak_chahar.jpg" },
    { name: "Venkatesh Iyer", basePrice: 20000000, role: "All-rounder", nationality: "Indian", image: "venkatesh_iyer.jpg" },
    { name: "Avesh Khan", basePrice: 20000000, role: "Bowler", nationality: "Indian", image: "avesh_khan.jpg" },
 { name: "David Miller", basePrice: 15000000, role: "Batsman", nationality: "Foreign", image: "david_miller.jpg" },
    { name: "Mukesh Kumar", basePrice: 20000000, role: "Bowler", nationality: "Indian", image: "mukesh_kumar.jpg" },
    { name: "Bhuvneshwar Kumar", basePrice: 20000000, role: "Bowler", nationality: "Indian", image: "bhuvneshwar_kumar.jpg" },
    { name: "Prasidh Krishna", basePrice: 20000000, role: "Bowler", nationality: "Indian", image: "prasidh_krishna.jpg" },
    { name: "T Natarajan", basePrice: 20000000, role: "Bowler", nationality: "Indian", image: "t_natarajan.jpg" },
{ name: "Quinton de Kock", basePrice: 15000000, role: "Wicketkeeper", nationality: "Foreign", image: "quinton_de_kock.jpg" },   
 { name: "Devdutt Padikkal", basePrice: 20000000, role: "Batsman", nationality: "Indian", image: "devdutt_padikkal.jpg" },
    { name: "Krunal Pandya", basePrice: 20000000, role: "All-rounder", nationality: "Indian", image: "krunal_pandya.jpg" },
    { name: "Harshal Patel", basePrice: 20000000, role: "Bowler", nationality: "Indian", image: "harshal_patel.jpg" },
{ name: "Vaibhav Arora", basePrice: 5000000, role: "Bowler", nationality: "Indian", image: "vaibhav_arora.jpg" },
    { name: "Washington Sundar", basePrice: 20000000, role: "All-rounder", nationality: "Indian", image: "washington_sundar.jpg" },
{ name: "Nitish Rana", basePrice: 15000000, role: "Batsman", nationality: "Indian", image: "nitish_rana.jpg" },
{ name: "Sherfane Rutherford", basePrice: 10000000, role: "All-rounder", nationality: "Foreign", image: "sherfane_rutherford.jpg" },
{ name: "Phil Salt", basePrice: 10000000, role: "Wicketkeeper", nationality: "Foreign", image: "phil_salt.jpg" },   
 { name: "Shardul Thakur", basePrice: 20000000, role: "Bowler", nationality: "Indian", image: "shardul_thakur.jpg" },
 { name: "Devon Conway", basePrice: 15000000, role: "Batsman", nationality: "Foreign", image: "devon_conway.jpg" },
    { name: "Maheesh Theekshana", basePrice: 10000000, role: "Bowler", nationality: "Foreign", image: "maheesh_theekshana.jpg" },
    { name: "Mitchell Santner", basePrice: 15000000, role: "All-rounder", nationality: "Foreign", image: "mitchell_santner.jpg" },
{ name: "Nehal Wadhera", basePrice: 5000000, role: "Batsman", nationality: "Indian", image: "nehal_wadhera.jpg" },
{ name: "Gerald Coetzee", basePrice: 5000000, role: "Bowler", nationality: "Foreign", image: "gerald_coetzee.jpg" },

{ name: "Suyash Sharma", basePrice: 5000000, role: "Bowler", nationality: "Indian", image: "suyash_sharma.jpg" },
{ name: "Anshul Kamboj", basePrice: 5000000, role: "Bowler", nationality: "Indian", image: "anshul_kamboj.jpg" },
{ name: "Naman Dhir", basePrice: 5000000, role: "Batsman", nationality: "Indian", image: "naman_dhir.jpg" },
{ name: "Jitesh Sharma", basePrice: 5000000, role: "Wicketkeeper", nationality: "Indian", image: "jitesh_sharma.jpg" },
{ name: "Jonny Bairstow", basePrice: 10000000, role: "Wicketkeeper", nationality: "Foreign", image: "jonny_bairstow.jpg" },
{ name: "Liam Livingstone", basePrice: 15000000, role: "All-rounder", nationality: "Foreign", image: "liam_livingstone.jpg" },    
{ name: "Umesh Yadav", basePrice: 20000000, role: "Bowler", nationality: "Indian", image: "umesh_yadav.jpg" },
    
{ name: "Dewald Brevis", basePrice: 10000000, role: "Batsman", nationality: "Foreign", image: "dewald_brevis.jpg" },
{ name: "Mohit Sharma", basePrice: 5000000, role: "Bowler", nationality: "Indian", image: "mohit_sharma.jpg" },
{ name: "Noor Ahmad", basePrice: 5000000, role: "Bowler", nationality: "Foreign", image: "noor_ahmad.jpg" },
{ name: "Sai Kishore", basePrice: 5000000, role: "Bowler", nationality: "Indian", image: "sai_kishore.jpg" },    
  { name: "Tushar Deshpande", basePrice: 5000000, role: "Bowler", nationality: "Indian", image: "tushar_deshpande.jpg" },
 { name: "Daryl Mitchell", basePrice: 10000000, role: "All-rounder", nationality: "Foreign", image: "daryl_mitchell.jpg" },
    { name: "Sameer Rizvi", basePrice: 5000000, role: "Batsman", nationality: "Indian", image: "sameer_rizvi.jpg" },
    { name: "Mustafizur Rahman", basePrice: 10000000, role: "Bowler", nationality: "Foreign", image: "mustafizur_rahman.jpg" },
   { name: "Anrich Nortje", basePrice: 15000000, role: "Bowler", nationality: "Foreign", image: "anrich_nortje.jpg" },
    { name: "David Warner", basePrice: 20000000, role: "Batsman", nationality: "Foreign", image: "david_warner.jpg" },
{ name: "Mark Wood", basePrice: 15000000, role: "Bowler", nationality: "Foreign", image: "mark_wood.jpg" },
{ name: "Naveen-ul-Haq", basePrice: 5000000, role: "Bowler", nationality: "Foreign", image: "naveen_ul_haq.jpg" },
{ name: "Shivam Mavi", basePrice: 10000000, role: "Bowler", nationality: "Indian", image: "shivam_mavi.jpg" },

{ name: "James Anderson", basePrice: 12000000, role: "Bowler", nationality: "Foreign", image: "james_anderson.jpg" },
    { name: "Prithvi Shaw", basePrice: 7000000, role: "Batsman", nationality: "Indian", image: "prithvi_shaw.jpg" },
    { name: "Sarfaraz Khan", basePrice: 7000000, role: "Batsman", nationality: "Indian", image: "sarfaraz_khan.jpg" },
    { name: "Saurabh Netravalkar", basePrice: 5000000, role: "Bowler", nationality: "Foreign", image: "saurabh_netravalkar.jpg" },
     { name: "Lungi Ngidi", basePrice: 20000000, role: "Bowler", nationality: "Foreign", image: "lungi_ngidi.jpg" },
    { name: "Faf du Plessis", basePrice: 25000000, role: "Batsman", nationality: "Foreign", image: "faf_du_plessis.jpg" },
{ name: "Tim David", basePrice: 10000000, role: "Batsman", nationality: "Foreign", image: "tim_david.jpg" },
{ name: "Vishnu Vinod", basePrice: 5000000, role: "Wicketkeeper", nationality: "Indian", image: "vishnu_vinod.jpg" },

{ name: "Mohammad Nabi", basePrice: 10000000, role: "All-rounder", nationality: "Foreign", image: "mohammad_nabi.jpg" },
{ name: "Romario Shepherd", basePrice: 10000000, role: "All-rounder", nationality: "Foreign", image: "romario_shepherd.jpg" },

{ name: "Harpreet Bhatia", basePrice: 5000000, role: "Batsman", nationality: "Indian", image: "harpreet_bhatia.jpg" },
{ name: "Rilee Rossouw", basePrice: 10000000, role: "Batsman", nationality: "Foreign", image: "rilee_rossouw.jpg" },
{ name: "Chris Woakes", basePrice: 10000000, role: "All-rounder", nationality: "Foreign", image: "chris_woakes.jpg" },

{ name: "Anuj Rawat", basePrice: 5000000, role: "Wicketkeeper", nationality: "Indian", image: "anuj_rawat.jpg" },

{ name: "Mahipal Lomror", basePrice: 5000000, role: "All-rounder", nationality: "Indian", image: "mahipal_lomror.jpg" },
{ name: "Karn Sharma", basePrice: 5000000, role: "Bowler", nationality: "Indian", image: "karn_sharma.jpg" },

{ name: "Swapnil Singh", basePrice: 5000000, role: "All-rounder", nationality: "Indian", image: "swapnil_singh.jpg" },

{ name: "Rovman Powell", basePrice: 10000000, role: "All-rounder", nationality: "Foreign", image: "rovman_powell.jpg" },
{ name: "Kuldeep Sen", basePrice: 5000000, role: "Bowler", nationality: "Indian", image: "kuldeep_sen.jpg" },
{ name: "Navdeep Saini", basePrice: 10000000, role: "Bowler", nationality: "Indian", image: "navdeep_saini.jpg" },
{ name: "Keshav Maharaj", basePrice: 10000000, role: "Bowler", nationality: "Foreign", image: "keshav_maharaj.jpg" },
{ name: "Abdul Samad", basePrice: 5000000, role: "All-rounder", nationality: "Indian", image: "abdul_samad.jpg" },
{ name: "Aiden Markram", basePrice: 15000000, role: "All-rounder", nationality: "Foreign", image: "aiden_markram.jpg" },
{ name: "Rahul Tripathi", basePrice: 10000000, role: "Batsman", nationality: "Indian", image: "rahul_tripathi.jpg" },
{ name: "Glenn Phillips", basePrice: 10000000, role: "Wicketkeeper", nationality: "Foreign", image: "glenn_phillips.jpg" },
{ name: "Mayank Agarwal", basePrice: 10000000, role: "Batsman", nationality: "Indian", image: "mayank_agarwal.jpg" },
{ name: "Anmolpreet Singh", basePrice: 5000000, role: "Batsman", nationality: "Indian", image: "anmolpreet_singh.jpg" },
{ name: "Marco Jansen", basePrice: 15000000, role: "Bowler", nationality: "Foreign", image: "marco_jansen.jpg" },

{ name: "Abhinav Manohar", basePrice: 10000000, role: "Batsman", nationality: "Indian", image: "abhinav_manohar.jpg" },
{ name: "Sandeep Warrier", basePrice: 5000000, role: "Bowler", nationality: "Indian", image: "sandeep_warrier.jpg" },

{ name: "Jayant Yadav", basePrice: 5000000, role: "Bowler", nationality: "Indian", image: "jayant_yadav.jpg" },
{ name: "Joshua Little", basePrice: 5000000, role: "Bowler", nationality: "Foreign", image: "joshua_little.jpg" },
{ name: "Kane Williamson", basePrice: 15000000, role: "Batsman", nationality: "Foreign", image: "kane_williamson.jpg" },
{ name: "Matthew Wade", basePrice: 10000000, role: "Wicketkeeper", nationality: "Foreign", image: "matthew_wade.jpg" },

{ name: "Vijay Shankar", basePrice: 10000000, role: "All-rounder", nationality: "Indian", image: "vijay_shankar.jpg" },
{ name: "Wriddhiman Saha", basePrice: 10000000, role: "Wicketkeeper", nationality: "Indian", image: "wriddhiman_saha.jpg" },
{ name: "Azmatullah Omarzai", basePrice: 5000000, role: "All-rounder", nationality: "Foreign", image: "azmatullah_omarzai.jpg" },
{ name: "Kartik Tyagi", basePrice: 5000000, role: "Bowler", nationality: "Indian", image: "kartik_tyagi.jpg" },
{ name: "Rahmanullah Gurbaz", basePrice: 10000000, role: "Wicketkeeper", nationality: "Foreign", image: "rahmanullah_gurbaz.jpg" },

{ name: "KS Bharat", basePrice: 5000000, role: "Wicketkeeper", nationality: "Indian", image: "ks_bharat.jpg" },
{ name: "Manish Pandey", basePrice: 10000000, role: "Batsman", nationality: "Indian", image: "manish_pandey.jpg" },
{ name: "Angkrish Raghuvanshi", basePrice: 5000000, role: "Batsman", nationality: "Indian", image: "angkrish_raghuvanshi.jpg" },
{ name: "Anukul Roy", basePrice: 5000000, role: "All-rounder", nationality: "Indian", image: "anukul_roy.jpg" },

{ name: "Allah Ghazanfar", basePrice: 5000000, role: "Bowler", nationality: "Foreign", image: "allah_ghazanfar.jpg" },
{ name: "Dushmantha Chameera", basePrice: 10000000, role: "Bowler", nationality: "Foreign", image: "dushmantha_chameera.jpg" },


{ name: "Chetan Sakariya", basePrice: 10000000, role: "Bowler", nationality: "Indian", image: "chetan_sakariya.jpg" },



{ name: "Ashton Turner", basePrice: 10000000, role: "Batsman", nationality: "Foreign", image: "ashton_turner.jpg" },
{ name: "Deepak Hooda", basePrice: 5000000, role: "All-rounder", nationality: "Indian", image: "deepak_hooda.jpg" },
{ name: "Krishnappa Gowtham", basePrice: 5000000, role: "All-rounder", nationality: "Indian", image: "krishnappa_gowtham.jpg" },

{ name: "Kyle Mayers", basePrice: 10000000, role: "All-rounder", nationality: "Foreign", image: "kyle_mayers.jpg" },

{ name: "Mohd. Arshad Khan", basePrice: 5000000, role: "Bowler", nationality: "Indian", image: "mohd_arshad_khan.jpg" },
{ name: "Prerak Mankad", basePrice: 5000000, role: "All-rounder", nationality: "Indian", image: "prerak_mankad.jpg" },
{ name: "Yudhvir Singh", basePrice: 5000000, role: "Bowler", nationality: "Indian", image: "yudhvir_singh.jpg" },
{ name: "Arshin Kulkarni", basePrice: 5000000, role: "All-rounder", nationality: "Indian", image: "arshin_kulkarni.jpg" },
{ name: "David Willey", basePrice: 10000000, role: "Bowler", nationality: "Foreign", image: "david_willey.jpg" },

 { name: "Ajinkya Rahane", basePrice: 20000000, role: "Batsman", nationality: "Indian", image: "ajinkya_rahane.jpg" },

  
    { name: "Moeen Ali", basePrice: 20000000, role: "All-rounder", nationality: "Foreign", image: "moeen_ali.jpg" },
    { name: "Mukesh Choudhary", basePrice: 5000000, role: "Bowler", nationality: "Indian", image: "mukesh_choudhary.jpg" },
 { name: "Rajvardhan Hangargekar", basePrice: 5000000, role: "All-rounder", nationality: "Indian", image: "rajvardhan_hangargekar.jpg" },
    { name: "Shaik Rasheed", basePrice: 5000000, role: "Batsman", nationality: "Indian", image: "shaik_rasheed.jpg" },
    { name: "Simarjeet Singh", basePrice: 5000000, role: "Bowler", nationality: "Indian", image: "simarjeet_singh.jpg" },
  
 { name: "Lalit Yadav", basePrice: 5000000, role: "All-rounder", nationality: "Indian", image: "lalit_yadav.jpg" },
 { name: "Yash Dhull", basePrice: 5000000, role: "Batsman", nationality: "Indian", image: "yash_dhull.jpg" },
   { name: "Harry Brook", basePrice: 10000000, role: "Batsman", nationality: "Foreign", image: "harry_brook.jpg" },
 { name: "Rasikh Dar", basePrice: 5000000, role: "Bowler", nationality: "Indian", image: "rasikh_dar.jpg" },
    { name: "Jhye Richardson", basePrice: 10000000, role: "Bowler", nationality: "Foreign", image: "jhye_richardson.jpg" },
    
    { name: "Shai Hope", basePrice: 15000000, role: "Wicketkeeper", nationality: "Foreign", image: "shai_hope.jpg" },

];
    
    






let userTeam = localStorage.getItem('selectedTeam');
let nextPlayerIndex = parseInt(localStorage.getItem('nextPlayerIndex')) || 0;


function saveUserTeamToLocalStorage() {
    if (userTeam) {
        localStorage.setItem("userTeam", JSON.stringify(userTeam));
    }

}


document.getElementById('next-player-btn').addEventListener('click', function() {
    startNextAuctionPlayer(); // Start the auction for the next player when the button is clicked
});
// Function to save sold players to local storage
function saveSoldPlayersToLocalStorage() {
    const soldPlayers = teams.map(team => ({
        name: team.name,
        budget: team.budget,
        players: team.squad,
    }));
    localStorage.setItem("soldPlayers", JSON.stringify(soldPlayers));
}

// Load sold players data from local storage on page load
function loadSoldPlayersFromLocalStorage() {
    const storedSoldPlayers = localStorage.getItem("soldPlayers");
    if (storedSoldPlayers) {
        const soldData = JSON.parse(storedSoldPlayers);
        soldData.forEach(teamData => {
            const team = teams.find(t => t.name === teamData.name);
            if (team) {
                team.budget = teamData.budget;
                team.squad = teamData.players;
            }
        });
    }
}




function createTeamTables() {
    const teamTablesDiv = document.getElementById("team-tables");
    teamTablesDiv.innerHTML = "";

    teams.forEach(team => {
        const table = document.createElement("table");
        table.className = "team-table";
        table.innerHTML = 
            `<caption>
                <img src="images/teams/${team.name.toLowerCase()}-logo.png" alt="${team.name} Logo" class="team-logo">
                ${team.name}
            </caption>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Nationality</th>
                </tr>
            </thead>
            <tbody id="${team.name.toLowerCase()}-retained">
                <tr>
                    <td colspan="3"><strong>Players</strong></td>
                </tr>
            </tbody>
            <tbody id="${team.name.toLowerCase()}-sold">
                <tr>
                    <td colspan="3"><strong>Sold Players</strong></td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3">Budget: ₹<span id="${team.name.toLowerCase()}-budget">${team.budget / 1e7} cr</span></td>
                </tr>
            </tfoot>`;
        teamTablesDiv.appendChild(table);

        const retainedTbody = document.getElementById(`${team.name.toLowerCase()}-retained`);
        team.squad.forEach(player => {
            const row = `<tr>
                <td>${player.name}</td>
                <td>${player.role}</td>
                <td>${player.nationality}</td>
            </tr>`;
            retainedTbody.innerHTML += row;
        });
    });
}



function announce(message, teamLogo = null) {
    const announcementDiv = document.getElementById("announcement");
    announcementDiv.innerHTML = message;

    if (teamLogo) {
        announcementDiv.innerHTML += `<img src="images/teams/${teamLogo}-logo.png" alt="Team Logo" class="team-logo">`;
    }

    console.log(message);
    const speech = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(speech);
}











function updateSoldPlayer(team, player) {
    const soldTbody = document.getElementById(`${team.name.toLowerCase()}-sold`);
    const row = `<tr><td>${player.name}</td><td>${player.role}</td><td>${player.nationality}</td></tr>`;
    soldTbody.innerHTML += row;
    document.getElementById(`${team.name.toLowerCase()}-budget`).innerText = `${team.budget / 1e7} cr`;
}


function saveCurrentPlayerIndex() {
    localStorage.setItem("nextPlayerIndex", nextPlayerIndex);
}

// Ensure that nextPlayerIndex is retrieved and used correctly on page load
function loadPlayerIndexFromLocalStorage() {
    nextPlayerIndex = parseInt(localStorage.getItem('nextPlayerIndex')) || 0;
     
}


// Modify startAuction to include updating the player status
function toggleInstructions() {
    const instructionsContent = document.getElementById("instructions-content");
    const instructionsToggle = document.getElementById("instructions-toggle");

    if (instructionsContent.style.display === "none") {
        instructionsContent.style.display = "block";
        instructionsToggle.innerText = "Hide Instructions";
    } else {
        instructionsContent.style.display = "none";
        instructionsToggle.innerText = "Show Instructions";
    }
}

loadUserTeamFromLocalStorage();
loadSoldPlayersFromLocalStorage();
createTeamTables();
loadPlayerIndexFromLocalStorage();

// Store nextPlayerIndex in local storage to track the player after refresh


function startNextAuctionPlayer() {
    // Check if there are more players to auction
    if (nextPlayerIndex < players.length) {
        const player = players[nextPlayerIndex];
        startAuctionForPlayer(player, nextPlayerIndex); // Pass the current index
    } else {
        announce("All players have been auctioned.");
    }
}

// Function to clear auction data (reset and reload the page)





// Adjusting the selectUserTeam to show the team selection interface after clearing auction data
function selectUserTeam(team) {
    userTeam = team;
    saveUserTeamToLocalStorage();
    document.getElementById("team-selection").style.display = "none";
    document.getElementById("auction-section").style.display = "block";
    document.getElementById("user-bid-btn").style.display = "block";

    document.querySelectorAll(".team-button").forEach(button => {
        button.disabled = true;
    });

    startNextAuctionPlayer(); // Start the auction for the next player after selecting the user team
}

// Function to load user team from local storage
function loadUserTeamFromLocalStorage() {
    const storedTeam = localStorage.getItem("userTeam");
    if (storedTeam) {
        userTeam = JSON.parse(storedTeam);
        document.getElementById("team-selection").style.display = "none";
        document.getElementById("auction-section").style.display = "block";
        document.getElementById("user-bid-btn").style.display = "block";
        startNextAuctionPlayer(); // Start the auction from the next player
    } else {
        // If no user team is found, show the team selection
        renderTeamSelection();
    }
}

// Function to render the team selection
function renderTeamSelection() {
    const teamButtonsDiv = document.getElementById("team-buttons");
    teams.forEach(team => {
        const button = document.createElement("button");
        button.innerText = team.name;
        button.classList.add("team-button");
        button.onclick = () => selectUserTeam(team);
        teamButtonsDiv.appendChild(button);
    });
}

// Ensure that the next player is selected after the auction ends
function startAuctionForPlayer(player, playerIndex) {
    player.currentPrice = player.basePrice;
    let highestBidder = null;
    let lastBidder = null;
    let bidTimeout = Date.now() + 30000; // 30 seconds timer
    let lastBidTime = Date.now();
    let userLastBidTime = null; // Track user bid time

    document.getElementById("next-player-btn").disabled = true;
    document.getElementById("user-bid-btn").disabled = false;

    const playerImageDiv = document.getElementById("player-image");
    if (playerImageDiv) {
        playerImageDiv.innerHTML = `<img src="images/players/${player.image}" alt="${player.name}">`;
    }

    const playerDetailsDiv = document.getElementById("player-details");
    if (playerDetailsDiv) {
        playerDetailsDiv.innerText = `Name: ${player.name}, Role: ${player.role}, Base Price: ₹${player.currentPrice / 1e7} cr`;
    }

    announce(`Auction started for ${player.name} at base price ₹${player.currentPrice / 1e7} crore`);

    const auctionInterval = setInterval(() => {
        if (Date.now() > bidTimeout) {
            clearInterval(auctionInterval);

            if (highestBidder) {
                highestBidder.addPlayer(player, player.currentPrice);
                announce(`${highestBidder.name} won ${player.name} for ₹${player.currentPrice / 1e7} crore`, highestBidder.name.toLowerCase());
                updateSoldPlayer(highestBidder, player);
                player.status = "sold";
                markPlayerStatus(playerIndex, "Sold", "green");
            } else {
                announce(`No bids for ${player.name}`);
                player.status = "unsold";
                markPlayerStatus(playerIndex, "Unsold", "red");
            }

            renderAuctionPlayersList();
            nextPlayerIndex++;
            saveCurrentPlayerIndex();
            saveSoldPlayersToLocalStorage();
            document.getElementById("next-player-btn").disabled = false;
            document.getElementById("user-bid-btn").disabled = true;
            return;
        }

        let biddingTeams = teams.filter(team => 
            team !== userTeam &&
            team.decideBid(player, player.currentPrice) &&
            team !== lastBidder
        );

        if (biddingTeams.length > 0 && (Date.now() - lastBidTime) >= 9000) {
            highestBidder = biddingTeams[Math.floor(Math.random() * biddingTeams.length)];
            player.currentPrice += 1000000;
            announce(`${highestBidder.name} bids for ${player.name} at ₹${player.currentPrice / 1e7} crore`, highestBidder.name.toLowerCase());
            lastBidder = highestBidder;
            lastBidTime = Date.now();
            bidTimeout = Date.now() + 30000;

            const bidAmountElem = document.getElementById("current-bid-amount");
            const bidTeamElem = document.getElementById("current-bid-team");

            if (bidAmountElem) bidAmountElem.innerText = `${player.currentPrice / 1e7} cr`;
            if (bidTeamElem) bidTeamElem.innerText = highestBidder.name;
        }

        // Check if 30 seconds have passed since the user's last bid without any other bids
        if (highestBidder === userTeam && userLastBidTime && (Date.now() - userLastBidTime) >= 30000) {
            clearInterval(auctionInterval);
            userTeam.addPlayer(player, player.currentPrice);
            announce(`User's team ${userTeam.name} wins ${player.name} for ₹${player.currentPrice / 1e7} crore`, userTeam.name.toLowerCase());
            updateSoldPlayer(userTeam, player);
            player.status = "sold";
            markPlayerStatus(playerIndex, "Sold", "green");
            renderAuctionPlayersList();
            nextPlayerIndex++;
            saveCurrentPlayerIndex();
            saveSoldPlayersToLocalStorage();
            document.getElementById("next-player-btn").disabled = false;
            document.getElementById("user-bid-btn").disabled = true;
            return;
        }
    }, 1000);

    document.getElementById("user-bid-btn").onclick = function() {
        const incrementAmount = 1000000;
        const newBidPrice = player.currentPrice + incrementAmount;

        if (userTeam.budget >= newBidPrice) {
            player.currentPrice = newBidPrice;
            highestBidder = userTeam;
            userLastBidTime = Date.now();

            announce(`User's team ${userTeam.name} bids for ${player.name} at ₹${player.currentPrice / 1e7} crore`, userTeam.name.toLowerCase());

            const bidAmountElem = document.getElementById("current-bid-amount");
            const bidTeamElem = document.getElementById("current-bid-team");

            if (bidAmountElem) bidAmountElem.innerText = `${player.currentPrice / 1e7} cr`;
            if (bidTeamElem) bidTeamElem.innerText = userTeam.name;

            bidTimeout = Date.now() + 30000;
        } else {
            announce("Insufficient budget for this bid!");
        }
    };
}


// Function to render auction players list from the current auction index
function renderAuctionPlayersList() {
    const playersListDiv = document.getElementById("players-list");
    playersListDiv.innerHTML = ""; // Clear previous list

    if (!players || players.length === 0) {
        console.log("No players available");
        return;
    }

    // Display only players starting from the current auction index
    const remainingPlayers = players.slice(nextPlayerIndex);

    if (remainingPlayers.length === 0) {
        console.log("All players have been auctioned");
        return;
    }

    remainingPlayers.forEach((player, index) => {
        const listItem = document.createElement("li");
        const playerIndex = currentAuctionIndex + index; // Adjusted index for tracking
        listItem.id = `player-${playerIndex}`;
        listItem.className = "player-item";

        // Determine player status and color
        let playerStatus = player.status === "sold" ? "Sold" : (player.status === "unsold" ? "Unsold" : "Available");
        let statusClass = player.status === "sold" ? "sold" : (player.status === "unsold" ? "unsold" : "available");

        listItem.innerHTML = `
            <span>${player.name} (${player.role}) - ₹${(player.basePrice / 10000000).toFixed(1)} cr</span>
            <span id="player-status-${playerIndex}" class="player-status ${statusClass}">${playerStatus}</span>
        `;
        
        playersListDiv.appendChild(listItem);

        // Update player status visually
        if (player.status === "sold") {
            markPlayerStatus(playerIndex, "Sold", "green"); // Sold - green color
        } else if (player.status === "unsold") {
            markPlayerStatus(playerIndex, "Unsold", "red"); // Unsold - red color
        } else {
            markPlayerStatus(playerIndex, "Available", "blue"); // Available - blue color
        }
    });
}

// Function to update the current auction index and save it to local storage
function updateCurrentAuctionIndex(newIndex) {
    currentAuctionIndex = newIndex;
    localStorage.setItem('currentAuctionIndex', currentAuctionIndex);
}

// Mark player status function to change text and color
function markPlayerStatus(playerIndex, status, color) {
    const statusElem = document.getElementById(`player-status-${playerIndex}`);
    if (statusElem) {
        statusElem.innerText = status;
        statusElem.style.color = color;
    }
}

// Event listener for the show/hide players button
document.getElementById('show-players-btn').addEventListener('click', function() {
    const playersList = document.getElementById('players-list');
    const button = document.getElementById('show-players-btn');

    // Toggle display style to show or hide the players list
    if (playersList.style.display === 'none' || playersList.style.display === '') {
        playersList.style.display = 'block'; // Show the list
        renderAuctionPlayersList(); // Render only remaining players
        button.innerText = 'Hide Players';
    } else {
        playersList.style.display = 'none'; 
        button.innerText = 'Show Players';
    }
});

// Function to clear auction data and reset index
function clearAuctionData() {
    localStorage.removeItem("soldPlayers");
    localStorage.removeItem("userTeam");
    localStorage.removeItem("currentAuctionIndex");
    localStorage.removeItem("nextPlayerIndex"); // Reset player index as well
    location.reload(); // Reload the page to reset the auction process
}




