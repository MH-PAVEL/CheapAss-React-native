import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Typography } from "../theme/Typography";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../styles/globalStyles";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

export default function Privacy() {
  const number4Circle = [
    "Create and manage user accounts",
    "Fulfill and manage orders",
    "Deliver products or services",
    "Improve products and services",
    "Send product and service updates",
    "Respond to inquiries and offer support",
    "Request user feedback",
    "Improve user experience",
    "Enforce terms and conditions and policies",
    "Protect from abuse and malicious users",
    "Respond to legal requests and prevent harm",
    "Run and operate the Mobile Application and Services",
  ];
  const number7Circle = [
    "Cloud computing services",
    "Data storage services",
    "Payment processors",
    "User authentication services",
  ];

  const data = [
    "Account details (such as user name, unique user ID, password, etc)",
    "Contact information (such as email address, phone number, etc)",
    "Basic personal information (such as name, country of residence, etc)",
    "Payment information (such as credit card details, bank details, etc)",
    "Geolocation data of your device (such as latitude and longitude)",
  ];
  const navigation: any = useNavigation();
  return (
    <SafeAreaView
      style={{
        padding: 16,
      }}
    >
      <ScrollView>
        <View
          style={[
            globalStyles.header,
            {
              paddingHorizontal: 0,
              alignItems: "center",
              marginBottom: 16,
            },
          ]}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.h1}>Privacy policy</Text>
          <View></View>
        </View>
        <Text style={styles.description}>
          We respect your privacy and are committed to protecting it through our
          compliance with this privacy policy (“Policy”). This Policy describes
          the types of information we may collect from you or that you may
          provide (“Personal Information”) in the “CheapAss” mobile application
          (“Mobile Application” or “Service”) and any of its related products
          and services (collectively, “Services”), and our practices for
          collecting, using, maintaining, protecting, and disclosing that
          Personal Information. It also describes the choices available to you
          regarding our use of your Personal Information and how you can access
          and update it.
        </Text>
        <Text style={styles.description}>
          This Policy is a legally binding agreement between you (“User”, “you”
          or “your”) and DashnChatLLC (“DashnChatLLC”, “we”, “us” or “our”). If
          you are entering into this agreement on behalf of a business or other
          legal entity, you represent that you have the authority to bind such
          entity to this agreement, in which case the terms “User”, “you” or
          “your” shall refer to such entity. If you do not have such authority,
          or if you do not agree with the terms of this agreement, you must not
          accept this agreement and may not access and use the Mobile
          Application and Services. By accessing and using the Mobile
          Application and Services, you acknowledge that you have read,
          understood, and agree to be bound by the terms of this Policy. This
          Policy does not apply to the practices of companies that we do not own
          or control, or to individuals that we do not employ or manage.
        </Text>
        <View>
          <Text style={styles.h3}>Table of contents</Text>

          <Text style={[styles.description, styles.a]}>
            1. Automatic collection of information
          </Text>
          <Text style={[styles.description, styles.a]}>
            2.Collection of personal information
          </Text>
          <Text style={[styles.description, styles.a]}>
            3. Privacy of children
          </Text>
          <Text style={[styles.description, styles.a]}>
            4. Use and processing of collected information
          </Text>
          <Text style={[styles.description, styles.a]}>
            5. Payment processing
          </Text>
          <Text style={[styles.description, styles.a]}>
            6. Managing information
          </Text>
          <Text style={[styles.description, styles.a]}>
            7. Disclosure of information
          </Text>
          <Text style={[styles.description, styles.a]}>
            8. Retention of information
          </Text>
          <Text style={[styles.description, styles.a]}>
            9. Transfer of information
          </Text>
          <Text style={[styles.description, styles.a]}>
            10. Data protection rights under the GDPR
          </Text>
          <Text style={[styles.description, styles.a]}>
            11. California privacy rights
          </Text>
          <Text style={[styles.description, styles.a]}>
            12. How to exercise your rights
          </Text>
          <Text style={[styles.description, styles.a]}>13. Data analytics</Text>
          <Text style={[styles.description, styles.a]}>
            14. Social media features
          </Text>
          <Text style={[styles.description, styles.a]}>
            15. Links to other resources
          </Text>
          <Text style={[styles.description, styles.a]}>
            16. Information security
          </Text>
          <Text style={[styles.description, styles.a]}>17. Data breach</Text>
          <Text style={[styles.description, styles.a]}>
            18.Changes and amendments
          </Text>
          <Text style={[styles.description, styles.a]}>
            19. Acceptance of this policy
          </Text>
          <Text style={[styles.description, styles.a]}>20. Contacting us</Text>
        </View>
        <View>
          <Text style={styles.h2}>Automatic collection of information</Text>
          <Text style={styles.description}>
            When you use the Mobile Application, our servers automatically
            record information that your device sends. This data may include
            information such as your device’s IP address and location, device
            name and version, operating system type and version, language
            preferences, information you search for in the Mobile Application,
            access times and dates, and other statistics.
          </Text>
          <Text style={styles.description}>
            Information collected automatically is used only to identify
            potential cases of abuse and establish statistical information
            regarding the usage of the Mobile Application and Services. This
            statistical information is not otherwise aggregated in such a way
            that would identify any particular User of the system.
          </Text>
        </View>
        <View>
          <Text style={styles.h2}>Collection of personal information</Text>
          <Text style={styles.description}>
            You can access and use the Mobile Application and Services without
            telling us who you are or revealing any information by which someone
            could identify you as a specific, identifiable individual. If,
            however, you wish to use some of the features offered in the Mobile
            Application, you may be asked to provide certain Personal
            Information (for example, your name and e-mail address).
          </Text>
          <Text style={styles.description}>
            We receive and store any information you knowingly provide to us
            when you create an account, publish content, make a purchase, or
            fill any forms in the Mobile Application. When required, this
            information may include the following:
          </Text>
          {data.map((item, index) => (
            <View
              key={index}
              style={[
                styles.flex_container,
                {
                  alignItems: "center",
                },
              ]}
            >
              <View style={styles.circle} />
              <Text
                style={[
                  styles.description,
                  {
                    marginBottom: 0,
                    marginLeft: 8,
                    fontSize: 12,
                  },
                ]}
              >
                {item}
              </Text>
            </View>
          ))}
          <Text
            style={[
              styles.description,
              {
                marginTop: 16,
              },
            ]}
          >
            Some of the information we collect is directly from you via the
            Mobile Application and Services. However, we may also collect
            Personal Information about you from other sources such as social
            media platforms and our joint partners. Personal Information we
            collect from other sources may include demographic information, such
            as age and gender, device information, such as IP addresses,
            location, such as city and state, and online behavioral data, such
            as information about your use of social media websites, page view
            information and search results and links.
          </Text>
          <Text style={styles.description}>
            You can choose not to provide us with your Personal Information, but
            then you may not be able to take advantage of some of the features
            in the Mobile Application. Users who are uncertain about what
            information is mandatory are welcome to contact us.
          </Text>
        </View>
        <View>
          <Text style={styles.h2}>Privacy of children</Text>
          <Text style={styles.description}>
            We do not knowingly collect any Personal Information from children
            under the age of 13. If you are under the age of 13, please do not
            submit any Personal Information through the Mobile Application and
            Services. If you have reason to believe that a child under the age
            of 13 has provided Personal Information to us through the Mobile
            Application and Services, please contact us to request that we
            delete that child’s Personal Information from our Services.
          </Text>
          <Text style={styles.description}>
            We encourage parents and legal guardians to monitor their children’s
            Internet usage and to help enforce this Policy by instructing their
            children never to provide Personal Information through the Mobile
            Application and Services without their permission. We also ask that
            all parents and legal guardians overseeing the care of children take
            the necessary precautions to ensure that their children are
            instructed to never give out Personal Information when online
            without their permission.
          </Text>
        </View>
        <View>
          <Text style={styles.h2}>
            Use and processing of collected information
          </Text>
          <Text style={styles.description}>
            We act as a data controller and a data processor in terms of the
            GDPR when handling Personal Information, unless we have entered into
            a data processing agreement with you in which case you would be the
            data controller and we would be the data processor.
          </Text>
          <Text style={styles.description}>
            Our role may also differ depending on the specific situation
            involving Personal Information. We act in the capacity of a data
            controller when we ask you to submit your Personal Information that
            is necessary to ensure your access and use of the Mobile Application
            and Services. In such instances, we are a data controller because we
            determine the purposes and means of the processing of Personal
            Information and we comply with data controllers’ obligations set
            forth in the GDPR.
          </Text>
          <Text style={styles.description}>
            We act in the capacity of a data processor in situations when you
            submit Personal Information through the Mobile Application and
            Services. We do not own, control, or make decisions about the
            submitted Personal Information, and such Personal Information is
            processed only in accordance with your instructions. In such
            instances, the User providing Personal Information acts as a data
            controller in terms of the GDPR.
          </Text>
          <Text style={styles.description}>
            In order to make the Mobile Application and Services available to
            you, or to meet a legal obligation, we may need to collect and use
            certain Personal Information. If you do not provide the information
            that we request, we may not be able to provide you with the
            requested products or services. Any of the information we collect
            from you may be used for the following purposes:
          </Text>
          {number4Circle.map((item, index) => (
            <View
              key={index}
              style={[
                styles.flex_container,
                {
                  alignItems: "center",
                },
              ]}
            >
              <View style={styles.circle} />
              <Text
                style={[
                  styles.description,
                  {
                    marginBottom: 0,
                    marginLeft: 8,
                  },
                ]}
              >
                {item}
              </Text>
            </View>
          ))}
          <Text
            style={[
              styles.description,
              {
                marginTop: 16,
              },
            ]}
          >
            Processing your Personal Information depends on how you interact
            with the Mobile Application and Services, where you are located in
            the world and if one of the following applies: (i) you have given
            your consent for one or more specific purposes; this, however, does
            not apply, whenever the processing of Personal Information is
            subject to California Consumer Privacy Act or European data
            protection law; (ii) provision of information is necessary for the
            performance of an agreement with you and/or for any pre-contractual
            obligations thereof; (iii) processing is necessary for compliance
            with a legal obligation to which you are subject; (iv) processing is
            related to a task that is carried out in the public interest or in
            the exercise of official authority vested in us; (v) processing is
            necessary for the purposes of the legitimate interests pursued by us
            or by a third party.
          </Text>
          <Text style={styles.description}>
            We rely on user’s consent as a legal base as defined in the GDPR
            upon which we collect and process your Personal Information.
          </Text>
          <Text style={styles.description}>
            We rely on user’s consent as a legal base as defined in the GDPR
            upon which we collect and process your Personal Information.
          </Text>
          <Text style={styles.description}>
            Note that under some legislations we may be allowed to process
            information until you object to such processing by opting out,
            without having to rely on consent or any other of the legal bases
            above. In any case, we will be happy to clarify the specific legal
            basis that applies to the processing, and in particular whether the
            provision of Personal Information is a statutory or contractual
            requirement, or a requirement necessary to enter into a contract.
          </Text>
        </View>
        <View>
          <Text style={styles.h2}>Payment processing</Text>
          <Text style={styles.description}>
            In case of Services requiring payment, you may need to provide your
            credit card details or other payment account information, which will
            be used solely for processing payments. We use third-party payment
            processors (“Payment Processors”) to assist us in processing your
            payment information securely.
          </Text>
          <Text style={styles.description}>
            Payment Processors adhere to the latest security standards as
            managed by the PCI Security Standards Council, which is a joint
            effort of brands like Visa, MasterCard, American Express and
            Discover. Sensitive and private data exchange happens over a SSL
            secured communication channel and is encrypted and protected with
            digital signatures, and the Mobile Application and Services are also
            in compliance with strict vulnerability standards in order to create
            as secure of an environment as possible for Users. We will share
            payment data with the Payment Processors only to the extent
            necessary for the purposes of processing your payments, refunding
            such payments, and dealing with complaints and queries related to
            such payments and refunds.
          </Text>
          <Text style={styles.description}>
            Please note that the Payment Processors may collect some Personal
            Information from you, which allows them to process your payments
            (e.g., your email address, address, credit card details, and bank
            account number) and handle all the steps in the payment process
            through their systems, including data collection and data
            processing. Where necessary for processing future or recurring
            payments and subject to your prior consent, your financial
            information will be stored in encrypted form on secure servers of
            our Payment Processors. The Payment Processors’ use of your Personal
            Information is governed by their respective privacy policies which
            may or may not contain privacy protections as protective as this
            Policy. We suggest that you review their respective privacy
            policies.
          </Text>
        </View>
        <View>
          <Text style={styles.h2}>Managing information</Text>
          <Text style={styles.description}>
            You are able to delete certain Personal Information we have about
            you. The Personal Information you can delete may change as the
            Mobile Application and Services change. When you delete Personal
            Information, however, we may maintain a copy of the unrevised
            Personal Information in our records for the duration necessary to
            comply with our obligations to our affiliates and partners, and for
            the purposes described below. If you would like to delete your
            Personal Information or permanently delete your account, you can do
            so on the settings page of your account in the Mobile Application.
          </Text>
        </View>
        <View>
          <Text style={styles.h2}>Disclosure of information</Text>
          <Text style={styles.description}>
            Depending on the requested Services or as necessary to complete any
            transaction or provide any Service you have requested, we may share
            your information with our affiliates, contracted companies, and
            service providers (collectively, “Service Providers”) we rely upon
            to assist in the operation of the Mobile Application and Services
            available to you and whose privacy policies are consistent with ours
            or who agree to abide by our policies with respect to Personal
            Information. We will not share any personally identifiable
            information with third parties and will not share any information
            with unaffiliated third parties.
          </Text>
          <Text style={styles.description}>
            Service Providers are not authorized to use or disclose your
            information except as necessary to perform services on our behalf or
            comply with legal requirements. Service Providers are given the
            information they need only in order to perform their designated
            functions, and we do not authorize them to use or disclose any of
            the provided information for their own marketing or other purposes.
            We will share and disclose your information only with the following
            categories of Service Providers:
          </Text>
          {number7Circle.map((item, index) => (
            <View
              key={index}
              style={[
                styles.flex_container,
                {
                  alignItems: "center",
                },
              ]}
            >
              <View style={styles.circle} />
              <Text
                style={[
                  styles.description,
                  {
                    marginBottom: 0,
                    marginLeft: 8,
                  },
                ]}
              >
                {item}
              </Text>
            </View>
          ))}
          <Text
            style={[
              styles.description,
              {
                marginTop: 16,
              },
            ]}
          >
            We may also disclose any Personal Information we collect, use or
            receive if required or permitted by law, such as to comply with a
            subpoena or similar legal process, and when we believe in good faith
            that disclosure is necessary to protect our rights, protect your
            safety or the safety of others, investigate fraud, or respond to a
            government request.
          </Text>
        </View>
        <View>
          <Text style={styles.h2}>Retention of information</Text>
          <Text style={styles.description}>
            We will retain and use your Personal Information for the period
            necessary to comply with our legal obligations, as long as your user
            account remains active, to enforce our agreements, resolve disputes,
            and unless a longer retention period is required or permitted by
            law.
          </Text>
          <Text style={styles.description}>
            We may use any aggregated data derived from or incorporating your
            Personal Information after you update or delete it, but not in a
            manner that would identify you personally. Once the retention period
            expires, Personal Information shall be deleted. Therefore, the right
            to access, the right to erasure, the right to rectification, and the
            right to data portability cannot be enforced after the expiration of
            the retention period.
          </Text>
        </View>
        <View>
          <Text style={styles.h2}>Transfer of information</Text>
          <Text style={styles.description}>
            Depending on your location, data transfers may involve transferring
            and storing your information in a country other than your own,
            including USA. The transfer of your Personal Information to
            countries outside the European Union will be made only if you have
            explicitly consented to it or in the cases provided for by the GDPR
            and will be processed in your interest.
          </Text>
          <Text style={styles.description}>
            You are entitled to learn about the legal basis of information
            transfers to a country outside the European Union or to any
            international organization governed by public international law or
            set up by two or more countries, such as the UN, and about the
            security measures taken by us to safeguard your information. If any
            such transfer takes place, you can find out more by checking the
            relevant sections of this Policy or inquire with us using the
            information provided in the contact section.
          </Text>
        </View>
        <View>
          <Text style={styles.h2}>Data protection rights under the GDPR</Text>
          <Text style={styles.description}>
            If you are a resident of the European Economic Area (“EEA”), you
            have certain data protection rights and we aim to take reasonable
            steps to allow you to correct, amend, delete, or limit the use of
            your Personal Information. If you wish to be informed what Personal
            Information we hold about you and if you want it to be removed from
            our systems, please contact us. In certain circumstances, you have
            the following data protection rights:
          </Text>
          <Text style={styles.description}>
            (i) You have the right to withdraw consent where you have previously
            given your consent to the processing of your Personal Information.
            To the extent that the legal basis for our processing of your
            Personal Information is consent, you have the right to withdraw that
            consent at any time. Withdrawal will not affect the lawfulness of
            processing before the withdrawal.
          </Text>
          <Text style={styles.description}>
            (ii) You have the right to learn if your Personal Information is
            being processed by us, obtain disclosure regarding certain aspects
            of the processing, and obtain a copy of your Personal Information
            undergoing processing.
          </Text>
          <Text style={styles.description}>
            (iii) You have the right to verify the accuracy of your information
            and ask for it to be updated or corrected. You also have the right
            to request us to complete the Personal Information you believe is
            incomplete.
          </Text>
          <Text style={styles.description}>
            (iv) You have the right to object to the processing of your
            information if the processing is carried out on a legal basis other
            than consent. Where Personal Information is processed for the public
            interest, in the exercise of an official authority vested in us, or
            for the purposes of the legitimate interests pursued by us, you may
            object to such processing by providing a ground related to your
            particular situation to justify the objection.
          </Text>
          <Text style={styles.description}>
            (v) You have the right, under certain circumstances, to restrict the
            processing of your Personal Information. These circumstances
            include: the accuracy of your Personal Information is contested by
            you and we must verify its accuracy; the processing is unlawful, but
            you oppose the erasure of your Personal Information and request the
            restriction of its use instead; we no longer need your Personal
            Information for the purposes of processing, but you require it to
            establish, exercise or defend your legal claims; you have objected
            to processing pending the verification of whether our legitimate
            grounds override your legitimate grounds. Where processing has been
            restricted, such Personal Information will be marked accordingly
            and, with the exception of storage, will be processed only with your
            consent or for the establishment, to exercise or defense of legal
            claims, for the protection of the rights of another natural, or
            legal person or for reasons of important public interest.
          </Text>
          <Text style={styles.description}>
            (vi) You have the right, under certain circumstances, to obtain the
            erasure of your Personal Information from us. These circumstances
            include: the Personal Information is no longer necessary in relation
            to the purposes for which it was collected or otherwise processed;
            you withdraw consent to consent-based processing; you object to the
            processing under certain rules of applicable data protection law;
            the processing is for direct marketing purposes; and the personal
            data have been unlawfully processed. However, there are exclusions
            of the right to erasure such as where processing is necessary: for
            exercising the right of freedom of expression and information; for
            compliance with a legal obligation; or for the establishment, to
            exercise or defense of legal claims.
          </Text>
          <Text style={styles.description}>
            (vii) You have the right to receive your Personal Information that
            you have provided to us in a structured, commonly used, and
            machine-readable format and, if technically feasible, to have it
            transmitted to another controller without any hindrance from us,
            provided that such transmission does not adversely affect the rights
            and freedoms of others.
          </Text>
          <Text style={styles.description}>
            (viii) You have the right to complain to a data protection authority
            about our collection and use of your Personal Information. If you
            are not satisfied with the outcome of your complaint directly with
            us, you have the right to lodge a complaint with your local data
            protection authority. For more information, please contact your
            local data protection authority in the EEA. This provision is
            applicable provided that your Personal Information is processed by
            automated means and that the processing is based on your consent, on
            a contract which you are part of, or on pre-contractual obligations
            thereof.
          </Text>
        </View>
        <View>
          <Text style={styles.h2}>California privacy rights</Text>
          <Text style={styles.description}>
            Consumers residing in California are afforded certain additional
            rights with respect to their Personal Information under the
            California Consumer Privacy Act (“CCPA”). If you are a California
            resident, this section applies to you.
          </Text>
          <Text style={styles.description}>
            In addition to the rights as explained in this Policy, California
            residents who provide Personal Information as defined in the statute
            to obtain Services for personal, family, or household use are
            entitled to request and obtain from us, once a calendar year,
            information about the categories and specific pieces of Personal
            Information we have collected and disclosed.
          </Text>
          <Text style={styles.description}>
            Furthermore, California residents have the right to request deletion
            of their Personal Information or opt-out of the sale of their
            Personal Information which may include selling, disclosing, or
            transferring Personal Information to another business or a third
            party for monetary or other valuable consideration. To do so, simply
            contact us. We will not discriminate against you if you exercise
            your rights under the CCPA.
          </Text>
        </View>
        <View>
          <Text style={styles.h2}>How to exercise your rights</Text>
          <Text style={styles.description}>
            Any requests to exercise your rights can be directed to us through
            the contact details provided in this document. Please note that we
            may ask you to verify your identity before responding to such
            requests. Your request must provide sufficient information that
            allows us to verify that you are the person you are claiming to be
            or that you are the authorized representative of such person. If we
            receive your request from an authorized representative, we may
            request evidence that you have provided such an authorized
            representative with power of attorney or that the authorized
            representative otherwise has valid written authority to submit
            requests on your behalf.
          </Text>
          <Text style={styles.description}>
            You must include sufficient details to allow us to properly
            understand the request and respond to it. We cannot respond to your
            request or provide you with Personal Information unless we first
            verify your identity or authority to make such a request and confirm
            that the Personal Information relates to you.
          </Text>
        </View>
        <View>
          <Text style={styles.h2}>Data analytics</Text>
          <Text style={styles.description}>
            Our Mobile Application and Services may use third-party analytics
            tools that use cookies, web beacons, or other similar
            information-gathering technologies to collect standard internet
            activity and usage information. The information gathered is used to
            compile statistical reports on User activity such as how often Users
            visit our Mobile Application and Services, what pages they visit and
            for how long, etc. We use the information obtained from these
            analytics tools to monitor the performance and improve our Mobile
            Application and Services. We do not use third-party analytics tools
            to track or to collect any personally identifiable information of
            our Users and we will not associate any information gathered from
            the statistical reports with any individual User.
          </Text>
        </View>
        <View>
          <Text style={styles.h2}>Social media features</Text>
          <Text style={styles.description}>
            Our Mobile Application and Services may include social media
            features, such as the Facebook and Twitter buttons, Share This
            buttons, etc (collectively, “Social Media Features”). These Social
            Media Features may collect your IP address, what page you are
            visiting on our Mobile Application and Services, and may set a
            cookie to enable Social Media Features to function properly. Social
            Media Features are hosted either by their respective providers or
            directly on our Mobile Application and Services. Your interactions
            with these Social Media Features are governed by the privacy policy
            of their respective providers.
          </Text>
        </View>
        <View>
          <Text style={styles.h2}>Links to other resources</Text>
          <Text style={styles.description}>
            The Mobile Application and Services contain links to other resources
            that are not owned or controlled by us. Please be aware that we are
            not responsible for the privacy practices of such other resources or
            third parties. We encourage you to be aware when you leave the
            Mobile Application and Services and to read the privacy statements
            of each and every resource that may collect Personal Information.
          </Text>
        </View>
        <View>
          <Text style={styles.h2}>Information security</Text>
          <Text style={styles.description}>
            We secure information you provide on computer servers in a
            controlled, secure environment, protected from unauthorized access,
            use, or disclosure. We maintain reasonable administrative,
            technical, and physical safeguards in an effort to protect against
            unauthorized access, use, modification, and disclosure of Personal
            Information in our control and custody. However, no data
            transmission over the Internet or wireless network can be
            guaranteed.
          </Text>
          <Text style={styles.description}>
            Therefore, while we strive to protect your Personal Information, you
            acknowledge that (i) there are security and privacy limitations of
            the Internet which are beyond our control; (ii) the security,
            integrity, and privacy of any and all information and data exchanged
            between you and the Mobile Application and Services cannot be
            guaranteed; and (iii) any such information and data may be viewed or
            tampered with in transit by a third party, despite best efforts.
          </Text>
          <Text style={styles.description}>
            As the security of Personal Information depends in part on the
            security of the device you use to communicate with us and the
            security you use to protect your credentials, please take
            appropriate measures to protect this information.
          </Text>
        </View>
        <View>
          <Text style={styles.h2}>Data breach</Text>
          <Text style={styles.description}>
            In the event we become aware that the security of the Mobile
            Application and Services has been compromised or Users’ Personal
            Information has been disclosed to unrelated third parties as a
            result of external activity, including, but not limited to, security
            attacks or fraud, we reserve the right to take reasonably
            appropriate measures, including, but not limited to, investigation
            and reporting, as well as notification to and cooperation with law
            enforcement authorities. In the event of a data breach, we will make
            reasonable efforts to notify affected individuals if we believe that
            there is a reasonable risk of harm to the User as a result of the
            breach or if notice is otherwise required by law. When we do, we
            will send you an email.
          </Text>
        </View>
        <View>
          <Text style={styles.h2}>Changes and amendments</Text>
          <Text style={styles.description}>
            We reserve the right to modify this Policy or its terms related to
            the Mobile Application and Services at any time at our discretion.
            When we do, we will send you an email to notify you. We may also
            provide notice to you in other ways at our discretion, such as
            through the contact information you have provided.
          </Text>
          <Text style={styles.description}>
            An updated version of this Policy will be effective immediately upon
            the posting of the revised Policy unless otherwise specified. Your
            continued use of the Mobile Application and Services after the
            effective date of the revised Policy (or such other act specified at
            that time) will constitute your consent to those changes. However,
            we will not, without your consent, use your Personal Information in
            a manner materially different than what was stated at the time your
            Personal Information was collected.
          </Text>
        </View>
        <View>
          <Text style={styles.h2}>Acceptance of this policy</Text>
          <Text style={styles.description}>
            You acknowledge that you have read this Policy and agree to all its
            terms and conditions. By accessing and using the Mobile Application
            and Services and submitting your information you agree to be bound
            by this Policy. If you do not agree to abide by the terms of this
            Policy, you are not authorized to access or use the Mobile
            Application and Services.
          </Text>
        </View>
        <View>
          <Text style={styles.h2}>Contacting us</Text>
          <Text style={styles.description}>
            If you have any questions, concerns, or complaints regarding this
            Agreement, we encourage you to contact us using the details below:
          </Text>
          <Text style={styles.description}>support@cheapass.app</Text>
          <Text style={styles.description}>
            We will attempt to resolve complaints and disputes and make every
            reasonable effort to honor your wish to exercise your rights as
            quickly as possible and in any event, within the timescales provided
            by applicable data protection laws.
          </Text>
          <Text style={styles.description}>
            This document was last updated on June 5, 2023
          </Text>

          <Image
            source={{
              uri: "https://cdn.websitepolicies.io/img/badge.png",
            }}
            style={{
              width: 200,
              height: 50,
              resizeMode: "contain",
            }}
          />
          <View
            style={{
              marginBottom: 30,
            }}
          ></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  description: {
    fontSize: 14,
    color: "white",
    fontFamily: Typography.regular,
    marginBottom: 16,
  },
  h1: {
    fontSize: 28,
    color: "white",
    fontFamily: Typography.bold,
  },
  h2: {
    fontSize: 24,
    color: "white",
    fontFamily: Typography.bold,
    marginBottom: 16,
  },
  h3: {
    fontSize: 20,
    color: "white",
    fontFamily: Typography.bold,
    marginBottom: 16,
  },
  a: {
    color: "lightblue",
    marginBottom: 8,
  },
  circle: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 8,
    backgroundColor: "#fff",
    width: 8,
    height: 8,
  },
  flex_container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
