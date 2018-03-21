export interface Person {
    PersonId: number;
    Firstname: string;
    MiddleName: string;
    Lastname: string;
    Mrmrs: string;
    Title: string;
    UpdatedDate: string;
    CreatedDate: string;
    BirthDate: string;
    CreatedBy: AssociateEntityFields;
    Emails?: (EntityElement)[] | null;
    Description: string;
    IsAssociate: boolean;
    PrivatePhones?: (EntityElement)[] | null;
    Faxes?: (EntityElement)[] | null;
    MobilePhones?: (EntityElement)[] | null;
    OfficePhones?: (EntityElement)[] | null;
    OtherPhones?: (EntityElement)[] | null;
    Position: SimpleElement;
    UpdatedBy: AssociateEntityFields;
    Contact: Contact;
    Country: Country;
    Interests?: (InterestElement)[] | null;
    PersonNumber: string;
    FullName: string;
    NoMailing: boolean;
    UsePersonAddress: boolean;
    Retired: boolean;
    Urls?: (EntityElement)[] | null;
    FormalName: string;
    Address: Address;
    Post3: string;
    Post2: string;
    Post1: string;
    Kanalname: string;
    Kanafname: string;
    CorrespondingAssociate: AssociateEntityFields;
    Category: SimpleElement;
    Business: SimpleElement;
    Associate: AssociateEntityFields;
    Salutation: string;
    ActiveInterests: number;
    SupportAssociate: AssociateEntityFields;
    TicketPriority: SimpleElement;
    CustomerLanguage: SimpleElement;
    DbiAgentId: number;
    DbiKey: string;
    DbiLastModified: string;
    DbiLastSyncronized: string;
    SentInfo: number;
    ShowContactTickets: number;
    UserInfo: UserInfo;
    ChatEmails?: (EntityElement)[] | null;
    InternetPhones?: (EntityElement)[] | null;
    Source: number;
    ActiveErpLinks: number;
    Mailingtypes?: (InterestElement)[] | null;
    Consents?: (ConsentsEntity)[] | null;
    UserDefinedFields: UserDefinedFields;
    ExtraFields: ExtraFields;
  }
  export interface AssociateEntityFields {
    AssociateId: number;
    Name: string;
    PersonId: number;
    Rank: number;
    Tooltip: string;
    Type: string;
    GroupIdx: number;
    FullName: string;
    FormalName: string;
    Deleted: boolean;
    EjUserId: number;
  }
  export interface EntityElement {
    Value: string;
    StrippedValue: string;
    Description: string;
  }
  export interface SimpleElement {
    Id: number;
    Value: string;
    Tooltip: string;
  }
  export interface Contact {
    ContactId: number;
    Name: string;
    OrgNr: string;
    Department: string;
    URL: string;
    City: string;
    DirectPhone: string;
    AssociateId: number;
    CountryId: number;
    EmailAddress: string;
    Kananame: string;
    EmailAddressName: string;
    URLName: string;
    AssociateFullName: string;
    BusinessName: string;
    CategoryName: string;
    CountryName: string;
    Address: AddressOrChildItemsEntity;
    FormattedAddress: string;
    FullName: string;
    IsOwnerContact: boolean;
    ActiveErpLinks: number;
  }
  export interface AddressOrChildItemsEntity {
  }
  export interface Country {
    CountryId: number;
    Name: string;
    CurrencyId: number;
    EnglishName: string;
    TwoLetterISOCountry: string;
    ThreeLetterISOCountry: string;
    ImageDescription: string;
    OrgNrText: string;
    InterAreaPrefix: string;
    DialInPrefix: string;
    ZipPrefix: string;
    DomainName: string;
    AddressLayoutId: number;
    DomesticAddressLayoutId: number;
    ForeignAddressLayoutId: number;
    Rank: number;
    Tooltip: string;
    Deleted: boolean;
  }
  export interface InterestElement {
    Id: number;
    Name: string;
    ToolTip: string;
    Deleted: boolean;
    Rank: number;
    Type: string;
    ColorBlock: number;
    IconHint: string;
    Selected: boolean;
    LastChanged: string;
    ChildItems?: (AddressOrChildItemsEntity)[] | null;
    ExtraInfo: string;
    StyleHint: string;
    Hidden: boolean;
    FullName: string;
  }
  export interface Address {
    Wgs84Latitude: number;
    Wgs84Longitude: number;
    LocalizedAddress?: ((LocalizedAddress)[] | null)[] | null;
  }
  export interface LocalizedAddress {
    Name: string;
    Value: string;
    Tooltip: string;
    Label: string;
    ValueLength: number;
    AddressType: string;
  }
  export interface UserInfo {
    Deleted: boolean;
    UserInfoId: number;
    UserName: string;
    PersonId: number;
    Rank: number;
    Tooltip: string;
    UserGroupId: number;
    EjUserId: number;
    UserType: string;
    GrantedLicenses?: (string)[] | null;
    CanLogon: boolean;
    RoleName: string;
    RoleTooltip: string;
    UserGroupName: string;
    UserGroupTooltip: string;
  }
  export interface ConsentsEntity {
    ConsentPersonId: number;
    ValidFrom: string;
    Registered: string;
    RegisteredAssociateId: number;
    LegalBaseId: number;
    LegalBaseKey: string;
    LegalBaseName: string;
    ConsentPurposeId: number;
    ConsentPurposeKey: string;
    ConsentPurposeName: string;
    ConsentSourceId: number;
    ConsentSourceKey: string;
    ConsentSourceName: string;
  }
  export interface UserDefinedFields {
  }
  export interface ExtraFields {
    ExtraFields1: string;
    ExtraFields2: string;
  }
