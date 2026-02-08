// Tamil Medium Curriculum - Complete Subject and Topic Structure
// Classes 1-12 with detailed chapter topics

export interface TamilChapterTopic {
  topic: string;
  subtopics: string[];
}

export interface TamilChapter {
  chapterNumber: number;
  chapterTitle: string;
  topics: TamilChapterTopic[];
  learningOutcomes: string[];
}

export interface TamilSubject {
  subjectName: string;
  subjectCode: string;
  chapters: TamilChapter[];
}

export interface TamilClassCurriculum {
  class: number;
  subjects: TamilSubject[];
}

// Class 1 Tamil Medium Curriculum
export const class1TamilCurriculum: TamilSubject[] = [
  {
    subjectName: 'தமிழ்',
    subjectCode: 'TAM-1',
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: 'பாடி ஆடி விளையாடலாம்',
        topics: [
          {
            topic: 'உயிர் எழுத்துக்கள்',
            subtopics: ['அ முதல் ஔ வரை', 'எழுத்து அடையாளம்', 'எழுத்து எழுதுதல்']
          },
          {
            topic: 'பாடல்கள்',
            subtopics: ['குழந்தை பாடல்கள்', 'விளையாட்டு பாடல்கள்']
          }
        ],
        learningOutcomes: ['உயிர் எழுத்துக்களை அடையாளம் காணுதல்', 'எழுத்துக்களை எழுதுதல்']
      },
      {
        chapterNumber: 2,
        chapterTitle: 'மொழியோடு விளையாடு',
        topics: [
          {
            topic: 'மெய் எழுத்துக்கள்',
            subtopics: ['க் முதல் ன் வரை', 'மெய் எழுத்து அடையாளம்', 'மெய் எழுத்து எழுதுதல்']
          },
          {
            topic: 'சொற்கள்',
            subtopics: ['எளிய சொற்கள்', 'படங்களுடன் சொற்கள்']
          }
        ],
        learningOutcomes: ['மெய் எழுத்துக்களை அறிதல்', 'எளிய சொற்களை வாசித்தல்']
      }
    ]
  }
];

{
  subjectName: 'கணக்கு',
  subjectCode: 'MATH-1',
  chapters: [
    {
      chapterNumber: 1,
      chapterTitle: 'எண்கள் 1 முதல் 10 வரை',
      topics: [
        {
          topic: 'எண்களை அறிதல்',
          subtopics: ['1 முதல் 5 வரை', '6 முதல் 10 வரை', 'எண்களை எழுதுதல்']
        },
        {
          topic: 'எண்ணுதல்',
          subtopics: ['பொருட்களை எண்ணுதல்', 'விரல்களால் எண்ணுதல்']
        }
      ],
      learningOutcomes: ['1 முதல் 10 வரை எண்களை அறிதல்', 'பொருட்களை எண்ணுதல்']
    },

      {
        chapterNumber: 2,
        chapterTitle: 'கூட்டல்',
        topics: [
          {
            topic: 'எளிய கூட்டல்',
            subtopics: ['1+1, 2+1', '5 வரை கூட்டல்', 'படங்களுடன் கூட்டல்']
          }
        ],
        learningOutcomes: ['எளிய கூட்டல் செய்தல்']
      }
    ]
  },
  {
    subjectName: 'சூழ்நிலையியல்',
    subjectCode: 'EVS-1',
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: 'என் உடல்',
        topics: [
          {
            topic: 'உடல் உறுப்புகள்',
            subtopics: ['கை, கால்', 'தலை, முகம்', 'உடல் பாகங்கள்']
          },
          {
            topic: 'சுத்தம்',
            subtopics: ['கை கழுவுதல்', 'பல் துலக்குதல்']
          }
        ],
        learningOutcomes: ['உடல் உறுப்புகளை அறிதல்', 'சுத்தமாக இருத்தல்']
      },
      {
        chapterNumber: 2,
        chapterTitle: 'என் குடும்பம்',
        topics: [
          {
            topic: 'குடும்ப உறுப்பினர்கள்',
            subtopics: ['அம்மா, அப்பா', 'தாத்தா, பாட்டி', 'சகோதரர்கள்']
          }
        ],
        learningOutcomes: ['குடும்ப உறுப்பினர்களை அறிதல்']
      }
    ]
  }
];

// Class 2 Tamil Medium Curriculum
export const class2TamilCurriculum: TamilSubject[] = [
  {
    subjectName: 'தமிழ்',
    subjectCode: 'TAM-2',
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: 'விளையாடலாம் வாங்க',
        topics: [
          {
            topic: 'உயிர்மெய் எழுத்துக்கள்',
            subtopics: ['க, கா, கி, கீ', 'ச, சா, சி, சீ', 'எழுத்து இணைப்பு']
          },
          {
            topic: 'சொல் வாசிப்பு',
            subtopics: ['இரண்டு எழுத்து சொற்கள்', 'மூன்று எழுத்து சொற்கள்']
          }
        ],
        learningOutcomes: ['உயிர்மெய் எழுத்துக்களை வாசித்தல்', 'சொற்களை உருவாக்குதல்']
      },
      {
        chapterNumber: 2,
        chapterTitle: 'நண்பரை கண்டுபிடி',
        topics: [
          {
            topic: 'வாக்கியங்கள்',
            subtopics: ['எளிய வாக்கியங்கள்', 'வாக்கிய வாசிப்பு']
          },
          {
            topic: 'கதை வாசிப்பு',
            subtopics: ['சிறு கதைகள்', 'படக் கதைகள்']
          }
        ],
        learningOutcomes: ['வாக்கியங்களை வாசித்தல்', 'கதைகளை புரிந்துகொள்ளுதல்']
      }
    ]
  },
  {
    subjectName: 'கணக்கு',
    subjectCode: 'MATH-2',
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: 'எண்கள் 100 வரை',
        topics: [
          {
            topic: 'பத்து பத்தாக எண்ணுதல்',
            subtopics: ['10, 20, 30...', '50 வரை எண்கள்', '100 வரை எண்கள்']
          },
          {
            topic: 'இட மதிப்பு',
            subtopics: ['ஒன்றின் இடம்', 'பத்தின் இடம்']
          }
        ],
        learningOutcomes: ['100 வரை எண்களை அறிதல்', 'இட மதிப்பை புரிந்துகொள்ளுதல்']
      },
      {
        chapterNumber: 2,
        chapterTitle: 'கூட்டல் மற்றும் கழித்தல்',
        topics: [
          {
            topic: '20 வரை கூட்டல்',
            subtopics: ['ஒரு இலக்க கூட்டல்', 'இரண்டு இலக்க கூட்டல்']
          },
          {
            topic: '20 வரை கழித்தல்',
            subtopics: ['ஒரு இலக்க கழித்தல்', 'இரண்டு இலக்க கழித்தல்']
          }
        ],
        learningOutcomes: ['கூட்டல் கழித்தல் செய்தல்']
      }
    ]
  }
];

// Class 3 Tamil Medium Curriculum
export const class3TamilCurriculum: TamilSubject[] = [
  {
    subjectName: 'தமிழ்',
    subjectCode: 'TAM-3',
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: 'கல்வி கற்போம்',
        topics: [
          {
            topic: 'இலக்கணம்',
            subtopics: ['பெயர்ச்சொல்', 'வினைச்சொல்', 'இடைச்சொல்']
          },
          {
            topic: 'கவிதை',
            subtopics: ['எதுகை', 'மோனை', 'பாடல் பாடுதல்']
          }
        ],
        learningOutcomes: ['இலக்கண அடிப்படைகளை அறிதல்', 'கவிதை எழுதுதல்']
      },
      {
        chapterNumber: 2,
        chapterTitle: 'எழுத்து வளர்ச்சி',
        topics: [
          {
            topic: 'கட்டுரை எழுதுதல்',
            subtopics: ['சிறு கட்டுரை', 'பத்தி எழுதுதல்']
          },
          {
            topic: 'கடிதம் எழுதுதல்',
            subtopics: ['நண்பருக்கு கடிதம்', 'கடித வடிவம்']
          }
        ],
        learningOutcomes: ['கட்டுரை எழுதுதல்', 'கடிதம் எழுதுதல்']
      }
    ]
  },
  {
    subjectName: 'கணக்கு',
    subjectCode: 'MATH-3',
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: 'எண்கள் 1000 வரை',
        topics: [
          {
            topic: 'மூன்று இலக்க எண்கள்',
            subtopics: ['நூறு, இருநூறு', '500 வரை', '1000 வரை']
          },
          {
            topic: 'இட மதிப்பு',
            subtopics: ['ஒன்று, பத்து, நூறு', 'விரிவாக்கம்']
          }
        ],
        learningOutcomes: ['1000 வரை எண்களை அறிதல்']
      },
      {
        chapterNumber: 2,
        chapterTitle: 'பெருக்கல்',
        topics: [
          {
            topic: 'பெருக்கல் அட்டவணை',
            subtopics: ['2, 3, 4 பெருக்கல்', '5, 10 பெருக்கல்']
          }
        ],
        learningOutcomes: ['பெருக்கல் அட்டவணை கற்றல்']
      }
    ]
  },
  {
    subjectName: 'அறிவியல்',
    subjectCode: 'SCI-3',
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: 'தாவரங்கள்',
        topics: [
          {
            topic: 'தாவர பாகங்கள்',
            subtopics: ['வேர், தண்டு', 'இலை, பூ', 'கனி, விதை']
          }
        ],
        learningOutcomes: ['தாவர பாகங்களை அறிதல்']
      }
    ]
  }
];

// Class 4 Tamil Medium Curriculum
export const class4TamilCurriculum: TamilSubject[] = [
  {
    subjectName: 'தமிழ்',
    subjectCode: 'TAM-4',
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: 'இலக்கிய நயம்',
        topics: [
          {
            topic: 'சங்க இலக்கியம்',
            subtopics: ['திருக்குறள்', 'ஆத்திசூடி', 'நீதி நூல்கள்']
          }
        ],
        learningOutcomes: ['சங்க இலக்கியத்தை அறிதல்']
      }
    ]
  },
  {
    subjectName: 'கணக்கு',
    subjectCode: 'MATH-4',
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: 'பெரிய எண்கள்',
        topics: [
          {
            topic: '10000 வரை எண்கள்',
            subtopics: ['ஆயிரம்', 'பத்தாயிரம்']
          }
        ],
        learningOutcomes: ['பெரிய எண்களை அறிதல்']
      }
    ]
  }
];

// Class 5 Tamil Medium Curriculum
export const class5TamilCurriculum: TamilSubject[] = [
  {
    subjectName: 'தமிழ்',
    subjectCode: 'TAM-5',
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: 'மொழி வளர்ச்சி',
        topics: [
          {
            topic: 'மேம்பட்ட இலக்கணம்',
            subtopics: ['வேற்றுமை', 'விகுதி', 'சாரியை']
          }
        ],
        learningOutcomes: ['மேம்பட்ட இலக்கணம் கற்றல்']
      }
    ]
  },
  {
    subjectName: 'கணக்கு',
    subjectCode: 'MATH-5',
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: 'பின்னங்கள்',
        topics: [
          {
            topic: 'பின்ன அறிமுகம்',
            subtopics: ['1/2, 1/4', 'பின்ன வகைகள்']
          }
        ],
        learningOutcomes: ['பின்னங்களை புரிந்துகொள்ளுதல்']
      }
    ]
  }
];

// Class 6 Tamil Medium Curriculum
export const class6TamilCurriculum: TamilSubject[] = [
  {
    subjectName: 'தமிழ்',
    subjectCode: 'TAM-6',
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: 'இலக்கிய வரலாறு',
        topics: [
          {
            topic: 'சங்க காலம்',
            subtopics: ['சங்க இலக்கியம்', 'எட்டுத்தொகை', 'பத்துப்பாட்டு']
          },
          {
            topic: 'பக்தி இலக்கியம்',
            subtopics: ['தேவாரம்', 'திருவாசகம்']
          }
        ],
        learningOutcomes: ['தமிழ் இலக்கிய வரலாற்றை அறிதல்']
      }
    ]
  },
  {
    subjectName: 'கணக்கு',
    subjectCode: 'MATH-6',
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: 'எண்கள்',
        topics: [
          {
            topic: 'முழு எண்கள்',
            subtopics: ['இயல் எண்கள்', 'முழு எண்கள்', 'முழு எண் செயல்பாடுகள்']
          }
        ],
        learningOutcomes: ['முழு எண்களை புரிந்துகொள்ளுதல்']
      },
      {
        chapterNumber: 2,
        chapterTitle: 'பின்னங்கள்',
        topics: [
          {
            topic: 'பின்ன செயல்பாடுகள்',
            subtopics: ['பின்ன கூட்டல்', 'பின்ன கழித்தல்', 'பின்ன பெருக்கல்']
          }
        ],
        learningOutcomes: ['பின்ன செயல்பாடுகளை செய்தல்']
      }
    ]
  },
  {
    subjectName: 'அறிவியல்',
    subjectCode: 'SCI-6',
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: 'உணவு மற்றும் ஊட்டச்சத்து',
        topics: [
          {
            topic: 'ஊட்டச்சத்துக்கள்',
            subtopics: ['கார்போஹைட்ரேட்', 'புரதம்', 'கொழுப்பு', 'வைட்டமின்கள்']
          }
        ],
        learningOutcomes: ['ஊட்டச்சத்துக்களை அறிதல்']
      }
    ]
  },
  {
    subjectName: 'சமூக அறிவியல்',
    subjectCode: 'SOC-6',
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: 'இந்திய வரலாறு',
        topics: [
          {
            topic: 'பண்டைய இந்தியா',
            subtopics: ['சிந்து சமவெளி', 'வேத காலம்']
          }
        ],
        learningOutcomes: ['இந்திய வரலாற்றை அறிதல்']
      }
    ]
  }
];

// Class 7 Tamil Medium Curriculum
export const class7TamilCurriculum: TamilSubject[] = [
  {
    subjectName: 'தமிழ்',
    subjectCode: 'TAM-7',
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: 'இலக்கண ஆழம்',
        topics: [
          {
            topic: 'தொல்காப்பியம்',
            subtopics: ['எழுத்ததிகாரம்', 'சொல்லதிகாரம்', 'பொருளதிகாரம்']
          },
          {
            topic: 'யாப்பு இலக்கணம்',
            subtopics: ['அசை', 'சீர்', 'தளை', 'அடி']
          }
        ],
        learningOutcomes: ['இலக்கண ஆழத்தை புரிந்துகொள்ளுதல்']
      }
    ]
  },
  {
    subjectName: 'கணக்கு',
    subjectCode: 'MATH-7',
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: 'முழு எண்கள்',
        topics: [
          {
            topic: 'நேர் மற்றும் எதிர் எண்கள்',
            subtopics: ['நேர் எண்கள்', 'எதிர் எண்கள்', 'எண் கோடு']
          }
        ],
        learningOutcomes: ['முழு எண் செயல்பாடுகளை செய்தல்']
      },
      {
        chapterNumber: 2,
        chapterTitle: 'இயற்கணிதம்',
        topics: [
          {
            topic: 'இயற்கணித கோவைகள்',
            subtopics: ['மாறிலி', 'மாறி', 'கோவை']
          }
        ],
        learningOutcomes: ['இயற்கணித அடிப்படைகளை கற்றல்']
      }
    ]
  },
  {
    subjectName: 'அறிவியல்',
    subjectCode: 'SCI-7',
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: 'தாவரங்களில் ஊட்டம்',
        topics: [
          {
            topic: 'ஒளிச்சேர்க்கை',
            subtopics: ['ஒளிச்சேர்க்கை செயல்முறை', 'குளோரோபில்', 'ஒளி ஆற்றல்']
          }
        ],
        learningOutcomes: ['ஒளிச்சேர்க்கையை புரிந்துகொள்ளுதல்']
      }
    ]
  }
];

// Class 8 Tamil Medium Curriculum
export const class8TamilCurriculum: TamilSubject[] = [
  {
    subjectName: 'தமிழ்',
    subjectCode: 'TAM-8',
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: 'நவீன இலக்கியம்',
        topics: [
          {
            topic: 'நவீன கவிதை',
            subtopics: ['புதுக்கவிதை', 'சுதந்திர கவிதை']
          },
          {
            topic: 'சிறுகதை',
            subtopics: ['சிறுகதை வடிவம்', 'கதை பகுப்பாய்வு']
          }
        ],
        learningOutcomes: ['நவீன இலக்கியத்தை அறிதல்']
      }
    ]
  },
  {
    subjectName: 'கணக்கு',
    subjectCode: 'MATH-8',
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: 'விகித எண்கள்',
        topics: [
          {
            topic: 'விகித எண் அறிமுகம்',
            subtopics: ['விகித எண்கள்', 'விகித எண் செயல்பாடுகள்']
          }
        ],
        learningOutcomes: ['விகித எண்களை புரிந்துகொள்ளுதல்']
      },
      {
        chapterNumber: 2,
        chapterTitle: 'நேரியல் சமன்பாடுகள்',
        topics: [
          {
            topic: 'ஒரு மாறி சமன்பாடுகள்',
            subtopics: ['சமன்பாடு தீர்த்தல்', 'சமன்பாடு உருவாக்கம்']
          }
        ],
        learningOutcomes: ['நேரியல் சமன்பாடுகளை தீர்த்தல்']
      }
    ]
  }
];

// Class 9 Tamil Medium Curriculum
export const class9TamilCurriculum: TamilSubject[] = [
  {
    subjectName: 'தமிழ்',
    subjectCode: 'TAM-9',
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: 'இலக்கிய பகுப்பாய்வு',
        topics: [
          {
            topic: 'செம்மொழி இலக்கியம்',
            subtopics: ['சிலப்பதிகாரம்', 'மணிமேகலை', 'கம்பராமாயணம்']
          },
          {
            topic: 'இலக்கிய விமர்சனம்',
            subtopics: ['கதை பகுப்பாய்வு', 'கவிதை பகுப்பாய்வு']
          }
        ],
        learningOutcomes: ['இலக்கியத்தை ஆழமாக பகுப்பாய்வு செய்தல்']
      }
    ]
  },
  {
    subjectName: 'கணக்கு',
    subjectCode: 'MATH-9',
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: 'எண் முறைமைகள்',
        topics: [
          {
            topic: 'மெய் எண்கள்',
            subtopics: ['விகித எண்கள்', 'விகிதமுறா எண்கள்', 'மெய் எண் செயல்பாடுகள்']
          }
        ],
        learningOutcomes: ['மெய் எண்களை புரிந்துகொள்ளுதல்']
      },
      {
        chapterNumber: 2,
        chapterTitle: 'பல்லுறுப்புக்கோவைகள்',
        topics: [
          {
            topic: 'பல்லுறுப்புக்கோவை அறிமுகம்',
            subtopics: ['பல்லுறுப்புக்கோவை வகைகள்', 'பல்லுறுப்புக்கோவை செயல்பாடுகள்']
          }
        ],
        learningOutcomes: ['பல்லுறுப்புக்கோவைகளை கையாளுதல்']
      }
    ]
  },
  {
    subjectName: 'அறிவியல்',
    subjectCode: 'SCI-9',
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: 'பொருளின் தன்மை',
        topics: [
          {
            topic: 'பொருளின் நிலைகள்',
            subtopics: ['திண்மம்', 'திரவம்', 'வாயு', 'பிளாஸ்மா']
          }
        ],
        learningOutcomes: ['பொருளின் நிலைகளை அறிதல்']
      },
      {
        chapterNumber: 2,
        chapterTitle: 'அணுக்களும் மூலக்கூறுகளும்',
        topics: [
          {
            topic: 'அணு அமைப்பு',
            subtopics: ['எலக்ட்ரான்', 'புரோட்டான்', 'நியூட்ரான்']
          }
        ],
        learningOutcomes: ['அணு அமைப்பை புரிந்துகொள்ளுதல்']
      }
    ]
  }
];

// Class 10 Tamil Medium Curriculum
export const class10TamilCurriculum: TamilSubject[] = [
  {
    subjectName: 'தமிழ்',
    subjectCode: 'TAM-10',
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: 'செம்மொழி தமிழ்',
        topics: [
          {
            topic: 'தமிழின் பெருமை',
            subtopics: ['தமிழ் வரலாறு', 'தமிழ் இலக்கியம்', 'தமிழ் கலாச்சாரம்']
          },
          {
            topic: 'பண்டைய இலக்கியம்',
            subtopics: ['சங்க இலக்கியம்', 'காப்பியங்கள்']
          }
        ],
        learningOutcomes: ['தமிழின் பெருமையை அறிதல்']
      }
    ]
  },
  {
    subjectName: 'கணக்கு',
    subjectCode: 'MATH-10',
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: 'மெய் எண்கள்',
        topics: [
          {
            topic: 'யூக்ளிட் வகுத்தல் முறை',
            subtopics: ['மீப்பெரு பொது வகுத்தி', 'மீச்சிறு பொது மடங்கு']
          }
        ],
        learningOutcomes: ['மெய் எண் பண்புகளை அறிதல்']
      },
      {
        chapterNumber: 2,
        chapterTitle: 'இருபடி சமன்பாடுகள்',
        topics: [
          {
            topic: 'இருபடி சமன்பாடு தீர்த்தல்',
            subtopics: ['காரணிப்படுத்தல்', 'வர்க்க முறை', 'வாய்பாட்டு முறை']
          }
        ],
        learningOutcomes: ['இருபடி சமன்பாடுகளை தீர்த்தல்']
      }
    ]
  }
];

// Class 11 Tamil Medium Curriculum
export const class11TamilCurriculum: TamilSubject[] = [
  {
    subjectName: 'தமிழ்',
    subjectCode: 'TAM-11',
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: 'உயர்நிலை இலக்கியம்',
        topics: [
          {
            topic: 'நவீன தமிழ் இலக்கியம்',
            subtopics: ['நவீன கவிதை', 'நவீன சிறுகதை', 'நாவல்']
          }
        ],
        learningOutcomes: ['நவீன இலக்கியத்தை ஆழமாக அறிதல்']
      }
    ]
  },
  {
    subjectName: 'கணக்கு',
    subjectCode: 'MATH-11',
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: 'கணங்கள்',
        topics: [
          {
            topic: 'கண கோட்பாடு',
            subtopics: ['கணம்', 'துணைக்கணம்', 'கண செயல்பாடுகள்']
          }
        ],
        learningOutcomes: ['கண கோட்பாட்டை புரிந்துகொள்ளுதல்']
      },
      {
        chapterNumber: 2,
        chapterTitle: 'உறவுகளும் சார்புகளும்',
        topics: [
          {
            topic: 'சார்பு வகைகள்',
            subtopics: ['ஒன்றுக்கு ஒன்று', 'மேல்நோக்கு', 'இருபுறமும்']
          }
        ],
        learningOutcomes: ['சார்புகளை புரிந்துகொள்ளுதல்']
      }
    ]
  },
  {
    subjectName: 'இயற்பியல்',
    subjectCode: 'PHY-11',
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: 'அலகுகளும் அளவீடுகளும்',
        topics: [
          {
            topic: 'இயற்பியல் அளவுகள்',
            subtopics: ['அடிப்படை அலகுகள்', 'பெறுபேறு அலகுகள்', 'பரிமாண பகுப்பாய்வு']
          }
        ],
        learningOutcomes: ['அலகுகளை புரிந்துகொள்ளுதல்']
      }
    ]
  },
  {
    subjectName: 'வேதியியல்',
    subjectCode: 'CHEM-11',
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: 'வேதியியல் அடிப்படைகள்',
        topics: [
          {
            topic: 'அணுக்களும் மூலக்கூறுகளும்',
            subtopics: ['அணு நிறை', 'மூலக்கூறு நிறை', 'மோல் கருத்து']
          }
        ],
        learningOutcomes: ['வேதியியல் அடிப்படைகளை அறிதல்']
      }
    ]
  },
  {
    subjectName: 'உயிரியல்',
    subjectCode: 'BIO-11',
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: 'உயிர் உலகம்',
        topics: [
          {
            topic: 'உயிரினங்களின் வகைப்பாடு',
            subtopics: ['ஐந்து இராச்சியங்கள்', 'வகைப்பாட்டு படிநிலை']
          }
        ],
        learningOutcomes: ['உயிரின வகைப்பாட்டை அறிதல்']
      }
    ]
  },
  {
    subjectName: 'கணினி அறிவியல்',
    subjectCode: 'CS-11',
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: 'கணினி அடிப்படைகள்',
        topics: [
          {
            topic: 'கணினி அறிமுகம்',
            subtopics: ['வன்பொருள்', 'மென்பொருள்', 'இயக்க முறைமை']
          }
        ],
        learningOutcomes: ['கணினி அடிப்படைகளை அறிதல்']
      }
    ]
  }
];

// Class 12 Tamil Medium Curriculum
export const class12TamilCurriculum: TamilSubject[] = [
  {
    subjectName: 'தமிழ்',
    subjectCode: 'TAM-12',
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: 'மேல்நிலை இலக்கியம்',
        topics: [
          {
            topic: 'சமகால இலக்கியம்',
            subtopics: ['நவீன எழுத்தாளர்கள்', 'சமகால படைப்புகள்']
          }
        ],
        learningOutcomes: ['சமகால இலக்கியத்தை அறிதல்']
      }
    ]
  },
  {
    subjectName: 'கணக்கு',
    subjectCode: 'MATH-12',
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: 'உறவுகளும் சார்புகளும்',
        topics: [
          {
            topic: 'மேம்பட்ட சார்புகள்',
            subtopics: ['நேர்மாறு சார்பு', 'கூட்டுச் சார்பு']
          }
        ],
        learningOutcomes: ['மேம்பட்ட சார்புகளை புரிந்துகொள்ளுதல்']
      },
      {
        chapterNumber: 2,
        chapterTitle: 'நேர்மாறு முக்கோணவியல் சார்புகள்',
        topics: [
          {
            topic: 'நேர்மாறு முக்கோணவியல்',
            subtopics: ['sin⁻¹, cos⁻¹, tan⁻¹', 'பண்புகள்']
          }
        ],
        learningOutcomes: ['நேர்மாறு முக்கோணவியல் சார்புகளை அறிதல்']
      }
    ]
  },
  {
    subjectName: 'இயற்பியல்',
    subjectCode: 'PHY-12',
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: 'மின்னூட்டங்களும் புலங்களும்',
        topics: [
          {
            topic: 'மின்னூட்டம்',
            subtopics: ['கூலும் விதி', 'மின்புலம்', 'மின்னோட்டம்']
          }
        ],
        learningOutcomes: ['மின்னூட்டங்களை புரிந்துகொள்ளுதல்']
      }
    ]
  },
  {
    subjectName: 'வேதியியல்',
    subjectCode: 'CHEM-12',
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: 'திண்ம நிலை',
        topics: [
          {
            topic: 'படிக அமைப்பு',
            subtopics: ['படிக வகைகள்', 'அலகு கூடு']
          }
        ],
        learningOutcomes: ['திண்ம நிலையை அறிதல்']
      }
    ]
  },
  {
    subjectName: 'உயிரியல்',
    subjectCode: 'BIO-12',
    chapters: [
      {
        chapterNumber: 1,
        chapterTitle: 'இனப்பெருக்கம்',
        topics: [
          {
            topic: 'உயிரினங்களில் இனப்பெருக்கம்',
            subtopics: ['பாலிலா இனப்பெருக்கம்', 'பால் இனப்பெருக்கம்']
          }
        ],
        learningOutcomes: ['இனப்பெருக்கத்தை புரிந்துகொள்ளுதல்']
      }
    ]
  }
];

// Export all Tamil curriculum
export const tamilMediumCurriculum: TamilClassCurriculum[] = [
  { class: 1, subjects: class1TamilCurriculum },
  { class: 2, subjects: class2TamilCurriculum },
  { class: 3, subjects: class3TamilCurriculum },
  { class: 4, subjects: class4TamilCurriculum },
  { class: 5, subjects: class5TamilCurriculum },
  { class: 6, subjects: class6TamilCurriculum },
  { class: 7, subjects: class7TamilCurriculum },
  { class: 8, subjects: class8TamilCurriculum },
  { class: 9, subjects: class9TamilCurriculum },
  { class: 10, subjects: class10TamilCurriculum },
  { class: 11, subjects: class11TamilCurriculum },
  { class: 12, subjects: class12TamilCurriculum }
];

// Helper function to get curriculum by class
export function getTamilCurriculumByClass(classNumber: number): TamilSubject[] {
  const curriculum = tamilMediumCurriculum.find(c => c.class === classNumber);
  return curriculum?.subjects || [];
}

// Helper function to get all subjects across all classes
export function getAllTamilSubjects(): string[] {
  const subjects = new Set<string>();
  tamilMediumCurriculum.forEach(classCurr => {
    classCurr.subjects.forEach(subject => {
      subjects.add(subject.subjectName);
    });
  });
  return Array.from(subjects);
}

// Helper function to get chapter count by class
export function getTamilChapterCount(classNumber: number): number {
  const subjects = getTamilCurriculumByClass(classNumber);
  return subjects.reduce((total, subject) => total + subject.chapters.length, 0);
}
