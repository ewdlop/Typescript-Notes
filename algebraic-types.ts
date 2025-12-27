/**
 * Algebraic Type Operations in TypeScript
 * 
 * This file demonstrates various algebraic operations on types:
 * - Sum types (Union types)
 * - Product types (Intersection types)
 * - Quotient types (Type division/factoring)
 * - Subtraction types (Type removal)
 */

// ============================================================================
// Sum Types (Union Types): A + B
// Mathematical analogy: 1 + 2 = 3
// Chinese character analogy: 一 + 二 = 三
// ============================================================================

/**
 * Sum type represents "either A or B"
 * Like addition: the result can be one of the addends
 */
type One = { value: 1; name: "一" };
type Two = { value: 2; name: "二" };
type Three = One | Two; // Sum type: 一 + 二 = 三

// Example: A value of type Three can be either One or Two
const exampleOne: Three = { value: 1, name: "一" };
const exampleTwo: Three = { value: 2, name: "二" };

// More practical sum type examples
type Success = { status: "success"; data: string };
type Error = { status: "error"; message: string };
type Result = Success | Error; // Sum type

// ============================================================================
// Product Types (Intersection Types): A × B
// Chinese character composition: 一 + 二 = 王 (visual combination)
// ============================================================================

/**
 * Product type represents "both A and B"
 * Like multiplication: combines all properties
 * The Chinese character 王 visually contains elements that look like
 * combining horizontal strokes (一) and vertical elements (二)
 */
type HorizontalStroke = { horizontal: string };
type VerticalElements = { vertical: string };
type King = HorizontalStroke & VerticalElements; // Product type: 一 × 二 = 王

const wang: King = {
    horizontal: "一",
    vertical: "丨",
};

// More practical product type examples
type HasName = { name: string };
type HasAge = { age: number };
type Person = HasName & HasAge; // Product type

const person: Person = {
    name: "Zhang",
    age: 30,
};

// ============================================================================
// Quotient Types (Type Division/Factoring)
// Chinese character: 田 (field/division)
// ============================================================================

/**
 * Quotient types represent factoring out common structure
 * The character 田 can be seen as divided into 4 parts
 * In type theory, this is similar to identifying equivalent types
 */

// Example: Factoring out common properties
type WithId<T> = T & { id: number };

// Original types
type UserData = { name: string; email: string };
type ProductData = { title: string; price: number };

// Quotient: Factor out the ID pattern
type User = WithId<UserData>;
type Product = WithId<ProductData>;

const user: User = { id: 1, name: "Li", email: "li@example.com" };
const product: Product = { id: 101, title: "Book", price: 29.99 };

// Another quotient example: branded types (nominal typing)
type Field = string & { __brand: "Field" };
type CreateField = (s: string) => Field;

// Note: Type assertion is safe here as we're creating a branded type for compile-time checking only
// The __brand property is a phantom type that doesn't exist at runtime
const createField: CreateField = (s) => s as Field;

// ============================================================================
// Subtraction Types (Type Removal)
// Chinese character example: 愛 - 心 = 爱 (love - heart = simplified love)
// ============================================================================

/**
 * Subtraction types remove properties or constituents from types
 * In Chinese: 愛 (traditional love) - 心 (heart) = 爱 (simplified love)
 * In TypeScript: use Omit to remove properties, Exclude to remove from unions
 */

// Example 1: Omit (removing properties from object types)
type TraditionalLove = {
    heart: string; // 心
    friend: string; // 友
    grace: string; // 夂
    cover: string; // 冖
};

type SimplifiedLove = Omit<TraditionalLove, "heart">; // 愛 - 心 = 爱

const traditionalLove: TraditionalLove = {
    heart: "心",
    friend: "友",
    grace: "夂",
    cover: "冖",
};

const simplifiedLove: SimplifiedLove = {
    friend: "友",
    grace: "夂",
    cover: "冖",
};

// Example 2: Exclude (removing types from unions)
type ChineseCharacter = "愛" | "心" | "爱";
type WithoutHeart = Exclude<ChineseCharacter, "心">; // Removes 心 from the union

// WithoutHeart can be either "愛" or "爱", but not "心"
const withoutHeartTraditional: WithoutHeart = "愛";
const withoutHeartSimplified: WithoutHeart = "爱";

// More practical subtraction examples
type FullUser = {
    id: number;
    name: string;
    email: string;
    password: string;
};

type PublicUser = Omit<FullUser, "password">; // Subtract sensitive information

const publicUser: PublicUser = {
    id: 1,
    name: "Wang",
    email: "wang@example.com",
};

// ============================================================================
// Advanced Examples: Combining Algebraic Operations
// ============================================================================

// Combining sum and product types
type Admin = { role: "admin"; permissions: string[] };
type Guest = { role: "guest" };
type Account = (Admin | Guest) & { username: string }; // (A + B) × C

const adminAccount: Account = {
    role: "admin",
    permissions: ["read", "write"],
    username: "admin_user",
};

const guestAccount: Account = {
    role: "guest",
    username: "guest_user",
};

// Using subtraction with sum types
type AllRoles = "admin" | "user" | "guest" | "moderator";
type NonAdminRoles = Exclude<AllRoles, "admin">; // Subtraction from union

const moderator: NonAdminRoles = "moderator"; // Can be "user", "guest", or "moderator"

// ============================================================================
// Type-level arithmetic demonstrations
// ============================================================================

/**
 * Summary:
 * - Sum (Union): A | B represents "A or B" (addition)
 * - Product (Intersection): A & B represents "A and B" (multiplication)
 * - Quotient (Factoring): Extracting common patterns (division)
 * - Subtraction (Removal): Omit<T, K> and Exclude<T, U> remove types (subtraction)
 * 
 * Just as 一 + 二 = 三, we can combine and manipulate types algebraically!
 */

export {
    Three,
    King,
    Person,
    User,
    Product,
    SimplifiedLove,
    PublicUser,
    Account,
};
