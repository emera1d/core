
class CPhysic {

    static impulse(m1, v1, m2, v2) {
        // p = m * v
        // p = p1 + p2
        // m1*v1 + m2*v2 = m1*new_v1 + m2*new_v2
        //
        // m1 * v1 * v1 / 2 = 
        return {
              v1: (2 * m2 * v2 + (m1 - m2) * v1) / (m1 + m2)
            , v2: (2 * m1 * v1 + (m2 - m1) * v2) / (m1 + m2)
        };
    }

}
